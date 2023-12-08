import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStore } from "../utils/TypeScript";

import { deleteUser } from "../redux/actions/userAction";

import NotFound from "../components/global/NotFound";
import { Link } from "react-router-dom";
import SearchUser from "../components/global/SearchUser";

const Manager = () => {
  const { auth, manageUserReducer } = useSelector((state: RootStore) => state);

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    if (!auth.access_token) return;
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(id, auth.access_token));
    }
  };

  if (auth.user?.role !== "admin") return <NotFound />;
  return (
    <div className="category">
      <div className="mt-3 mb-3">
        <SearchUser />
      </div>
      <hr />
      <div>
        {manageUserReducer.map((user, index) => (
          <div className="category_row">
            <Link
              className="dropdown-item not-link"
              to={`/profile/${user._id}`}
            >
              <div className="manager_user_row" key={user._id}>
                <p className="m-0 text-capitalize">{index + 1}</p>
                <p className="m-0 text-capitalize">{user.name}</p>
                <p className="m-0 text-capitalize">{user.role}</p>
              </div>
            </Link>

            <div key={user._id}>
              <i
                className="fas fa-trash-alt"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(user._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
