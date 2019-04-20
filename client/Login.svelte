<script>
	import client from './client';
	import { authorized } from './authorized.js'
	import Cookie from "js-cookie";

	// HTML variables
	let email = '';
	let password= '';
	let loginError = false;
	
    // Log in either using the given email/password or the token from storage
	async function login() {
		const credentials = {
			email: email,
			password: password
		};
		try {
			if (!credentials) {
				// Try to authenticate using the JWT from localStorage
				await client.authenticate();
			} else {
				// If we get login information, add the strategy we want to use for login
				const payload = Object.assign({ strategy: 'local' }, credentials);
				await client.authenticate(payload);
			}
			// Successfully authenticated
			authorized.set(true);
			Cookie.set("authorized", true);

		} catch (error) {
			loginError = error.message;
			console.log(loginError);
		}
    };
</script>

<style>
    .hidden{
        visibility: hidden;
	}
	.loginError {
		visibility: visible;
		color: red;
	}
</style>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</head>

<body>
	<br>
	<div class="container">
		<div class="col-md-8 offset-md-2">
			<form on:submit|preventDefault={login}>
				<div class="form-group">
					<label for="username">Username</label>
					<input bind:value={email} type="email" class="form-control">
					<small class:loginError class="hidden" id="passwordAuth">{loginError}</small>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input bind:value={password} type="password" class="form-control">
					<small class="hidden" class:loginError>{loginError}</small>
				</div>
				<button type="submit" id="login" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</body>