import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IParams } from "../../utils/TypeScript";
import { RootStore } from "../../utils/TypeScript";

import UserInfo from "../../components/profile/UserInfo";
import OtherInfo from "../../components/profile/OtherInfo";
import UserBlogs from "../../components/profile/UserBlogs";

const Profile = () => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((stage: RootStore) => stage);

  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo id={slug} />}
      </div>

      <div className="col-md-7">
        <UserBlogs />
      </div>
    </div>
  );
};

export default Profile;
