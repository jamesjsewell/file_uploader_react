import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Item, ItemCollection } from "./backbone_models/item.js"

// actions
import {backbone_create, backbone_read} from "../backbone_ajax.js"

export function doSomething() {
	return function(dispatch) {
		dispatch({ type: DO_SOMETHING, payload: "did something" })
	}
}

export function doSomethingElse() {
	return function(dispatch) {
		dispatch({ type: DO_SOMETHING_ELSE, payload: "" })
	}
}

export function fetch_items(){
    return function(dispatch){
        var collection = new ItemCollection()
        var onError = function(err){
            console.log(err, 'received error')
        }
        var onSuccess = function(response){
            console.log(response, 'received response')
        }
        backbone_read(collection, null, onError, onSuccess)
    }
}

// reducers
const DO_SOMETHING = "do_something",
    DO_SOMETHING_ELSE = "do_something_else"

const init_state = {
	something: "",
}

function testReducer(state = init_state, action) {
	switch (action.type) {
		case DO_SOMETHING: {
			return _.extend({}, state, { something: action.payload })
        }
        case DO_SOMETHING_ELSE: {
            return _.extend({}, state, { something: null})
        }
	}

	return state
}

export default testReducer

// selectors
const something = state => state.test.something

export const selector = createStructuredSelector({
	something
})