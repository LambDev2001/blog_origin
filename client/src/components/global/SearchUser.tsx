import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import { getAPI } from "../../utils/FetchData";
import { IUser } from "../../utils/TypeScript";

const Search = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<IUser[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        const res = await getAPI(`search/users?title=${search}`);
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    setSearch("");
    setBlogs([]);
  }, [pathname]);

  return (
    <div className="search w-100 position-relative me-4">
      <input
        type="text"
        className="form-control me-2 w-100"
        value={search}
        placeholder="Enter your search ..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {search.length >= 2 && (
        <div
          className="position-absolute pt-2 px-1 w-100 rounded"
          style={{
            background: "#eee",
            zIndex: 10,
            maxHeight: "calc(100vh - 100px)",
            overflow: "auto",
          }}
        >
          {blogs.length ? (
            blogs.map((user) => (
              <Link
                className="dropdown-item not-link"
                to={`/profile/${user._id}`}
              >
                <div className="category_row bg-light">
                  <p className="m-0 text-capitalize">{user.name}</p>
                  <p className="m-0 text-capitalize">{user.role}</p>
                </div>
              </Link>
            ))
          ) : (
            <h3 className="text-center">Not Found User</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
