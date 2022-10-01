import TwitterFill from "./TwitterFill";
import InstagramFill from "./InstagramFill";
import GithubFill from "./GithubFill";
import HomeIcon from "./Home";
import Pencil from "./Pencil";

export enum Icon {
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
  GITHUB = "github",
}
export type IconType = Icon.TWITTER;
Icon.GITHUB;
Icon.INSTAGRAM;

export const icons = {
  [Icon.TWITTER]: TwitterFill,
  [Icon.INSTAGRAM]: InstagramFill,
  [Icon.GITHUB]: GithubFill,
};

export const AvailableIcons = [
  {
    id: 1,
    name: Icon.TWITTER,
  },
  {
    id: 2,
    name: Icon.INSTAGRAM,
  },
  {
    id: 3,
    name: Icon.GITHUB,
  },
];

export { HomeIcon, Pencil };
