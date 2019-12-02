<template>
	<div>
		<ShoppingForm @add-to-list="addToList(...arguments)"/>
		<hr/>
		<ShoppingList v-bind:list="list"/>
	</div>
</template>
<script>
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';

export default {
	name:"ShoppingContainer",
	data() {
		return {
			list:[],
			id:100
		}
	},
	methods: {
		addToList:function(item) {
			item.id = this.id;
			this.id++;
			this.list.push(item);
		}
	},
	components: {
		ShoppingForm,
		ShoppingList
	}
}
</script>