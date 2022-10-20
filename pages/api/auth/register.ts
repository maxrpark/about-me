import { NextApiHandler } from "next";
import User from "../../../db/model/User";
import { db } from "../../../db/connectDB";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
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
      break;

    default:
      res.setHeader("Allow", "POST");
      res.status(405).json({ msg: "Method Not Allowed" });
      break;
  }
};

export default handler;
