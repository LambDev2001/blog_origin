import * as types from "../types/manageUserType";
import { IUser } from "../../utils/TypeScript";

const manageUserReducer = (
  state: IUser[] = [],
  action: types.IManageUser
): IUser[] => {
  switch (action.type) {

    case types.GET_ALL_USERS:
      return action.payload;

    case types.DELETE_USER:
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default manageUserReducer;
