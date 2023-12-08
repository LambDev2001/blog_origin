import authRouter from "../routers/authRouter";
import userRouter from "../routers/userRouter";
import categoryRouter from "../routers/categoryRouter";
import blogRouter from "../routers/blogRouter";
import commentRouter from "../routers/commentRouter";

const routes = [
  authRouter,
  userRouter,
  categoryRouter,
  blogRouter,
  commentRouter,
];

export default routes;
