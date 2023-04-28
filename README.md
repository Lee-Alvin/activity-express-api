# activity-express-api v1.0.0

Dockerized Express API using Node.js and MongoDB. MERN stack without React so its just MEN. This API takes GET requests through its /activity endpoint, calls the Bored API, and returns an activity like something below:

```
{
    "activity": "Learn how to beatbox",
    "type": "recreational",
    "participants": 1,
    "price": "Free",
    "link": "https://en.wikipedia.org/wiki/Beatboxing",
    "key": "8731710",
    "accessibility": "Low"
}
```

This API also takes POST requests through the /user endpoint. Send a request body similar to something below and an activity that matches the user's price and accessibility will be returned. The user is also inserted into the MongoDB activity database into the user collection.

```
{
    "name" : "Alvin",
    "price" : "Free",
    "accessibility" : "Low"
}
```

Any subsequent GET requests made through the /activity endpoint will automatically assume the latest user's price and accessibility preferences.

## Requirements/Libraries:

- Node.js 14+
- Docker
- Postman

## Running and Testing Locally:

To run and the application locally, you will need Docker installed. Navigate to the root and run below to build the image and run:

```
    docker-compose build
    docker-compose up
```

Then, open Postman and you can send test requests to 127.0.01:80/activity . Behind the scenes, a container for a nginx web server and a container for the Express API are started up.

Send GET requests to 127.0.01:80/activity to get an activity.

Send POST requests to 127.0.01:80/user to get an activity that matches the request body's user preferences
