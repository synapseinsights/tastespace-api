<script>
    import client from './client';
    import { onMount } from 'svelte';

    let restaurants = [];

    // Get restaurant data as soon as we render the page 
    onMount(async () => {
        const resp = await client.service('restaurants').find({
            query: {
                $limit: 25
            }
        });
        restaurants = resp.data;
        console.log(restaurants);

    })

</script>

<style>
</style>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <h2 style="text-align: center">Restaurants</h2>
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {#each restaurants as { name, location}, i}
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{name}</td>
                                <td>{location}</td>
                                </tr>
                        {/each}        
                    </tbody>
                </table>
        </div>
    </div>
   
</body>