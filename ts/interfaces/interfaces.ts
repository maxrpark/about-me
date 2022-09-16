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
}
