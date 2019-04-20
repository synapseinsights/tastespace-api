import feathers from '@feathersjs/client';

// Init the client-side app
const client = feathers();
// Connect to the same as the browser URL (only in the browser)
const restClient = feathers.rest();
// Configure an AJAX library (see below) with that client 
client.configure(restClient.fetch(window.fetch));
// Use localStorage to store our login token
client.configure(feathers.authentication({ storage: window.localStorage }));

export default client;