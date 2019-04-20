/* global document, window, feathers */

// SETUP
// Init the client-side app
const client = feathers();
// Connect to the same as the browser URL (only in the browser)
const restClient = feathers.rest();
// Configure an AJAX library (see below) with that client 
client.configure(restClient.fetch(window.fetch));
// Use localStorage to store our login token
client.configure(feathers.authentication({ storage: window.localStorage }));

// FUNCTIONS
// Retrieve email/password object from the login/signup page
const getCredentials = () => {
  const user = {
    email: document.querySelector('[name="email"]').value,
    password: document.querySelector('[name="password"]').value
  };
  return user;
};
// Log in either using the given email/password or the token from storage
const login = async credentials => {
  try {
    if(!credentials) {
      // Try to authenticate using the JWT from localStorage
      await client.authenticate();
    } else {
      // If we get login information, add the strategy we want to use for login
      const payload = Object.assign({ strategy: 'local' }, credentials);
      await client.authenticate(payload);
    }

    // If successful, move to a different page here
    // e.g. https://github.com/feathersjs/feathers-chat/blob/master/public/vanilla/app.js

  } catch(error) {
    // If we got an error, show the login page
    console.log(error);
    let elems = document.getElementsByClassName("passwordAuth");
    for (let e of elems){
      e.style.display = 'inline';
      e.innertHTML = error;
    }
  }
};
// Get restaurants
const getRestaurants = async () => {
  const resp = await client.service('restaurants').find({
    query: {
      $limit: 25
    }
  });
  const restaurants = resp.data;
  return restaurants; 
};

// Render restaurantsPage
const render_restaurantsPage = (restaurants) => {
  document.getElementById('app').innerHTML = restaurantsPage;
  const table = document.querySelector('.table-body');
  restaurants.forEach((r, i) => {
    console.log(`Name: ${r.name} Location: ${r.location}`);
    table.insertAdjacentHTML('beforeend',
      `<tr>
      <th scope="row">${i+1}</th>
      <td>${r.name}</td>
      <td>${r.location}</td>
    </tr>` 
    );
  });
};

// EVENT HANDLERS
document.addEventListener('submit', async (e) => {
  e.preventDefault();
  const credentials = getCredentials();
  await login(credentials);
  const restaurants = await getRestaurants();
  render_restaurantsPage(restaurants);
  
});

// Templates (in lieu of a front end framework)
const restaurantsPage = 
`
<h2 style="text-align: center">Restaurant List</h2>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Location</th>
    </tr>
  </thead>
  <tbody class='table-body'>
  </tbody>
</table>
`;