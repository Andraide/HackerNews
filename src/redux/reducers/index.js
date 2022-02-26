import { combineReducers } from "redux";
import counter from "./reducer";
import librarys from "./libraryMenu";

export default combineReducers({
    counter,
    librarys
})