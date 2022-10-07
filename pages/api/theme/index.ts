import { NextApiHandler } from "next";
import { db } from "../../../db/connectDB";
import ThemeConfig from "../../../db/model/Theme";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return getTheme(req, res);

    case "PATCH":
      return updateTheme(req, res);
  }
};

const getTheme: NextApiHandler = async (req, res) => {
  try {
    await db.connect();
    let themeConfig = await ThemeConfig.find({});
    await db.disconnect();
    return res.status(200).json({ themeConfig: themeConfig[0] });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTheme: NextApiHandler = async (req, res) => {
  try {
    await db.connect();
    const link = await ThemeConfig.findOneAndUpdate(
      { $first: req.body },
      req.body,
      { runValidators: true, new: true }
    );
    console.log(link);

    await db.disconnect();
    return res.status(200).json(link);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
