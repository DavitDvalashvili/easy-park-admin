import { Request, Response } from "express";
import { createConnection } from "../db/database";
import {
  deviceData,
  device,
  feature,
  image,
  ResponseStatus,
} from "../@types/globals";

export const getDeviceType = async (req: Request, res: Response) => {
  let conn;

  try {
    conn = await createConnection();
    const query = `   
      SELECT dt.device_type_id, dt.device_type, d.name
      FROM device_type dt
      JOIN  devices d ON dt.device_type_id = d.device_type_id
      WHERE d.language_id = 0
        `;
    const deviceType = await conn.query(query);

    res.send(deviceType);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "devices not found" });
  } finally {
    if (conn) conn.release();
  }
};

export const getDevice = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "Ge";
  const deviceTypeID = req.query.Id as string | number;

  try {
    conn = await createConnection();
    const query = `   
      SELECT d.device_id as deviceId, d.name, d.description
    FROM devices d
      JOIN languages l ON d.language_id = l.language_id
    WHERE l.language = ? AND d.device_type_id = ?;

        
    SELECT f.feature_id AS featureId, f.feature
      FROM features f
    JOIN  languages l ON f.language_id = l.language_id
      WHERE l.language = ? AND f.device_type_id = ?;
          
    SELECT i.image_id AS imageId, i.image_url AS imageUrl 
      FROM images i WHERE i.device_type_id = ?; 
    `;

    const result = await conn.query(query, [
      lan,
      deviceTypeID,
      lan,
      deviceTypeID,
      deviceTypeID,
    ]);

    const [devices, features, images] = result;

    const deviceData: deviceData = {
      devices: devices as device[],
      features: features as feature[],
      images: images as image[],
    };

    res.send(deviceData);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "devices not found" });
  } finally {
    if (conn) conn.release();
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  let conn;

  const deviceId = req.params.deviceId as string | number;
  const { name, description } = req.body as device;

  let response: ResponseStatus;

  if (!deviceId) {
    res.send({ status: "update_error", message: "Invalid ID" });
    return;
  }

  try {
    conn = await createConnection();

    let query = `UPDATE devices d
    SET 
        d.name = ?,
        d.description = ?
    WHERE 
        d.device_id = ?`;

    const result: any = await conn.query(query, [name, description, deviceId]);

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

export const updateFeature = async (req: Request, res: Response) => {
  let conn;

  const featureId = req.params.featureId as string | number;
  const { feature } = req.body as feature;

  let response: ResponseStatus;

  if (!featureId) {
    res.send({ status: "update_error", message: "Invalid benefit ID" });
    return;
  }

  try {
    conn = await createConnection();

    let query = `UPDATE features f
    SET 
        f.feature = ?
    WHERE 
        f.feature_id = ?`;

    const result: any = await conn.query(query, [feature, featureId]);

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

export const addFeature = async (req: Request, res: Response) => {
  let conn;

  const deviceTypeId = req.query.deviceTypeId as string | number;
  const lan = req.query.lan as string | number;
  const { feature } = req.body as feature;

  let response: ResponseStatus;

  try {
    conn = await createConnection();

    const [language] = await conn.query(
      `SELECT language_id FROM languages WHERE language = ?`,
      [lan]
    );

    let query = `INSERT INTO features (feature, language_id, device_type_id)
    VALUE (?, ?, ?)
    `;

    const result: any = await conn.query(query, [
      feature,
      language.language_id,
      deviceTypeId,
    ]);

    if (result.affectedRows > 0) {
      response = {
        status: "inserted",
        message: "ინფორმაცია წარმატებით დაემატა",
        insert_id: Number(result.insertId),
      };
      res.send(response);
    } else {
      response = {
        status: "insert_error",
        message: "ინფორმაცია ვერ დაემატა",
      };
      res.send(response);
    }
  } catch (err) {
    console.error(err);
    response = {
      status: "insert_error",
      message: "ინფორმაცია ვერ დაემატა",
    };
    res.send(response);
  } finally {
    if (conn) conn.release();
  }
};

export const deleteFeature = async (req: Request, res: Response) => {
  let conn;
  const { featureId } = req.params;

  try {
    conn = await createConnection();

    // Execute the delete query
    const result = await conn.query(
      `DELETE FROM features f 
       WHERE f.feature_id = ?`,
      [featureId]
    );

    if (result.affectedRows > 0) {
      res.send({
        status: "deleted",
        message: "ინფორმაცია წარმატებით წაიშალა",
      });
    } else {
      res.send({
        status: "delete_error",
        message: "ინფორმაცია ვერ წაიშალა",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "delete_error",
      message: "დაფიქსირდა შეცდომა სერვერზე",
    });
  } finally {
    if (conn) conn.end();
  }
};

// export const addImage = async (req: Request, res: Response) => {
//   let conn;

//   // const deviceTypeId = req.query.deviceTypeId as string | number;
//   // const lan = req.query.lan as string | number;
//   // const { feature } = req.body as feature;

//   let response: ResponseStatus;

//   try {
//     conn = await createConnection();

//     const [language] = await conn.query(
//       `SELECT language_id FROM languages WHERE language = ?`,
//       [lan]
//     );

//     let query = `INSERT INTO features (feature, language_id, device_type_id)
//     VALUE (?, ?, ?)
//     `;

//     const result: any = await conn.query(query, [
//       feature,
//       language.language_id,
//       deviceTypeId,
//     ]);

//     if (result.affectedRows > 0) {
//       response = {
//         status: "inserted",
//         message: "ინფორმაცია წარმატებით დაემატა",
//         insert_id: Number(result.insertId),
//       };
//       res.send(response);
//     } else {
//       response = {
//         status: "insert_error",
//         message: "ინფორმაცია ვერ დაემატა",
//       };
//       res.send(response);
//     }
//   } catch (err) {
//     console.error(err);
//     response = {
//       status: "insert_error",
//       message: "ინფორმაცია ვერ დაემატა",
//     };
//     res.send(response);
//   } finally {
//     if (conn) conn.release();
//   }
// };
