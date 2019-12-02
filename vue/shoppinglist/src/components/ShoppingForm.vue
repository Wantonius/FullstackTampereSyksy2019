<template>
	<div>
		<div class="form form-group">
			<label for="type">Type:</label>
			<input type="text"
					name="type"
					v-model="item.type"/>
		</div>
		<div class="form form-group">
			<label for="price">Price:</label>
			<input type="number"
					name="price"
					v-model="item.price"
					min="0"
					step="0.01"/>
		</div>
		<div class="form form-group">
			<label for="count">Count:</label>
			<input type="number"
					name="count"
					v-model="item.count"
					min="0"/>
		</div>
		<button class="btn btn-primary" v-on:click="addToList()">Add</button>
	</div>
</template>
<script>
export default {
	name:"ShoppingForm",
	data() {
		return {
			item: {
				id:0,
				type:"",
				price:0,
				count:0			
			}
		}
	},
	methods: {
		addToList:function() {
			this.$emit("add-to-list",this.item);
			this.item = {
				id:0,
				type:"",
				price:0,
				count:0			
			}
		}
	}
}

</script>