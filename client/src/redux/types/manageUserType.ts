import { IUser } from "../../utils/TypeScript";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const DELETE_USER = "DELETE_USER";

export interface IGetUsers{
  type: typeof GET_ALL_USERS
  payload: IUser[]
}

export interface IDeleteUser{
  type: typeof DELETE_USER
  payload: string
}

export type IManageUser = IGetUsers | IDeleteUser;

