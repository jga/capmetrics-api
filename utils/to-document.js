'use strict';
/**
 * A utility for creating JSON API documents.
 *
 * Exports `toDocument` function.
 *
 * @module utils/to-document
 */

var inflection = require('inflection');
var IncludedHelper = require('./included-helper')


let toRelationshipData = function(typeName, attributeData) {
  if (attributeData instanceof Array){
    let relationshipData = [];
    for (let i = 0; i < attributeData.length; i++) {
      let resourceIdentifier = { "type": typeName, "id": attributeData[i].toString() }
      relationshipData.push(resourceIdentifier);
    }
    return { 'data': relationshipData };
  } else {
    return { 'data': { "type": typeName, "id": attributeData.toString() } }
  }
}

let fieldToAttribute = function(fieldValue) {
  //to many relationship
  if (fieldValue instanceof Array) {
    let primaryKeys = [];
    for (let i = 0; i < fieldValue.length; i++) {
      primaryKeys.push(fieldValue[i].id);
    }
    return primaryKeys;
  // to one relationship
  } else if (fieldValue && fieldValue.hasOwnProperty('id')){
    return fieldValue.id;
  // plain attribute - not a relationship
  } else {
    return fieldValue;
  }
}

let buildIncludeQuery = function(relationshipFields, db) {
  let query = []
  for (let i = 0; i < relationshipFields.length; i++) {
    query.push(db[relationshipFields[i]])
  }
  return query;
}

let transformIncludeInstance = function(modelName, instance, relationshipFields){
  let typeName = inflection.pluralize(modelName);
  //we have to underscore in order to be able to dasherize with inflection
  typeName = inflection.underscore(typeName);
  typeName = inflection.dasherize(typeName);
  let attributes = {};
  let relationships = {};
  let fields = instance.toJSON();
  for (let key in fields) {
    let foreignKeyMatches = key.match(/Id$|_id$|-id$|^id$/);
    if (fields.hasOwnProperty(key) && !foreignKeyMatches) {
      let attributeData = fieldToAttribute(fields[key]);
      // get dasherized property name
      let underscored = inflection.underscore(key);
      let dasherized = inflection.dasherize(underscored);
      // place into attributes or relationships
      if (relationshipFields && (relationshipFields.indexOf(key) !== -1)) {
        relationships[dasherized] = toRelationshipData(dasherized, attributeData);
      } else {
        attributes[dasherized] = attributeData;
      }
    }
  }
  let resourceObj = {
    'type': typeName,
    'id': instance.id.toString(),
    'attributes': attributes
  }
  if (Object.keys(relationships).length !== 0) {
    resourceObj['relationships'] = relationships;
  }
  return resourceObj;
}

let buildRetrieval = function (modelName, model, id, includeQuery, relationshipFields) {
  let modelQuery = model.findAll({ where: { id: parseInt(id) }, include: includeQuery })
  return modelQuery.then(function(instances) {
    let resourceObjects = [];
    for (let i = 0; i < instances.length; i++) {
      let resourceObject = transformIncludeInstance(modelName, instances[i], relationshipFields);
      resourceObjects.push(resourceObject);
    }
    return resourceObjects;
  })
}

let handleRetrievalPromises = function(retrievalPromises, primaryData){
  return Promise.all(retrievalPromises).then(function(resourceObjects) {
    let combined = new IncludedHelper();
    for (let j = 0; j < resourceObjects.length; j++) {
      if (resourceObjects[j] instanceof Array) {
        for (let k = 0; k < resourceObjects[j].length; k++) {
          let ro = resourceObjects[j][k];
          combined.addResourceObject(ro);
        }
      }
    }
    return {'data': primaryData, 'included': combined.getIncluded()};
  });
}

let addToIncluded = function(modelName, db, identifiers, relationshipFields) {
  // Convert single foreign key to array. Simplifies the method logic
  if (!identifiers instanceof Array) {
    identifiers = [identifiers]
  }
  let singularName = inflection.singularize(modelName)
  let model = db[singularName]
  let retrievals = [];
  for (let i = 0; i < identifiers.length; i++) {
    let includeQuery = buildIncludeQuery(relationshipFields, db)
    let retrieval = buildRetrieval(singularName, model, identifiers[i], includeQuery, relationshipFields)
    retrievals.push(retrieval);
  }
  return retrievals;
}

let transform = function(instance, relationshipDirectives) {
  var typeName = relationshipDirectives.modelType;
  var attributes = {};
  var relationships = {};
  var retrievalPromises = [];
  var fields = instance.toJSON();
  //var fields = instance;
  for (let key in fields) {
    // skip primary key and foreign keys - fields with model class names
    // will not be skipped
    let foreignKeyMatches = key.match(/Id$|_id$|-id$|^id$/g);
    if (fields.hasOwnProperty(key) && !foreignKeyMatches) {
      let attributeData = fieldToAttribute(fields[key]);
      // get dasherized property name
      let underscored = inflection.underscore(key);
      let dasherized = inflection.dasherize(underscored);
      // place into attributes or relationships
      let pkFields = relationshipDirectives ? relationshipDirectives.pk : null;
      let includedFields = relationshipDirectives ? relationshipDirectives.included : null;
      if (includedFields && (key in includedFields)) {
        relationships[dasherized] = toRelationshipData(dasherized, attributeData);
        let retrieval = addToIncluded(key, relationshipDirectives.db,
                                      attributeData, includedFields[key])
        retrievalPromises.push.apply(retrievalPromises, retrieval);
      } else if (pkFields && (key in pkFields)) {
        relationships[dasherized] = toRelationshipData(dasherized, attributeData);
      } else {
        attributes[dasherized] = attributeData;
      }
    }
  }
  let resourceObj = {
    'type': typeName,
    'id': instance.id.toString(),
    'attributes': attributes
  }
  if (Object.keys(relationships).length !== 0) {
    resourceObj['relationships'] = relationships;
  }
  if (retrievalPromises.length !== 0) {
      return [resourceObj, retrievalPromises]
  } else {
    return [resourceObj, null];
  }
}

// Reformat a Sequelize model instance into a JSON API resource object.
let transformInstance = function(instance, relationshipDirectives) {
  return new Promise(function(resolve, reject) {
    let result = transform(instance, relationshipDirectives);
    let resourceObj = result[0];
    let retrievals = result[1];
    if (retrievals && retrievals.length !== 0) {
      let jsonapiDocPromise = handleRetrievalPromises(retrievals, resourceObj);
      jsonapiDocPromise
        .then(resolve)
        .catch(reject);
    } else {
      resolve({'data': resourceObj});
    }
  })
}

let transformInstances = function(instances, relationshipDirectives) {
  return new Promise(function(resolve, reject) {
    var retrievals = [];
    var primaryResourceObjects = [];
    for (let i = 0; i < instances.length; i++) {
      let result = transform(instances[i], relationshipDirectives);
      let resourceObj = result[0];
      let instanceRetrievals = result[1];
      primaryResourceObjects.push(resourceObj)
      if (instanceRetrievals) {
        retrievals.push.apply(retrievals, instanceRetrievals);
      }
    }
    if (retrievals.length !== 0) {
      let jsonapiDocPromise = handleRetrievalPromises(retrievals, primaryResourceObjects);
      jsonapiDocPromise
        .then(resolve)
        .catch(reject);
    } else {
      resolve({'data': primaryResourceObjects});
    }
  })
}

/**
 * Assembles a JSON API document with a top-level `data` member.
 *
 * @param {object|array} storage Persisted model/models.
 * @param {object} relationshipDirectives Instructions on what keys are relationships and which should be
 *  included.
 * @returns {object} A JSON API document with a top-level `data` member.
 */
let toDocument = function(storage, relationshipDirectives) {
  return new Promise(function(resolve, reject) {
    let jsonapiDoc;
    if (storage instanceof Array) {
      jsonapiDoc = transformInstances(storage, relationshipDirectives);
    } else {
      jsonapiDoc = transformInstance(storage, relationshipDirectives);
    }
    jsonapiDoc.then(function(completedDoc) { resolve(completedDoc) }).catch(reject)
  })
}

module.exports = toDocument;
