# Lost-and-found

This repository includes a NodeJS / Express / MongoDB skeleton app.

**The idea is to prototype a Lost and Found system for an airport to be used as a REST API, where we can manage and search for lost products.**
**An agent at the airport is able to list / create and delete products from the system, while a passenger is able to report his loss (e.g. by describing the product).**

A list of rough steps in priority order:

- as an agent, list/create/delete products;
- as a passenger, search for a product by keywords (e.g. type of product, brand, color, etc) and lost time (e.g. "2023-01-01T10:30:00Z");
- extend the search endpoint to use a message instead of keywords (e.g. 'I lost my Samsung S4 phone'). The lost time should still be a different input, no need to parse from the message;
- simple airport agent authentication;
- postman collection to interact with the API;


## Setup

### Steps
On the root of this app, run the following command to install dependencies:
```
npm install
```

On the root of this app, run the following command to run the application:
```
npm start
```

If everything is ok, you should see a 'Hello world!' message when you go to 'http://localhost:3000' on your browser.


### Install MongoDB Locally

- If you haven't installed MongoDB yet, you'll need to install it on your system. 
- You can download it from the official MongoDB website: [MongoDB Download Center](https://www.mongodb.com/try/download/community)

- If you installed MongoDB using Homebrew, run the following command:
- is a straightforward way to start the MongoDB server and ensure it continues running in the background. 
- Without starting the MongoDB service, your application wouldn’t be able to connect to the database since MongoDB wouldn't be running.
```
brew services start mongodb-community
```

- Also you need to add this dependencies in [mongoose.js setup file](server/src/setup/mongoose.js):
- Mongoose: Used for interacting with MongoDB, mongoose is an object data modeling (ODM) library that provides a straightforward schema-based solution to model your application data. It simplifies common tasks such as creating, reading, updating, and deleting documents in MongoDB.
- Pino: A fast and low-overhead logging library for Node.js. pino is used for structured logging, helping to track and debug application behavior efficiently by generating logs in a JSON format.
```
let mongoose = require('mongoose');
const logger = require('pino')()
```
- To install mongoose and pino run this commands:
```
npm install mongoose
npm install pino
```

## What is MongoDB?

- MongoDB is a NoSQL database, meaning it doesn't use the traditional table-based relational database structure. 
- Instead, it stores data in flexible, JSON-like documents, which allows for more dynamic and scalable data storage.
- It’s particularly popular for handling large volumes of unstructured or semi-structured data. 
- It’s commonly used in web applications, mobile apps, content management systems, and real-time analytics.