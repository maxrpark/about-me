export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  image: string;
}
export interface LinkItemInt {
  id: string;
  name: string;
  url: string;
}

export interface ProfileDataInt {
  links: LinkItemInt[];
  social: LinkItemInt[];
}

interface ThemeItem {
  id: string;
  name: string;
}

export interface ThemeDataInt {
  theme: string;
  layout: string;
  themeColor: ThemeItem[];
  themesLayouts: ThemeItem[];
}
