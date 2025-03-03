import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { benefit, ResponseStatus } from "../@types/globals";

export const getBenefits = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "Ge";

  try {
    conn = await createConnection();

    const query = `SELECT b.benefit_id AS benefitId, b.benefit
      FROM benefits b
      JOIN  languages l ON b.language_id = l.language_id
      WHERE l.language = ?`;

    let benefits: benefit[] = await conn.query(query, [lan]);

    res.send(benefits);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

export const updateBenefit = async (req: Request, res: Response) => {
  let conn;

  const benefitId = req.params.benefitId as string | number;
  const { benefit } = req.body as benefit;

  let response: ResponseStatus;

  if (!benefitId) {
    res.send({ status: "update_error", message: "Invalid benefit ID" });
    return;
  }

  try {
    conn = await createConnection();

    let query = `UPDATE benefits b
    SET 
        b.benefit = ?
    WHERE 
        b.benefit_id = ?`;

    const result: any = await conn.query(query, [benefit, benefitId]);

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

export const addBenefit = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "";
  const { benefit } = req.body as benefit;

  let response: ResponseStatus;

  try {
    conn = await createConnection();

    const [language] = await conn.query(
      `SELECT language_id FROM languages WHERE LANGUAGE = ?`,
      [lan]
    );

    let query = `INSERT INTO benefits (benefit, language_id)
    VALUE (?, ?)
    `;

    const result: any = await conn.query(query, [
      benefit,
      language.language_id,
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
