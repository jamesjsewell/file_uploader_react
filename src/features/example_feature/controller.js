import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Item, ItemCollection } from "./backbone_models/item.js"

// actions
import { backbone_create, backbone_read, backbone_update, backbone_delete } from "../util/backboneAJAX.js"

export function CRUD(operation, operationData){

    return function(dispatch){

        var {collection, item, id, info} = operationData

        switch(operation){

            case 'create': {
                backbone_create(collection, item, (error) => { onError(error, dispatch) }, onSuccess )
                break
            }   

            case 'read': {
                backbone_read(collection, null, onError, onSuccess)
                break
            }

            case 'update': {
                backbone_update(collection, item, info, onError, onSuccess)
                break
            }

            case 'delete': {
                backbone_delete(collection, id, onError, onSuccess)
                break
            }

            case 'edit': {
                editItem(collection, id)
            }


        }

        function editItem(collection, id)  {
            var model = collection.get(id)
            dispatch({
                type: EDIT_ITEM,
                payload: { selected: model.attributes, editing: true }
            })
        }

        function onSuccess(collection, message){

            dispatch({
                type: ITEM_COLLECTION,
                payload: { itemCollection: collection, items: collection.models }
            })

            handleNotification(message)

        }

        function onError(message){
            handleNotification(message)
        }

        function handleNotification(message, time) {
    
            dispatch({
                type: MESSAGE,
                payload: message
            })
        
            // var reset = function(){
            //     dispatch({
            //         type: MESSAGE,
            //         payload: null
            //     })
            // }
        
            // setTimeout(reset, 8000)
            
        }

    }

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