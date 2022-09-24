import { NextApiHandler } from "next";
const fs = require("fs");
import { getToken } from "next-auth/jwt";

const handler: NextApiHandler = async (req, res) => {
  //...
  const token = await getToken({ req });
  if (!token || token.email !== process.env.ADMINISTRATOR) {
    return res.status(401).json({ msg: "Unauthorized to visit this route" });
  }

  if (req.method === "POST") {
    const { data, fileName } = JSON.parse(req.body);
    fs.writeFileSync(`./db/${fileName}.json`, JSON.stringify(data));
    return res.status(200).json({ msg: "succeeded" });
  }
};

export default handler;
