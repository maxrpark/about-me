import axios from "axios";
import { LinkItemInt, ThemeDataInt, User } from "../ts/interfaces";
import { db } from "./connectDB";
import UserLink from "./model/Links";
import ThemeConfig from "./model/Theme";

const getData = async () => {
  let themesData: ThemeDataInt = { theme: "default", layout: "default" };

  // let { data } = await axios<User>(
  //   `https://api.github.com/users/${process.env.USER_NAME}`
  // );
  // let user: User = {
  //   name: data.name,
  //   image: data.avatar_url as string, // TODO
  //   isAdmin: true,
  //   email: data.email,
  // };

  let user = {
    name: "Maxi Ruti",
    image:
      "https://avatars.githubusercontent.com/u/84664090?s=400&u=1541d34fbd7b9a4fc483d641887cd6bf1e113d9a&v=4",
    isAdmin: true,
    email: "maxirutipark",
  };
  await db.connect();
  const linksData = await UserLink.find({});
  let themeConfig: ThemeDataInt[] | null = await ThemeConfig.find({});
  if (themeConfig && themeConfig.length === 0) {
    await ThemeConfig.create(themesData);
  } else {
    themesData = JSON.parse(JSON.stringify(themeConfig[0]));
  }

  await db.disconnect();

  let links = linksData.filter((item: LinkItemInt) => item.type === "links");
  let social = linksData.filter((item: LinkItemInt) => item.type === "social");

  links = JSON.parse(JSON.stringify(links));
  social = JSON.parse(JSON.stringify(social));

  return { links, social, themesData, user };
};

export default getData;
