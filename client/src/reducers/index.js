import { combineReducers } from "redux";

import profile from "./profile";
import messages from "./messages";
export default combineReducers({
  profile,
  messages
});
