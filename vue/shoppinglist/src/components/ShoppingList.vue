<template>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Type</th>
				<th>Count</th>
				<th>Price</th>
				<th>Remove</th>
				<th>Edit</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in list" :key="item.id">
				<template v-if="editId !== item.id">
					<td>{{item.type}}</td>
					<td>{{item.count}}</td>
					<td>{{item.price}}</td>
					<td><button v-on:click="remove(item.id)" class="btn btn-danger">Remove</button></td>
					<td><button v-on:click="edit(item.id)" class="btn btn-success">Edit</button></td>
				</template>
				<template v-else>
					<td><input type="text" v-model="type"/></td>
					<td><input type="number" v-model="count" min="0"/></td>
					<td><input type="number" v-model="price" min="0" step="0.01"/></td>
					<td><button v-on:click="save()" class="btn btn-success">Save</button></td>
					<td><button v-on:click="cancel()" class="btn btn-danger">Cancel</button></td>
				</template>
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	name:"ShoppingList",
	data() {
		return {
			editId:-1,
			type:"",
			price:0,
			count:0
		}
	},
	props:['list'],
	methods: {
		remove:function(id) {
			this.$emit("remove-item",id);
		},
		edit:function(id) {
			this.editId = id;
			for(let i=0;i<this.list.length;i++) {
				if(this.list[i].id == id) {
					this.type = this.list[i].type;
					this.price = this.list[i].price;
					this.count = this.list[i].count;
				}
			}
		},
		save:function() {
			let tempItem = {
				id:this.editId,
				type:this.type,
				price:this.price,
				count:this.count
			}
			this.$emit("edit-item",tempItem);
			this.editId = -1;
			this.type="";
			this.price=0;
			this.count=0;
		},
		cancel:function() {
			this.editId = -1;
		}
	}
}
</script>