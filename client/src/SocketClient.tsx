import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootStore, IComment } from "./utils/TypeScript";

import {
  CREATE_COMMENT,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
} from "./redux/types/commentType";

const SocketClient = () => {
  const { socket } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on("test", (data: any) => {
      console.log(data);
      
    });

    return () => {
      socket.off("createComment");
    };
  }, [socket, dispatch]);

  // create comment
  useEffect(() => {
    if (!socket) return;

    socket.on("createComment", (data: IComment) => {
      dispatch({
        type: CREATE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socket.off("createComment");
    };
  }, [socket, dispatch]);

  // reply comment
  useEffect(() => {
    if (!socket) return;

    socket.on("replyComment", (data: IComment) => {
      dispatch({
        type: REPLY_COMMENT,
        payload: data,
      });
    });

    return () => {
      socket.off("replyComment");
    };
  }, [socket, dispatch]);

  // delete comment
  useEffect(() => {
    if (!socket) return;

    socket.on("updateComment", (data: IComment) => {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socket.off("updateComment");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("deleteComment", (data: IComment) => {
      dispatch({
        type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
        payload: data,
      });
    });

    return () => {
      socket.off("deleteComment");
    };
  }, [socket, dispatch]);

  return <div></div>;
};

export default SocketClient;
