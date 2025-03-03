import { Request, Response } from "express";
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

    const services: service[] = await conn.query(query, [lan]);

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

  const serviceId = req.params.serviceId as string | number;
  const { serviceName, title, description } = req.body as service;

  if (!serviceId) {
    res.send({ status: "update_error", message: "Invalid service ID" });
    return;
  }

  try {
    conn = await createConnection();

    let query = `UPDATE services s
    SET 
        s.service_name = ?, 
        s.title = ?, 
        s.description = ?
    WHERE 
        s.service_id = ?`;

    const result: any = await conn.query(query, [
      serviceName,
      title,
      description,
      serviceId,
    ]);

    if (result.affectedRows > 0) {
      res.send({
        status: "updated",
        message: "ინფორმაცია წარმატებით განახლდა",
      });
    } else {
      res.send({
        status: "update_error",
        message: "ინფორმაცია ვერ განახლდა",
      });
    }
  } catch (err) {
    console.error(err);
    res.send({
      status: "update_error",
      message: "ინფორმაცია ვერ განახლდა",
    });
  } finally {
    if (conn) conn.release();
  }
};
