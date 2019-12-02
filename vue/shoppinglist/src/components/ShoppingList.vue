<template>
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Type</th>
				<th>Count</th>
				<th>Price</th>			
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in list" :key="item.id">
				<td>{{item.type}}</td>
				<td>{{item.count}}</td>
				<td>{{item.price}}</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	name:"ShoppingList",
	props:['list']
}
</script>