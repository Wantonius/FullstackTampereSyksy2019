<template>
	<div>
		<p>Child component says: {{message}}</p>
		<CustomEventEmitter @my-custom-event="eventHandler(...arguments)"/>
	</div>
</template>
<script>
import CustomEventEmitter from './CustomEventEmitter';

export default {
	name:"CustomEventHandler",
	data() {
		return {
			message:"No message yet"
		}
	},
	methods: {
		eventHandler:function(data) {
			this.message = data;
		}
	},
	components:{CustomEventEmitter}
}

</script>