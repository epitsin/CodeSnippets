# CodeSnippets

## Prerequisites
Make sure you have installed all of the following prerequisites:
* Git - [Download & Install Git]
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/)

## Clone The GitHub Repository
Use git to directly clone the repository:

```bash
$ git clone https://github.com/epitsin/CodeSnippets.git
```

## Quick Install
To install the dependencies, run the following command in the client and server application folder:

```bash
$ npm install
```

## Run The Application

Run both applications using npm:

```bash
$ npm start
```

The client application should run on port 4200, so in your browser just go to [http://localhost:4200](http://localhost:4200). The server application should run on port 3000.
Note: if you cannot experience problems connecting to MongoDb Atlas, check your system firewall settings and ensure that they are not blocking the access.

That's it! Code snippets application should be running.


## Users
To be able to create and view snippets, register a new user or log in with one of the following

```bash
email: harrypotter@hogwards.com
password: harry1234
```

```bash
email: hansolo@starwars.com
password: solo1234
```
To be able to delete snippets and view reports on snippet tags, register log in with the following admin account

```bash
email: gandalf@lordoftherings.com
password: lord
```

## Testing The Application
You can run the full test suite from the command line in the server application folder:

```bash
$ npm test
```
