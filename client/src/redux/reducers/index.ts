import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import categories from "./categoryReducer";
import homeBlogs from "./homeBlogReducer";
import blogsCategory from "./blogCategoryReducer";
import otherInfo from "./otherInfoReducer";
import blogsUser from "./blogsUserReducer";
import comments from "./commentReducer";
import socket from "./socketReducer";
import manageUserReducer from "./manageUserReducer";

export default combineReducers({
  auth,
  alert,
  categories,
  homeBlogs,
  blogsCategory,
  otherInfo,
  blogsUser,
  comments,
  socket,
  manageUserReducer,
});
