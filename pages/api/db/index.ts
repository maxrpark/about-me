import { NextApiHandler } from "next";
const fs = require("fs");

const handler: NextApiHandler = (req, res) => {
    //...
    if (req.method === "POST") {
        fs.writeFileSync("./db/db_about_me.json", JSON.stringify(req.body));
        return res.status(200).json({});
    }
};

export default handler;
