import { Request, Response } from "express";
import knex from "../db/connection";

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    // Transformar informações para outro formato = serialize
    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.0.5:3333/images/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }

  // Serialização
  // API Transform

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not found" });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.5:3333/images/${point.image}`,
    };

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return res.json({ point: serializedPoint, items });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
      items,
    } = req.body;

    // Transactions = trx
    // Caso uma sequencia de Querys não execute, ele realiza um rollback em todas as que obtiveram sucesso
    const trx = await knex.transaction();

    // req.file vindo do midlleware multer
    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    };

    // knex retorna um array de ids dos dados inseridos
    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    // Relacionamento dos items em outra tabela
    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
