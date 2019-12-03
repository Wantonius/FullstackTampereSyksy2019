import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	list:[],
	error:""
  },
  mutations: {
	changeList:function(state,list) {
		state.list = list;
		state.error = "";
	},
	displayError:function(state,error) {
		state.error = error;
	}
  },
  actions: {
	getList:function(context) {
		axios.get("/api/shopping").then(res => {
			if(res.status===200) {
				context.commit("changeList",res.data);
			} else {
				context.commit("displayError","Server responded with status:"+res.status);
			}
		}).catch(err => {
			context.commit("displayError","Server responded with error:"+err)
		})
	},
	addToList:function(context,item) {
		axios.post("/api/shopping",item).then(res => {
			if(res.status===200) {
				context.dispatch("getList");
			} else {
				context.commit("displayError","Server responded with status:"+res.status);
			}
		}).catch(err => {
			context.commit("displayError","Server responded with error:"+err)
		})	  
	},
	removeFromList:function(context,id) {
		axios.delete("/api/shopping/"+id).then(res => {
			if(res.status===200) {
				context.dispatch("getList");
			} else {
				context.commit("displayError","Server responded with status:"+res.status);
			}
		}).catch(err => {
			context.commit("displayError","Server responded with error:"+err)
		})	
	},
	editItem:function(context,item) {
		axios.put("/api/shopping/"+item.id,item).then(res => {
			if(res.status===200) {
				context.dispatch("getList");
			} else {
				context.commit("displayError","Server responded with status:"+res.status);
			}
		}).catch(err => {
			context.commit("displayError","Server responded with error:"+err)
		})	
	}
  },
  modules: {
  }
})
