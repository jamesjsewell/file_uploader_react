import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import testReducer from "./example_feature/controller.js"

const rootReducer = combineReducers({test: testReducer})

export default rootReducer