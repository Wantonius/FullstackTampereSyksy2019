<template>
	<div>
		<label for="messageinput">Enter message</label>
		<input type="text"
				name="messageinput"
				v-model="msg"/>
		<button v-on:click="sendMessage()">Send</button>
	</div>
</template>
<script>
export default {
	name:"CustomEventEmitter",
	data() {
		return {
			msg:""
		}
	},
	methods: {
		sendMessage:function() {
			this.$emit("my-custom-event",this.msg);
		}
	}

}
</script>