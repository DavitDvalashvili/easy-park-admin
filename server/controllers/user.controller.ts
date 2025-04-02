import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createConnection } from "../db/database";

import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      loggedIn: boolean;
      user_id?: number | string;
    };
  }
}

type User = {
  user_id?: string | number;
  user_name: string;
  password: string;
};

export const logIn = async (req: Request, res: Response) => {
  let conn;

  try {
    conn = await createConnection();

    const users: User[] = await conn.query(
      `SELECT * FROM users WHERE user_name = ?`,
      [req.body.userName]
    );
    const user: User = users[0];

    if (!user) {
      res.send({
        status: "user_not_found",
        message: "მომხმარებელი ვერ მოიძებნა",
      });
      return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (isMatch) {
      req.session.user = {
        loggedIn: true,
        user_id: user.user_id,
      };
      res.send(req.session.user);
    } else {
      res.send({
        status: "incorrect_password",
        message: "პაროლი არასწორია",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "error", message: "სერვერის შეცდომა" });
  } finally {
    if (conn) await conn.release();
  }
};

export const logOut = async (req: Request, res: Response) => {
  req.session.user = { loggedIn: false };
  res.send(req.session.user);
};

export const checkAuthentication = async (req: Request, res: Response) => {
  if (req.session.user) res.send(req.session.user);
  else res.send({ loggedIn: false });
};
