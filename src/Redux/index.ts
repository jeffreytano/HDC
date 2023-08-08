import {combineReducers, createStore} from "redux"
import EditMember from "./Reducers/TeamBuildReducer"


const rootReducer = combineReducers({EditMember})

export const Store = createStore(rootReducer);