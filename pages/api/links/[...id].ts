import { NextApiHandler } from "next";
import { db } from "../../../db/connectDB";
import UserLink from "../../../db/model/Links";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "PATCH":
      return updateLink(req, res);

    case "DELETE":
      return deleteLink(req, res);
  }
};

const updateLink: NextApiHandler = async (req, res) => {
  const { url, name } = req.body;
  if (!url || !name) {
    return res.status(400).json("Please provide all values");
  }

  try {
    await db.connect();
    const link = await UserLink.findOneAndUpdate(
      { _id: req.query.id },
      { url, name },
      { runValidators: true, new: true }
    );

    await db.disconnect();
    return res.status(200).json(link);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteLink: NextApiHandler = async (req, res) => {
  // const { url, name } = req.body;
  // if (!url || !name) {
  //   return res.status(400).json("Please provide all values");
  // }

  try {
    await db.connect();
    await UserLink.findOneAndDelete({ _id: req.query.id });
    await db.disconnect();
    return res.status(200).json("All clear");
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
