import { Request, response, Response } from "express";
import { createConnection } from "../db/database";
import { service, ResponseStatus } from "../@types/globals";

export const getServices = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "";

  try {
    conn = await createConnection();

    const query = `   
      SELECT s.service_id AS serviceId, s.service_name AS serviceName, s.title, s.description
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

export const updateService = async (req: Request, res: Response) => {
  let conn;

  const serviceId = req.query.service_id as string | number;
  const { serviceName, title, description, languageId } = <service>req.query;

  try {
    conn = await createConnection();
    let response: ResponseStatus;

    let query = `UPDATE services s
    JOIN language l ON l.language_id = s.language_id
    SET 
        s.service_name = ?, 
        s.title = ?, 
        s.description = ?
    WHERE 
        l.language = ? 
        AND s.service_id = ?`;

    await conn
      .query(query, [serviceName, title, description, languageId, serviceId])
      .then((res) => {
        response = {
          status: "updated",
          message: "სერვისი წარმატებით განახლდა",
        };
        res.send(response);
      })
      .catch((err) => {
        console.log(err);
        response = {
          status: "update_error",
          message: "სერვისი ვერ განახლდა",
        };
        res.send(response);
      });
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};
