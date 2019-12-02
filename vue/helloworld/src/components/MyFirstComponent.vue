<template>
	<div>
		<p>Hello, {{name}}</p>
		<p>{{msg}}</p>
		<p>{{helloMessage}}</p>
		<p>{{helloMethod()}}</p>
	</div>
</template>

<script>
export default {
	name:"MyFirstComponent",
	props:['name'],
	data() {
		return {
			msg:"Hello from Component"
		}
	},
	computed: {
		helloMessage:function() {
			return "Hello from computed value, "+this.name
		}
	},
	methods: {
		helloMethod:function() {
			return "Hello from method, "+this.name
		}
	}
}
</script>