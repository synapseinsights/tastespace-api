# tastespace-api

Backend RESTful API server for TasteSpace. Built using [Feathers](https://docs.feathersjs.com/) with [Mongodb](https://www.mongodb.com/) (hosted on [MongoDB Atlas](https://cloud.mongodb.com)).

Front end uses components built using [Svelte](https://v3.svelte.technology/docs) which is a super-fast and super-light framework that compiles components to a single vanilla javascript file without needing an entire frontend library (e.g. Vue or React). To automate this compile process the `package.json`, `build` and `run` commands first build everything in `front_src` and produce `public/bundle.css`, `public/global.css`, and `public/bundle.js`. Then `public/index.html` simple loads these files. 

## Using  

1. Install dependencies: `npm install`
2. Start the app: `npm run dev`

Now you can test making requests to different collections within the Mongo database called `api`.  

Adding a new entry to the `restaurants` collection:  
`curl 'http://localhost:3030/restaurants/' -H 'Content-Type:application/json' --data-binary '{ "name": "Salt Hill" }'`  

Adding a new entry to the `users` collection:  
`curl 'http://localhost:3030/users/' -H 'Content-Type:application/json' --data-binary '{ "name": "Eshin Jolly" }'
{"name":"Eshin Jolly","_id":"5cb755dfea72db9fe7561041"}%`

See all collections data at a specific endpoint:  
Just navigate to `localhost:3030/collectionname`

To get back specific data, construct URLs that are RESTful, e.g. to get back a single user with a specific Mongo `_id`:  
Go to `http://localhost:3030/users?_id=5cb755dfea72db9fe7561041`

### Advanced db queries  

Since this app uses the `feathers-mongodb` integration it's relatively straightforward to perform complex Mongo searches/inserts by editing a respective `collection.hooks.js` file. For good examples see [here](https://docs.feathersjs.com/api/databases/common.html), e.g. the `adapter.Model` section.  

## Adding new endpoints for other collections  

Simply duplicate a folder under `services` and change its name to a collection under the `api` database in Mongo. Make sure to edit the code in the `yourcollection.service.js` file so that the app registers and uses the correct endpoint. The lines to change specifically are:  
```
const hooks = require('./yourcollection.hooks');

app.use('/yourcollection', createService(options));

const service = app.service('yourcollection');

mongoClient.then(db => {
    service.Model = db.collection('yourcollection');
  });
```

Then add a new entry `services/index.js`:  
```
const yourcollection = require('./yourcollection/yourcollection.service.js');

module.exports = function (app) {
    // Existing entries here
    ...
    // New entry here
    app.configure(yourcollection);
}
```

(Optional) Add a test for the new endpoint integration. Simply duplicate any existing endpoint tests under `test/services`. Rename it to your endpoint and edit the code to add your endpoint name.  

## Managing the database  

Mlab has been migrated to Mongodb Atlas. The easiest way to interact with it is to:  

1. Install [MongoDB Compass](https://www.mongodb.com/products/compass) on your computer. 
2. Login `cloud.mongodb.com`
3. Under `Projects > Clusters` on the left side, click 'connect'
4. Choose 'connect with mongodb compass' > 'I have compass'
5. Copy the connection string into compass along with the admin username and password

## App Layout Description

### Backend  

This project was scaffolded using Feathers CLI via `feathers generate app`.  
See [this guide](https://docs.feathersjs.com/guides/chat/creating.html) for what the files/folders mean.

### Frontend

Lives in the `front_src` folder in which different components are build using single `.svelte` files. Svelte is super easy to use and looks just like regular HTML, but with some extra magic.  
[Docs](https://v3.svelte.technology/docs)  
[Tutorial](https://v3.svelte.technology/tutorial/basics)  
[Example components](https://v3.svelte.technology/examples) (just copy and paste the code to make new components!)  

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Guides for Development

[Example feathers app with db](https://gorrion.io/blog/use-feathersjs-to-build-rest-and-socket-io-api)  
[Mongodb integration in feathers](https://github.com/feathersjs-ecosystem/feathers-mongodb)  
[Outdated article on building REST APIs with feathers, but still useful](https://blog.feathersjs.com/building-a-rest-and-real-time-api-with-express-feathers-and-mongodb-12071e5417e1)

## Todos

Added authentication so endpoints aren't available unless user is logged in:  
https://docs.feathersjs.com/guides/chat/authentication.html

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).
