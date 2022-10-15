import { NextApiHandler } from "next";
import User from "../../../db/model/User";
import { db } from "../../../db/connectDB";

const handler: NextApiHandler = async (req, res) => {
  const { name, password } = req.body;
  await db.connect();
  const isAlreadyRegister =
    (await User.countDocuments({})) === 0 ? false : true;

  if (isAlreadyRegister) {
    res
      .status(404)
      .json({ msg: "This application already has an administrator" });
  }

  const user = await User.create({ name, password });
  await db.disconnect();

  res.json(user);
  // res.json(user);
};

export default handler;
