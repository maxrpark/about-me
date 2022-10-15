import axios from "axios";
import { LinkItemInt, ThemeDataInt } from "../ts/interfaces";
import { db } from "./connectDB";
import UserLink from "./model/Links";
import ThemeConfig from "./model/Theme";
import User from "./model/User";

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

  let user;

  let defaultUser: any = {
    name: "Maxi Ruti",
    image: "/user-icon.jpg",
    isAdmin: true,
    email: "maxirutipark",
  };
  await db.connect();

  // links
  const linksData = await UserLink.find({});

  // theme
  let themeConfig: ThemeDataInt[] | null = await ThemeConfig.find({});
  if (themeConfig && themeConfig.length === 0) {
    await ThemeConfig.create(themesData);
  } else {
    themesData = JSON.parse(JSON.stringify(themeConfig[0]));
  }

  // user
  let dbUser = await User.find({});
  if (dbUser && dbUser.length === 0) {
    user = defaultUser;
  } else {
    user = JSON.parse(JSON.stringify(dbUser[0]));
  }

  await db.disconnect();

  let links = linksData.filter((item: LinkItemInt) => item.type === "links");
  let social = linksData.filter((item: LinkItemInt) => item.type === "social");

  links = JSON.parse(JSON.stringify(links));
  social = JSON.parse(JSON.stringify(social));

  return { links, social, themesData, user };
};

export default getData;
