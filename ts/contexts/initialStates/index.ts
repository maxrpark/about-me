export interface GlobalInitialState {
  name: string;
  profileData: any;
  isEditing: boolean;
  showModal: boolean;
  selectedLink: any;
  linkType: string;
  availableIcons: any;
  isDeleting: boolean;
  isDisabled: boolean;
  isFormSubmitted: boolean;
}

export interface UserThemeInitialState {
  theme: string;
  isSidebarOpen: boolean;
  updateData: boolean;
  themesColors: any;
  layout: string;
  themesLayouts: any;
}
