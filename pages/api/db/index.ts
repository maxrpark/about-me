import { NextApiHandler } from "next";
const fs = require("fs");
import { getToken } from "next-auth/jwt";

const handler: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });
  console.log(token);

  if (!token || token.email !== process.env.ADMINISTRATOR) {
    return res.status(401).json({ msg: "Unauthorized to visit this route" });
  }

  if (req.method === "POST") {
    try {
      const { data, fileName } = JSON.parse(req.body);
      fs.writeFileSync(`./db/${fileName}.json`, JSON.stringify(data));
      return res.status(200).json({ msg: "succeeded" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};

export default handler;
