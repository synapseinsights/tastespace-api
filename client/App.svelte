<script>
	import { onDestroy } from 'svelte';
	import { authorized } from './authorized.js';
	import Cookie from "js-cookie";
	let cookieAuth = Cookie.get("authorized")
	// Get other components
	import Login from './Login.svelte';
	import Restaurants from './Restaurants.svelte'

	function deleteCookies() {
		Cookie.remove("authorized");
	}

</script>

<style>
</style>

<body onunload="deleteCookies()">
	<h1 style="text-align: center">TasteSpace Backend</h1>
	<br>
	{#if $authorized || cookieAuth}
	<!-- Should put a dashboard with button here to go to diff pages instead of directly routing to a specific component. Then we can use state (see authorized.js) to maintain location between pages without need the need for a full blown routing system. Also need to delete cookie on user logout. Currently chrome doesnt respect deleteCookies. -->
	<Restaurants/>
	{:else}
	<Login/>
	{/if}
</body>