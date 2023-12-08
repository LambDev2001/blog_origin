import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getOtherInfo } from "../../redux/actions/userAction";
import { IUser, RootStore } from "../../utils/TypeScript";
import Loading from "../alert/Loading";

interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>();

  const { otherInfo } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [id, otherInfo, dispatch]);

  if (!other) return <Loading />;
  return (
    <div className="profile_info text-center rounded">
      <div className="info-avatar">
        <img src={other.avatar} alt="avatar" />
      </div>

      <h5 className="text-uppercase text-danger">{other.role}</h5>

      <div>
        Name: <span className="text-info">{other.name}</span>
      </div>

      <div>Email / PhoneNumber</div>
      <span className="text-info">{other.account}</span>

      <div>
        Join Date:{" "}
        <span style={{ color: "#ffc107" }}>
          {new Date(other.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default OtherInfo;
