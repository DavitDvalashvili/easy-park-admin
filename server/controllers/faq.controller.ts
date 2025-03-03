import { Request, Response } from "express";
import { createConnection } from "../db/database";
import { faq, ResponseStatus } from "../@types/globals";

export const getFaqs = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "";

  try {
    conn = await createConnection();

    let query = `SELECT f.faq_id AS faqId, f.question, f.answer
      FROM faq f
      JOIN  languages l ON f.language_id = l.language_id
      WHERE l.language = ?`;

    const faqs: faq[] = await conn.query(query, [lan]);

    res.send(faqs);
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

export const updateFaq = async (req: Request, res: Response) => {
  let conn;

  const faqId = req.params.faqId as string | number;
  const { question, answer } = req.body as faq;

  let response: ResponseStatus;

  if (!faqId) {
    res.send({ status: "update_error", message: "Invalid FAQ ID" });
    return;
  }

  try {
    conn = await createConnection();

    let query = `UPDATE faq f
    SET 
        f.question = ?,
        f.answer = ?
    WHERE 
        f.faq_id = ?`;

    const result: any = await conn.query(query, [question, answer, faqId]);

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

export const addFaq = async (req: Request, res: Response) => {
  let conn;

  const lan = req.query.lan as string | "";
  const { answer, question } = req.body as faq;

  let response: ResponseStatus;

  try {
    conn = await createConnection();

    const [language] = await conn.query(
      `SELECT language_id FROM languages WHERE LANGUAGE = ?`,
      [lan]
    );

    let query = `INSERT INTO faq (question, answer, language_id)
    VALUE (?, ?, ?)
    `;

    const result: any = await conn.query(query, [
      question,
      answer,
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
