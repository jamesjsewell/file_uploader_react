import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Item, ItemCollection } from "./backbone_models/item.js"

// actions
import {backbone_create, backbone_read} from "../util/backboneAJAX.js"

export function create_item(collection, item){
    return function(dispatch){
        console.log(item)
        backbone_create(collection, item, onError, (response)=>{ onSuccess(response, dispatch) })
    }
}

export function fetch_items(collection){
    return function(dispatch){
    
        var onError = function(err){
            console.log(err, 'received error')
        }

        backbone_read(collection, null, onError, (response)=>{ onSuccess(response, dispatch) })
    }
}

function onSuccess(response, dispatch){

    dispatch({
        type: ITEM_COLLECTION,
        payload: {itemCollection: response, items: response.models}
    })
}

function onError(err){
    console.log(err, 'received error')
}

// reducers
const DO_SOMETHING = "do_something",
    DO_SOMETHING_ELSE = "do_something_else",
    ITEM_COLLECTION = "item_collection"

const init_state = {
    something: "",
    item: Item,
    items: null,
    itemCollection: new ItemCollection()
}

function testReducer(state = init_state, action) {
	switch (action.type) {
		case DO_SOMETHING: {
			return _.extend({}, state, { something: action.payload })
        }
        case DO_SOMETHING_ELSE: {
            return _.extend({}, state, { something: null})
        }
        case ITEM_COLLECTION:{
            return _.extend({}, state, { items: action.payload.items, itemCollection: action.payload.itemCollection })
        }
	}

	return state
}

export default testReducer

// selectors
const itemCollection = state => state.test.itemCollection
const items = state => state.test.items
const item = state => state.test.item

export const selector = createStructuredSelector({
    itemCollection,
    items,
    item
})