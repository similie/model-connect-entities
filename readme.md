# Model Connect Entities

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![npm Version](https://img.shields.io/npm/v/@similie/model-connect-entities)


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Creating a Connector](#creating-a-connector)
  - [Using the Connectors](#using-the-connectors)
- [Available Connectors](#available-connectors)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Similie](#similie)

## Introduction

**Model Connectors** is an open-source library that provides a unified framework for implementing common CRUD (Create, Read, Update, Delete) functionality across various implementation environments. By abstracting the data layer, Model Connectors allows you to manage your models consistently, regardless of the underlying technology stack.

Whether you're working with HTTP APIs, TypeORM, Drizzle, PostgreSQL, or any other data source, Model Connectors ensures that your model interactions remain uniform and predictable.

## Features

- **Unified CRUD Operations:** Perform create, read, update, and delete operations consistently across different connectors.
- **Extensible Framework:** Easily add support for new connectors tailored to your specific needs.
- **Type Safety:** Leverage TypeScript for type-safe model interactions.
- **Flexible Querying:** Use the same querying syntax regardless of the underlying data source.
- **Open Source:** MIT licensed, allowing for free use and modification.

## Installation

Install the `model-connectors` package via npm:

```bash
npm install @similie/model-connect-entites
```

## Getting Started

### Creating a Connection

In your entry-point script for establishing model connections, i.e. (app/main/index).ts we build the following:
```typescript
/**
* Create a static instance of the GlobalConnection class
*/
import { GlobalConnection } from "@similie/model-connect-entites";
import { HTTPConnector } from "@similie/http-connector";
GlobalConnection.startInstance(new HTTPConnector("https://api.example.com"));

```

### Using the Connectors

We defind our models in the following way:

```typescript

/**
* Define the model interface
*/
import { IEntity, IModelType, IModelCollection } from '@similie/model-connect-entites';
import { IUser, IStation } from "./types"
export interface IAsset extends IEntity {
  name: string;
  user: IModelType<IUser>;
  active?: boolean;
  stations?: IModelCollection<IStation>;
  returned?: boolean;
  meta?: any;
}

/**
* Define the model class
*/
import { IAssetscheduler } from '../model-interfaces';

import {LiveConnectionConstruct, Model } from '@similie/model-connect-entites';
export class AssetModel extends Model<IAsset> {
  constructor() {
    super(LiveConnectionConstruct);
    this.modelname = "assset";
  }
 // you can override or define additional methods here
}

const assset = new AssetModel();
const allAssets = asset.find({where: {active: true}}).fetch(); // returns all active assets

```

## Available Connectors
* [HTTP connector](https://github.com/similie/http-connector) based on the [Isomorphic Fetch Library](https://github.com/matthew-andrews/isomorphic-fetch) for front-end applications.



## API Reference
```typescript
const user = new User();
const passport = new Passport();
// returns all users
const results = await user.find().fetch();
// returns one user
const results = await user.find().limit(1).fetch();
// returns all users with a skip 2 limit of 1
const results = await user.find().skip(2).limit(1).fetch();
// returns the users with first name Code,
const results = await user
  .find({
    firstName: 'Code',
  })
  .fetch();
// returns users whose name contains code
const results = await user
  .find({
    firstName: { contains: 'Code' },
  })
  .fetch();
// returns users whi name is either Code or Ninja
const results = await user
  .find({
    or: [
      { firstName: { contains: 'Code' } },
      { firstName: { contains: 'Ninja' } },
    ],
  })
  .fetch();
// we can do a greather-than clause
const results = await user
  .find({
    or: [
      { firstName: { contains: 'Fast' } },
      { firstName: { contains: 'Fun' } },
      { id: { '>': 1 } },
    ],
  })
  .fetch();
// just fine one with a particular id
const results = await user.initWithId(1).fetch();
// just find one unique, returns the object not an array
const results = await user.find({ firstName: 'Code' }).fetchOne();
// now we can find one and populate a relation
const results = await user
  .find({ firstName: 'Code' })
  .populate('requestor')
  .fetchOne();
// or we can populate all attributes
const results = await user.find().populateAll().fetch();
// let's create a user
const createdUser = await user.create({
  firstName: 'Adam',
  lastName: 'Smith',
  userName: 'boomo',
  email: 'boomo@gazoomo.com',
  active: true,
  requestor: 1,
  role: 3,
});
// lets create a bunch of users
const createdUsers = await user.createMany([
  {
    firstName: 'Adam',
    lastName: 'Smith',
    userName: 'boomo',
    active: true,
    email: 'boomo@gazoomo.com',
    requestor: 1,
  },
  {
    firstName: 'Code',
    lastName: 'Ninja',
    userName: 'gazoomo',
    email: 'boomo1@gazoomo.com',
    active: true,
    requestor: 2,
  },
  {
    firstName: 'Steve',
    lastName: 'WonderSnack',
    userName: 'boomoToTheGazoomo',
    email: 'boomo2@gazoomo.com',
    active: true,
    requestor: 3,
  },
]);
// lets update a user
const newUsername = 'boomo1000';
createdUsers[0].userName = newUsername;
const updatedUser = await user.save(extras.createdUsers[0]);
// or we can search with an update
const newUsername = 'boomo1000';
const updatedUsers = await user.update(
  { userName: createdUsers[0].userName },
  { userName: newUsername}
);
// what's our user count
const userCount = await user.count();
// what's our count with query
const userCount = await user.count({ id: { '>': 2 } });
// delete a user instance
const deleteUser = createdUsers[0];
const deletedUser = await user.destroy(deleteUser);
// delete a bunch of them
const deletedUsers = await user.destroyAll({ id: { '>': 3 } });
// what are the attributes of the user
const attrs = await user.attr();
// sum the id attributes
const sum = await user.sum('id');
// sum the id attributes with a query
const newSum = await user.sum('id', { id: { '<': 3 } });
// average the id attributes
const avg = await user.avg('id');
// or average the id attributes with a query
const newAvg = await user.avg('id', { id: { '<': 3 } });
// lets populate a relation
const user = await user.initWithId(1).fetch();
const createdPassport = await passport.create({
    password: 'Boomo!',
});
await user.passport.addToCollection(createdPassport);
// we can also remove it
user.passport.removeFromCollection(
  extras.createdPassport
);
// we can stream our values
await user
  .stream({ id: { '>': 1 } })
  .eachRecord((user: IUser) => {
    // do something with the user
  })
  .fetch();
// we can also batch an records
await user
  .stream({})
  .eachBatch(10, (user: IUser[]) => {
    // do something with our 10 user
  })
  .fetch();
// find or create a user
const newFind = {
  firstName: 'Adam',
  lastName: 'Smith',
  userName: 'boomo',
  email: 'boomo@gazoomo.com',
  active: true,
  requestor: 2,
};

const foundUser = await user.findOrCreate(
  {
    userName: 'boomo',
  },
  newFind
);

```


## Contributing
We welcome contributions from the community and encourage you to help improve this project! Whether you’re fixing bugs, adding features, or proposing enhancements, your input is highly valued.

Pull Requests

We gladly accept pull requests. If you have a fix, enhancement, or idea, follow these steps to contribute:
	1.	Fork the Repository: Clone your fork locally to begin development.
	2.	Create a Branch: Use a descriptive name for your branch, such as feature/new-connector-type or bugfix/issue-123.
	3.	Write and Test Your Code: Ensure that your changes meet our standards and include tests where appropriate.
	4.	Submit a Pull Request: When your work is ready, open a pull request to the main branch, describing your changes clearly.

Adding New Connector Types

We especially encourage the development of new connector types to expand use cases. If you’re implementing a connector for a specific system, database, or platform, here’s how you can contribute:
	1.	Review Existing Connectors: Familiarize yourself with the structure and design of current connectors.
	2.	Follow the Guidelines: Maintain consistent naming conventions, design patterns, and documentation practices.
	3.	Provide Documentation: Include a clear README or guide detailing how to configure and use your connector.
	4.	Submit Tests: Provide test cases to verify functionality and ensure compatibility with the system.

Need Help?

If you’re unsure where to start or have questions about your contribution, don’t hesitate to open a discussion or issue. We’re here to collaborate and make this project better together.

Thank you for your interest in contributing! We’re excited to see what you’ll build.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Similie
Similie is a technology company based out of Timor-Leste, dedicated to developing innovative solutions that support international development initiatives and climate-change adaption. Our mission is to harness the power of technology to drive positive change and improve lives around the world. With a focus on sustainability, community engagement, and social impact, we strive to create products and services that make a real difference in people's lives.
