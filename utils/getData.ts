import fsPromises from "fs/promises";
import path from "path";

const getData = async (dbPath: string) => {
  const filePath = path.join(process.cwd(), dbPath);
  const jsonData = await fsPromises.readFile(filePath);
  return JSON.parse(jsonData.toString());
};

export default getData;
