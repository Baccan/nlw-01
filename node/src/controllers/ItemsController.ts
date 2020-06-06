import { Request, Response } from "express";
import knex from "../db/connection";

class ItemsController {
  async index(req: Request, res: Response) {
    // SELECT * FROM items
    const items = await knex("items").select("*");

    // Transformar informações para outro formato = serialize
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.5:3333/images/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default ItemsController;
