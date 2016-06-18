# capmetrics-api

REST API for CapMetro performance data.

## Endpoints

These are the live API endpoints:

| API Endpoint               | Available logic                                          |
|----------------------------|----------------------------------------------------------|
| /daily-riderships          | GET resource collection. Limited query string support.   |
| /daily-rirderships/1       | GET single resource by identifier                        |
| /routes                    | GET resource collection. Limited query string support.   |
| /routes/1                  | GET single resource by identifier                        |
| /service-hourriderships    | GET resource collection                                  |
| /service-hourrirderships/1 | GET single resource by identifier                        |
| /system-trends             | GET resource collection. No query string support.        |

#### A note about URL design

The API conforms to JSON API recommendations and targets consumption by Ember Data-powered browser clients.
Therefore, URL endpoints user plural words and multiple-word models are separated by hyphens:

|Action    |	HTTP  | Verb	URL         |
|----------|--------|-------------------|
|Find	     | GET	  |  /app-models/123  |
|Find All	 | GET	  |  /app-models      |
|Update	   | PATCH	|  /app-models/123  |
|Create	   | POST	  |  /app-models      |
|Delete	   | DELETE |  /app-models/123  |

