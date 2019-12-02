<template>
	<div>
		<div v-if="isLogged">
			<button v-on:click="logout()">Logout</button>
		</div>
		<div v-else>
			<button v-on:click="login()">Login</button>
		</div>
		<p v-show="isLogged">
			Now you are logged!
		</p>
	</div>
</template>
<script>
export default {
	name:"Conditional",
	data() {
		return {
			isLogged:false
		}
	},
	methods: {
		login:function() {
			this.isLogged = true
		},
		logout:function() {
			this.isLogged = false
		}	
	}
}
</script>