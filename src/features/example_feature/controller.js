import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Item, ItemCollection } from "./backbone_models/item.js"

// actions
import { backbone_create, backbone_read, backbone_update, backbone_delete } from "../util/backboneAJAX.js"

export function create_item(collection, item) {
    return function (dispatch) {

        backbone_create(collection, item, onError, (response) => { onSuccess(response, dispatch) })
    }
}

export function fetch_items(collection) {
    return function (dispatch) {

        var onError = function (err) {
            console.log(err, 'received error')
        }

        backbone_read(collection, null, onError, (response) => { onSuccess(response, dispatch) })
    }
}

export function update_item(collection, item, info) {
    return function (dispatch) {

        var onError = function (err) {
            console.log(err, 'received error')
        }

        backbone_update(collection, item, info, onError, (response) => { onSuccess(response, dispatch) })
    }
}

export function delete_item(collection, id) {
    return function (dispatch) {

        var onError = function (err) {
            console.log(err, 'received error')
        }

        backbone_delete(collection, id, onError, (response) => { onSuccess(response, dispatch) })
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

function onSuccess(response, dispatch) {

    dispatch({
        type: ITEM_COLLECTION,
        payload: { itemCollection: response, items: response.models }
    })
}

function onError(err) {
    console.log(err, 'received error')
}

// reducers
const ITEM_COLLECTION = "item_collection",
    EDIT_ITEM = "edit_item"

const init_state = {
    selectedItem: null,
    editingItem: null,
    item: Item,
    items: null,
    itemCollection: new ItemCollection(),
    itemCollectionChanged: false
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

export const selector = createStructuredSelector({
    selectedItem,
    editingItem,
    itemCollectionChanged,
    itemCollection,
    items,
    item
})