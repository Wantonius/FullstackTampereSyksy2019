<template>
  <div class="home">
	<h2>Vue router test home page</h2>
	<h3>Enter a person to greet</h3>
	<input type="text" v-model="name"/>
	<button v-on:click="greetPerson()">Greet!</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
	return {
		name:""
	}
  },
  methods: {
	greetPerson:function() {
		let person = {personname:this.name}
		this.$router.push({name:"greet",params:person});
	}
  }
}
</script>
