import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { itemsReducer } from "./example_feature/controller.js"

const rootReducer = combineReducers({items: itemsReducer, form: formReducer})

export default rootReducer