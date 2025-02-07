import { Request, Response } from "express";
import { createConnection } from "../db/database";
import bcrypt from "bcrypt";

type userSecret = {
  user_password?: string | any;
};
interface userType extends userSecret {
  user_id: number;
  user_name: string;
}
declare module "express-session" {
  interface SessionData {
    Auth: userType;
  }
}

export const login = async (req: Request, res: Response) => {
  let conn;

  const { userName, password } = req.body;

  try {
    conn = await createConnection();

    const user: userType = (
      await conn.query("SELECT * FROM users WHERE user_name = ?", [userName])
    )[0];

    if (user) {
      bcrypt.compare(password, user.user_password).then((isValid: boolean) => {
        if (isValid) {
          const userData: userType = {
            user_id: user.user_id,
            user_name: user.user_name,
          };
          req.session.Auth = userData;
          req.session.save(() => {
            res.send(userData);
          });
        } else {
          res.status(404).send({ message: "incorrect password" });
        }
      });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (err) {
    console.log("login error", err);
    res.status(500).send({ message: "server error" });
  } finally {
    if (conn) conn.release();
  }
};

export const checkSession = async (req: Request, res: Response) => {
  if (req.session.Auth) {
    console.log(req.session.Auth);
    res.send(req.session.Auth);
  } else {
    res.status(401).send({ message: "you are not authenticated" });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "server error" });
    } else {
      res.send({ message: "logged out successfully" });
    }
  });
};
