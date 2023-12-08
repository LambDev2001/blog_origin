import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routers";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Socket.id
const http = createServer(app);
export const io = new Server(http);
import { SocketServer } from "./config/socket";

io.on("connection", (socket: Socket) => SocketServer(socket));

// Routes
app.use("/api", routes);

// Database
import "./config/database";

// Server listening
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log("server is running on port", PORT);
  console.log(`http://localhost:${PORT}`);
});
