import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import _ from "underscore"



const DO_SOMETHING = "do_something",
    DO_SOMETHING_ELSE = "do_something_else"

// actions
import {backbone_create} from "../backbone_ajax.js"

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

// reducers
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