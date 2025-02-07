import { Request, Response } from "express";
import { createConnection } from "../db/database";

export const getDeviceType = async (req: Request, res: Response) => {
  let conn;

  try {
    conn = await createConnection();
    const query = `   
      SELECT dt.device_type_id, dt.device_type, d.name
      FROM device_type dt
      JOIN  devices d ON dt.device_type_id = d.device_type_id
      GROUP BY dt.device_type_id
        `;
    const deviceType = await conn.query(query);

    res.send(deviceType);
  } catch (err) {
    console.log(err);
    res.sendStatus(404).send({ message: "devices not found" });
  } finally {
    if (conn) conn.release();
  }
};
