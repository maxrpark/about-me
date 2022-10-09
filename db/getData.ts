import axios from "axios";
import { LinkItemInt, ThemeDataInt, User } from "../ts/interfaces";
import { db } from "./connectDB";
import UserLink from "./model/Links";
import ThemeConfig from "./model/Theme";

const getData = async () => {
  try {
    let themesData: ThemeDataInt = { theme: "default", layout: "default" };

    let { data } = await axios<User>(
      `https://api.github.com/users/${process.env.USER_NAME}`
    );
    let user: User = {
      name: data.name,
      image: data.avatar_url as string, // TODO
      isAdmin: true,
      email: data.email,
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
    let social = linksData.filter(
      (item: LinkItemInt) => item.type === "social"
    );

    links = JSON.parse(JSON.stringify(links));
    social = JSON.parse(JSON.stringify(social));

    return { links, social, themesData, user };
  } catch (error) {
    return { links: null, social: null, themesData: null, user: null };
  }
};

export default getData;