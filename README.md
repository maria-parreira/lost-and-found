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

### Requirements
Make sure you have MongoDB installed and running on your computer as well as NodeJS/NPM installed.

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

## Set Up mongodb

command brew install mongosh
brew services start mongodb-community
instalar a partir do site para ter o servidor a correr localmente
npm install mongoose
