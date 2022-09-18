import { NextApiHandler } from "next";
const fs = require("fs");

const handler: NextApiHandler = (req, res) => {
  if (req.method === "POST") {
    fs.writeFileSync("./db/db_themes_options.json", JSON.stringify(req.body));
    return res.status(200).json({ msg: "updated" });
  }
};

export default handler;
