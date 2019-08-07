const initialState = {
	list:[],
	id:100
}

const shoppingReducer = (state = initialState, action) => {
	console.log("shoppingReducer action:");
	console.log(action);
	let tempState = {};
	let tempList = [];
	let tempId;
	switch(action.type) {
		case "ADD_TO_LIST":
			action.item.id = state.id+1;
			tempList = state.list.concat(action.item);
			tempState = {
				list:tempList,
				id:action.item.id
			}
			console.log(tempState);
			return tempState;
		case "REMOVE_FROM_LIST":
			tempId = parseInt(action.id,10);
			for(let i=0;i<state.list.length;i++) {
				if(state.list[i].id !== tempId) {
					tempList.push(state.list[i]);
				}
			}
			tempState= {
				...state,
				list:tempList
			}
			return tempState;	
		default:
			return state;
	}
}

export default shoppingReducer;