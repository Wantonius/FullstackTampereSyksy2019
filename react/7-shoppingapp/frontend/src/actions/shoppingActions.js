import {fetchLoading,loadingDone} from './loginActions';

//SHOPPING ACTIONS
export const GET_SHOPPINGLIST_SUCCESS = "GET_SHOPPINGLIST_SUCCESREMOVE_FROM_LIST_FAILEDS"
export const GET_SHOPPINGLIST_FAILED = "GET_SHOPPINGLIST_FAILED"
export const ADD_TO_LIST_SUCCESS = "ADD_TO_LIST_SUCCESS"
export const ADD_TO_LIST_FAILED = "ADD_TO_LIST_FAILED"
export const REMOVE_FROM_LIST_SUCCESS = "REMOVE_FROM_LIST_SUCCESS"
export const REMOVE_FROM_LIST_FAILED = "REMOVE_FROM_LIST_FAILED"
export const EDIT_ITEM_SUCCESS = 
"EDIT_ITEM_SUCCESS"
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED"
export const LOGOUT_DONE = "LOGOUT_DONE"

//ACTIONS
export const getShoppingList = (token) => {
	return dispatch => {
		let request = {
			  method:"GET",
			  mode:"cors",
			  credentials:"include",
			  headers:{"Content-Type":"application/json",
						"token":token}
		  }
		dispatch(fetchLoading());
		return fetch("/api/shopping",request).then(response => {
				dispatch(loadingDone());
				if(response.ok) {
					response.json().then(data => {
						dispatch(getShoppingListSuccess(data))
					}).catch(error => {
						dispatch(getShoppingListFailed("Error in parsing response json"));	
					});
				} else {
					dispatch(getShoppingListFailed("Server responded with status:"+response.statusText));

		  }}).catch(error => {
				dispatch(loadingDone());
				dispatch(getShoppingListFailed(error));
			});		
		}
}

export const addToList = (item,token,history) => {
	return dispatch => {
		 let request = {
			  method:"POST",
			  mode:"cors",
			  credentials:"include",
			  headers:{"Content-Type":"application/json",
						"token":token},
			  body:JSON.stringify(item)
		  }
		  dispatch(fetchLoading());
		  return fetch("/api/shopping",request).then(response => {
				if(response.ok) {
					dispatch(addToListSuccess());
					dispatch(getShoppingList(token));
					history.push("/list");
				} else {
					dispatch(addToListFailed("Server responded with status:"
					+response.statusText));
					dispatch(loadingDone());

				}
		  }).catch(error => {
				dispatch(addToListFailed(error));
				dispatch(loadingDone());
		  })
		
		}
}

export const removeFromList = (id,token) => {
	return dispatch => {
	  let request = {
		  method:"DELETE",
		  mode:"cors",
		  credentials:"include",
		  headers:{"Content-Type":"application/json",
					"token":token}
	  }
	  dispatch(fetchLoading());
	  return fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				dispatch(removeFromListSuccess());
				dispatch(getShoppingList(token));
			} else {
				dispatch(removeFromListFailed("Server responded with status:"+response.statusText));
				dispatch(loadingDone());

			}
	  }).catch(error => {
			dispatch(removeFromListFailed(error));
			dispatch(loadingDone());
	  })		
	}
}

export const editItem = (item,token) => {
	return dispatch => {
	  let request = {
		  method:"PUT",
		  mode:"cors",
		  credentials:"include",
		  headers:{"Content-Type":"application/json",
					"token":token},
		  body:JSON.stringify(item)
	  }
	  dispatch(fetchLoading());
	  return fetch("/api/shopping/"+item._id,request).then(response => {
			if(response.ok) {
				dispatch(editItemSuccess());
				dispatch(getShoppingList(token));
			} else {
				dispatch(loadingDone());
				dispatch(editItemFailed("Server responded with status:"+response.statusText));

			}
	  }).catch(error => {
			dispatch(loadingDone());
			dispatch(editItemFailed(error));
	  })
		
	}
}

//ACTION CREATORS

const getShoppingListSuccess = (list) => {
	return {
		type:GET_SHOPPINGLIST_SUCCESS,
		list:list
	}
}

const getShoppingListFailed = (error) => {
	return {
		type:GET_SHOPPINGLIST_FAILED,
		error:error
	}
}

const addToListSuccess = () => {
	return {
		type:ADD_TO_LIST_SUCCESS
	}
}

const addToListFailed = (error) => {
	return {
		type:ADD_TO_LIST_FAILED,
		error:error
	}	
}

const removeFromListSuccess = () => {
	return {
		type:REMOVE_FROM_LIST_SUCCESS
	}
}

const removeFromListFailed = (error) => {
	return {
		type:REMOVE_FROM_LIST_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const logoutDone = () => {
	return {
		type:LOGOUT_DONE
	}
}