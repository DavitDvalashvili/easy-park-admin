import { Request, Response } from "express";
import { createConnection } from "../db/database";

export const getServices = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "";

  try {
    conn = await createConnection();

    const query = `   
      SELECT s.service_id, s.service_name, s.title, s.description
      FROM services s
      JOIN  languages l ON s.language_id = l.language_id
      WHERE l.language = ?
      LIMIT 6`;

    const services = await conn.query(query, [lan]);

    res.send(services);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "devices not found" });
  } finally {
    if (conn) conn.release();
  }
};
