import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { about, ResponseStatus } from "../@types/globals";

export const getAbout = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "Ge";

  try {
    conn = await createConnection();

    const query = `SELECT a.id as Id, a.title, a.subtitle, a.description
      FROM about a
      JOIN  languages l ON a.language_id = l.language_id
      WHERE l.language = ?`;

    const [about] = await conn.query(query, [lan]);

    res.send(about);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  let conn;

  const Id = req.params.Id as string | number;
  const { title, subtitle, description } = req.body as about;

  let response: ResponseStatus;

  if (!Id) {
    res.send({ status: "update_error", message: "Invalid ID" });
    return;
  }

  try {
    conn = await createConnection();

    let query = `UPDATE about a
    SET 
        a.title = ?,
        a.subtitle = ?,
        a.description = ?
    WHERE 
        a.id = ?`;

    const result: any = await conn.query(query, [
      title,
      subtitle,
      description,
      Id,
    ]);

    if (result.affectedRows > 0) {
      response = {
        status: "updated",
        message: "ინფორმაცია წარმატებით განახლდა",
      };
      res.send(response);
    } else {
      response = {
        status: "update_error",
        message: "ინფორმაცია ვერ განახლდა",
      };
      res.send(response);
    }
  } catch (err) {
    console.error(err);
    response = {
      status: "update_error",
      message: "ინფორმაცია ვერ განახლდა",
    };
    res.send(response);
  } finally {
    if (conn) conn.release();
  }
};
