import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Item, ItemCollection } from "./backbone_models/item.js"

// actions
import { backbone_create, backbone_read, backbone_update, backbone_delete } from "../util/backboneAJAX.js"

export function create_item(collection, item) {

    return function (dispatch) {

        class CreateSuccess extends Success{
            redux(doThis){
                dispatch(doThis)
            }
        }

        backbone_create(collection, item, (error) => { onError(error, dispatch) }, CreateSuccess )
    }
}

export function fetch_items(collection) {
    return function (dispatch) {  
        
        class FetchSuccess extends Success{
            redux(doThis){
                dispatch(doThis)
            }
        }

        Success.dispatch = dispatch
        backbone_read(collection, null, onError, FetchSuccess)
    }
}

export function update_item(collection, item, info) {
    return function (dispatch) {

        class UpdateSuccess extends Success{
            redux(doThis){
                dispatch(doThis)
            }
        }

        backbone_update(collection, item, info, onError, UpdateSuccess)
    }
}

export function delete_item(collection, id) {

    return function (dispatch) {

        class DeleteSuccess extends Success{
            redux(doThis){
                dispatch(doThis)
            }
        }
        
        backbone_delete(collection, id, onError, DeleteSuccess)
    }
}

export function edit_item(collection, id) {
    return function (dispatch) {

        var model = collection.get(id)
        dispatch({
            type: EDIT_ITEM,
            payload: { selected: model.attributes, editing: true }
        })

    }
}

function successMiddleware(){

}

class Success {

    constructor(collection, message){
        this.collection = collection
        this.message = message
        this.start()
    }
    
    start() {
        
        this.redux({
            type: ITEM_COLLECTION,
            payload: { itemCollection: this.collection, items: this.collection.models }
        })

        this.showMessage()
    }

    showMessage() {

        handleMessage(this.message, this.redux, 2000)

    }

}

function onSuccess(){
    console.log('sfad')
}

function onError(error, dispatch) {
   
    handleMessage(error, dispatch)
}

function handleMessage(message, dispatch, time){
    
    dispatch({
        type: MESSAGE,
        payload: message
    })

    var reset = function(){
        dispatch({
            type: MESSAGE,
            payload: null
        })
    }

    setTimeout(reset, 8000)
    
}

// reducers
const ITEM_COLLECTION = "item_collection",
    EDIT_ITEM = "edit_item",
    MESSAGE = "message"

const init_state = {
    selectedItem: null,
    editingItem: null,
    item: Item,
    items: null,
    itemCollection: new ItemCollection(),
    itemCollectionChanged: false,
    errorMessage: ''
}

function testReducer(state = init_state, action) {
    switch (action.type) {

        case ITEM_COLLECTION: {

            var updated = state.itemCollectionChanged

            if (updated) {
                updated = false
            }
            else {
                updated = true
            }

            return _.extend({}, state, { items: action.payload.items, itemCollection: action.payload.itemCollection, itemCollectionChanged: updated, editingItem: false })
        }
        case EDIT_ITEM: {
            return _.extend({}, state, { selectedItem: action.payload.selected, editingItem: action.payload.editing })
        }
        case MESSAGE: {
            return _.extend({}, state, {message: action.payload})
        }
    }

    return state
}

export default testReducer

// selectors
const selectedItem = state => state.test.selectedItem
const editingItem = state => state.test.editingItem
const itemCollectionChanged = state => state.test.itemCollectionChanged
const itemCollection = state => state.test.itemCollection
const items = state => state.test.items
const item = state => state.test.item
const message = state => state.test.message

export const selector = createStructuredSelector({
    selectedItem,
    editingItem,
    itemCollectionChanged,
    itemCollection,
    items,
    item,
    message
})