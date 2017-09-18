# Subscription Backend

This is an example backend implementation for the Billwerk Subscription UI. It is written in Typescript for NodeJS to keep every step for you comprehensible. 

## Install

Install the node packages via:

`$ npm install`

And then run the grunt task to compile the TypeScript on every file change:

`$ npm run grunt watch`

## Starting

To start the server just run:

`$ npm start`

For developing purposes it's the best choice to run grunt and your server simultaneously. Every filechange will trigger grunt to compile from .ts to .js and the nodemon will automatically restart your server.

## Structure

### File structure

The file structure is organized around features, not roles. Each component of the application has its own directory. Common components are organized in the _shared folder. The organization and naming convention is based on the idea of component development. The file name starts with the item and follows with a general function label (e.g. route, endpoint, model etc.). This keeps the file structure flat and clear.

```
.
├── src
│   ├── _shared
│   │   ├── api.abstract.ts
│   │   └── index.ts
│   ├── authorization
│   │   ├── authorization.endpoint.ts
│   │   ├── authorization.route.ts
│   │   └── index.ts
│   ├── config
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── contract
│   │   ├── contract.endpoint.ts
│   │   ├── contract.route.ts
│   │   └── index.ts
│   ├── customer
│   │   ├── customer.endpoint.ts
│   │   ├── customer.route.ts
│   │   └── index.ts
│   └── server.ts
└── tslint.json
```

### Index files

The index files make it easier import files. Instead of specifying the exact path for each embedded file, you can keep it simple by specifying the directory.