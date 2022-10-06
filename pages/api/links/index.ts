import { NextApiHandler } from "next";
import { db } from "../../../db/connectDB";
import UserLink from "../../../db/model/Links";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return getAllLinks(req, res);

    case "POST":
      return createLink(req, res);

    case "DELETE":
      await db.connect();
      await UserLink.deleteMany({});
      await db.disconnect();
      return res.status(200).json("All clear");
  }
};

const getAllLinks: NextApiHandler = async (req, res) => {
  try {
    await db.connect();
    const links = await UserLink.find({});
    await db.disconnect();

    return res.status(200).json(links);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createLink: NextApiHandler = async (req, res) => {
  const { url, name, type } = req.body;
  if (!url || !name || !type) {
    return res.status(400).json("Please provide all values");
  }
  try {
    await db.connect();
    const link = await UserLink.create(req.body);
    await db.disconnect();
    return res.status(200).json(link);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default handler;
