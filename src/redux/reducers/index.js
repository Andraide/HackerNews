import { combineReducers } from "redux";
import counter from "./reducer";
import librarys from "./libraryMenu";
import toogleMenu from "./toogleMenu"

export default combineReducers({
    counter,
    librarys,
    toogleMenu
})