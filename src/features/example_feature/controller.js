import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Item, ItemCollection } from "./backbone_models/item.js"

// actions
import { backbone_create, backbone_read, backbone_update, backbone_delete } from "../util/backboneAJAX.js"

export function CRUD(operation, operationData) {

    return function (dispatch) {

        dispatch({
            type: ASYNC,
            payload: true
        })

        var { collection, item, id, info } = operationData

        switch (operation) {

            case 'create': {
                backbone_create(collection, item, onError, onSuccess)
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

        function editItem(collection, id) {
            var model = collection.get(id)
            dispatch({
                type: EDIT_ITEM,
                payload: { selected: model.attributes, editing: true }
            })
        }

        function onSuccess(collection, message) {

            dispatch({
                type: UPDATE_ITEM_COLLECTION,
                payload: { collection: collection, array: collection.models }
            })

            handleNotification(message)

            dispatch({
                type: ASYNC,
                payload: false
            })

        }

        function onError(message) {

            handleNotification(message)

            dispatch({
                type: ASYNC,
                payload: false
            })
        }

        function handleNotification(message, time) {

            dispatch({
                type: MESSAGE,
                payload: message
            })


        }

    }

}

// reducers
const UPDATE_ITEM_COLLECTION = "update_item_collection",
    EDIT_ITEM = "edit_item",
    MESSAGE = "message",
    ASYNC = "aysnc"

const initial_state = {

    selected: null,
    editing: null,
    message: null,
    collection: new ItemCollection(),
    model: Item,
    array: null

}

export const itemsReducer = function(state = initial_state, action) {

    var payload = action.payload

    switch (action.type) {

        case UPDATE_ITEM_COLLECTION: {

            return _.extend({}, state, {collection: payload.collection, array: payload.array, editing: false })
            break

        }

        case EDIT_ITEM: {

            return _.extend({}, state, {selected: payload.selected, editing: payload.editing, message: '...editing', async_in_progress: false })
            break

        }

        case MESSAGE: {

            return _.extend({}, state, {message: payload})
            break

        }

        case ASYNC:{
            
            return _.extend({}, state, {async_in_progress: payload})
        }

    }

    return state
}

const items = state => state.items

export const selector = createStructuredSelector({
    items
})



