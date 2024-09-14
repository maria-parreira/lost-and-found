# Lost-and-found

This repository includes a NodeJS / Express / MongoDB  application.


**The idea is to prototype a Lost and Found system for an airport to be used as a REST API, where agents (people who work in airport) can manage lost products and passengers can search for their lost items.**
**An agent at the airport is able to list / create and delete products from the system, while a passenger is able to report his loss (e.g. by describing the product).**

A list of rough steps in priority order:

- as an agent, list/create/delete products;
- as a passenger, search for a product by keywords (e.g. type of product, brand, color, etc) and lost time (e.g. "2023-01-01T10:30:00Z");
- extend the search endpoint to use a message instead of keywords (e.g. 'I lost my Samsung S4 phone'). The lost time should still be a different input, no need to parse from the message;
- simple airport agent authentication;
- postman collection to interact with the API;


### Creating a REST API with Node.js involves several key steps. Here’s a high-level overview:


## Setup Project

### Steps
On the root of this app, run the following command to install dependencies:
```
npm install
```

On the root of this app, run the following command to run the application:
```
npm start
```

### Install MongoDB Locally

- If you haven't installed MongoDB yet, you'll need to install it on your system. 
- You can download it from the official MongoDB website: [MongoDB Download Center](https://www.mongodb.com/try/download/community)

- If you installed MongoDB using Homebrew, run the following command:
```
brew services start mongodb-community
```
- is a straightforward way to start the MongoDB server and ensure it continues running in the background.
- Without starting the MongoDB service, your application wouldn’t be able to connect to the database since MongoDB wouldn't be running.

- Also you need to add this dependencies in [mongoose.js setup file](server/src/setup/mongoose.js):
- Mongoose: Used for interacting with MongoDB, it is an object data modeling (ODM) library that provides a straightforward schema-based solution to model your application data. It simplifies common tasks such as creating, reading, updating, and deleting documents in MongoDB.
- Pino: A fast and low-overhead logging library for Node.js. pino is used for structured logging, helping to track and debug application behavior efficiently by generating logs in a JSON format.
```
let mongoose = require('mongoose');
const logger = require('pino')()
```

- To install mongoose and pino run these commands:
```
npm install mongoose
npm install pino
```

- For password hashing, JWT management, and web server creation in a Node.js project, run this command:
```bash
npm install bcryptjs jsonwebtoken express
```

- Set up an Express server to handle HTTP requests. This involves creating an instance of an Express app and defining routes.You can check it [here](server/src/setup/express.js).

- Create endpoints for your API by defining routes. Routes correspond to specific URLs and HTTP methods (GET, POST, PUT, DELETE, etc.).You can check it [here](server/src/routes).


## Tests

- Use tools like Postman to test your API endpoints. 
- You can also write automated tests with frameworks like Jest.

- To set up your testing environment, install Jest and Supertest as development dependencies with the command:
```bash
npm install --save-dev jest supertest
```

- To configure Jest, add a test script to your package.json with the following entry:
```bash
"scripts": 
{ 
  "test": "jest" 
}
```


## My results