import { Response, Request } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import Blogs from "../models/blogModel";

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { avatar, name } = req.body;

      const user = await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          avatar,
          name,
        }
      );

      res.json({ msg: "Update success" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    if (req.user.type !== "register")
      return res.status(400).json({
        msg: ` Quick login account with login ${req.user.type} can't use this function`,
      });

    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );

      res.json({ msg: "Reset password success" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.findById(req.params.id).select("-password");
      res.json(user);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  manageUsers: async (req: Request, res: Response) => {
    try {
      const users = await Users.find({}).select("-password");
      res.json(users);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req: IReqAuth, res: Response) => {
    // if (!req.user)
    //   return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      await Users.findByIdAndDelete({ _id: req.params.id });

      res.json({ msg: "Delete success" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  searchUsers: async (req: Request, res: Response) => {
    try {
      const users = await Users.aggregate([
        {
          $search: {
            index: "searchUser",
            autocomplete: {
              query: `${req.query.title}`,
              path: "name",
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        {
          $project: {
            name: 1,
            role: 1,
            createdAt: 1,
          },
        },
      ]);

      if (users.length < 2) return res.status(400).json({ msg: "No Users." });

      res.json(users);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  changeRoleUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { id, name, role } = req.body;

      await Users.findByIdAndUpdate(
        { _id: id },
        {
          role,
        }
      );

      res.json({ msg: `${name} change to ${role}` });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
