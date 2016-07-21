# capmetrics-api

REST API for CapMetro performance data.

The API is powered by the [Express](https://expressjs.com) node.js framework.

## Endpoints

Only **GET** requests are accepted. These are the live API endpoints.

| API Endpoint               | Available logic                                          |
|----------------------------|----------------------------------------------------------|
| /daily-riderships          | GET resource collection. Limited query string support.   |
| /daily-rirderships/1       | GET single resource by identifier.                       |
| /high-ridership            | GET visualization-ready high ridership route data.       |
| /routes                    | GET resource collection. Limited query string support.   |
| /routes/1                  | GET single resource by identifier.                       |
| /route-labels              | GET resource collection.                                 |
| /productivity              | GET data series for productivity analysis.               |
| /service-hour-riderships   | GET resource collection                                  |
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

