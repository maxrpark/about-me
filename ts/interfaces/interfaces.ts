export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  image: string;
}
export interface LinkItemInt {
  type?: string;
  _id: string;
  name: string;
  url: string;
}

export interface ProfileDataInt {
  links: LinkItemInt[];
  social: LinkItemInt[];
}

export interface ThemeItem {
  _id: string;
  name: string;
}

export interface ThemeDataInt {
  theme: string;
  layout: string;
  themeColor: ThemeItem[];
  themesLayouts: ThemeItem[];
}
