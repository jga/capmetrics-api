'use strict';

let modelFixtures = {
    route1: {
      "id": 1,
      "routeNumber": 101,
      "routeName": "Busy Route",
      "serviceType": "Local Bus",
      "isHighRidership": true
    },
    route2: {
      "id": 2,
      "routeNumber": 20,
      "routeName": "Big Loop",
      "serviceType": "Circulator",
      "isHighRidership": false
    },
    ridership1: {
      "id": 1,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 1
    },
    ridership2: {
      "id": 2,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 1
    },
    ridership3: {
      "id": 3,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 1
    },
    productivity1: {
      "id": 1,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 1
    },
    productivity2: {
      "id": 2,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 1
    },
    ridership1_2: {
      "id": 4,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 2
    },
    ridership2_2: {
      "id": 5,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 2
    },
    ridership3_2: {
      "id": 6,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 2
    },
    productivity1_2: {
      "id": 3,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 2
    },
    productivity2_2: {
      "id": 4,
      "createdOn": new Date('2011-07-01T06:00:00.000Z'),
      "current": true,
      "dayOfWeek": "weekday",
      "season": "summer",
      "calendarYear": 2011,
      "ridership": 1234,
      "measurementTimestamp": new Date('2011-07-01T06:05:00.000Z'),
      "route_id": 2
    },
    trend1 : {
      "id": 1,
      "serviceType": "CORE - METRORAPID",
      "trend": '[["2014-03-31T00:00:00-05:00", 34991], ["2014-06-30T00:00:00-05:00", 33242], ["2014-09-29T00:00:00-05:00", 64220], ["2015-03-30T00:00:00-05:00", 56485], ["2015-06-29T00:00:00-05:00", 48932], ["2015-09-28T00:00:00-05:00", 56558]]',
      "updatedOn": "2016-05-23 15:17:11.342038"
    },
    trend2: {
      "id": 2,
      "serviceType": "UT - CIRCULATORS",
      "trend": '[["2012-03-26T00:00:00-05:00", 63256.9629406585], ["2012-06-25T00:00:00-05:00", 12473.992858923832], ["2012-10-01T00:00:00-05:00", 64973.03837129828], ["2013-04-01T00:00:00-05:00", 58484.74680654402], ["2013-07-01T00:00:00-05:00", 13026.147972265817], ["2013-09-30T00:00:00-05:00", 53339.35873074568], ["2014-03-31T00:00:00-05:00", 50636.18757959429], ["2014-06-30T00:00:00-05:00", 11794.553806841292], ["2014-09-29T00:00:00-05:00", 47834.46989302964], ["2015-03-30T00:00:00-05:00", 44171.536374], ["2015-06-29T00:00:00-05:00", 13670.196244], ["2015-09-28T00:00:00-05:00", 42715.520615999994]]',
      "updatedOn": "2016-05-23 15:17:11.359567"
    },
    trend3:  {
      "id": 3,
      "serviceType": "CORE - RADIAL",
      "trend": '[["2012-03-26T00:00:00-05:00", 321772.4405603083], ["2012-06-25T00:00:00-05:00", 303791.6811050863], ["2012-10-01T00:00:00-05:00", 335075.38441778097], ["2013-04-01T00:00:00-05:00", 324847.7935687934], ["2013-07-01T00:00:00-05:00", 307951.7523845359], ["2013-09-30T00:00:00-05:00", 315338.5055532126], ["2014-03-31T00:00:00-05:00", 281058.488880102], ["2014-06-30T00:00:00-05:00", 267701.895692668], ["2014-09-29T00:00:00-05:00", 269041.1445997899], ["2015-03-30T00:00:00-05:00", 244352.528722], ["2015-06-29T00:00:00-05:00", 242960.547213], ["2015-09-28T00:00:00-05:00", 254892.52386400002]]',
      "updatedOn": "2016-05-23 15:17:11.353938"
    },
    trend4: {
      "id": 4,
      "serviceType": "CORE - CROSSTOWN",
      "trend": '[["2012-03-26T00:00:00-05:00", 153389.94057007128], ["2012-06-25T00:00:00-05:00", 149604.8088588303], ["2012-10-01T00:00:00-05:00", 158883.2413675122], ["2013-04-01T00:00:00-05:00", 151277.72511542062], ["2013-07-01T00:00:00-05:00", 148748.0672089092], ["2013-09-30T00:00:00-05:00", 149265.5335230955], ["2014-03-31T00:00:00-05:00", 147787.8608991505], ["2014-06-30T00:00:00-05:00", 150362.3992488755], ["2014-09-29T00:00:00-05:00", 147753.1954016013], ["2015-03-30T00:00:00-05:00", 133720.66255100002], ["2015-06-29T00:00:00-05:00", 139301.635093], ["2015-09-28T00:00:00-05:00", 142673.49492300002]]',
      "updatedOn": "2016-05-23 15:17:11.351442"
    },
    trend5: {
      "id": 5,
      "serviceType": "CORE - FEEDER",
      "trend": '[["2012-03-26T00:00:00-05:00", 13027.517210567186], ["2012-06-25T00:00:00-05:00", 13346.072189638335], ["2012-10-01T00:00:00-05:00", 15143.401422764271], ["2013-04-01T00:00:00-05:00", 15358.09605264147], ["2013-07-01T00:00:00-05:00", 15664.39062318827], ["2013-09-30T00:00:00-05:00", 15900.15481772132], ["2014-03-31T00:00:00-05:00", 24389.948491774758], ["2014-06-30T00:00:00-05:00", 27972.66034557086], ["2014-09-29T00:00:00-05:00", 27631.89346122704], ["2015-03-30T00:00:00-05:00", 25414.302549818203], ["2015-06-29T00:00:00-05:00", 24154.11069627275], ["2015-09-28T00:00:00-05:00", 24837.92396594737]]',
      "updatedOn": "2016-05-23 15:17:11.333617"
    },
}

module.exports = modelFixtures;
