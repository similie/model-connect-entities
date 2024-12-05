# Model Connect Entities

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![npm Version](https://img.shields.io/npm/v/model-connectors)
![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/model-connectors/ci.yml?branch=main)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Creating a Connector](#creating-a-connector)
  - [Using the Connectors](#using-the-connectors)
- [Available Connectors](#available-connectors)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

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
 // you can override or define additional methods here
}

const assset = new AssetModel();
const allAssets = asset.find({where: {active: true}}); // returns all active assets

```
