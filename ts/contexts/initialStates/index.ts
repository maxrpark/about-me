export interface GlobalInitialState {
  name: string;
  profileData: any;
  isEditing: boolean;
  showModal: boolean;
  selectedLink: any;
  linkType: string;
  availableIcons: any;
}

export interface UserThemeInitialState {
  theme: string;
  isSidebarOpen: boolean;
  themesColors: any;
}
