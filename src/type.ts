export interface StudentItem {
    firstName: string;
    lastName: string;
    id: string;
    profileimage: string;
    courselist: string[];
    advisor: AdvisorItem;
    comment?: any[]
    roles: string []
    images?: string[];
    username?: string;
}
export interface AdvisorItem {
    [x: string]: any;
    firstName: string;
    lastName: string;
    profileimage: string;
    id: string;
    roles: string []
    ownStudent: string [];
    username?: string;
    images?: string[];
}
export interface CommentInfo{
    id: string;
    comment: string;
}
export interface AnnouncementItem {
    id: string,
    title: string,
    description: string,
    files: string []
}

export interface RegisterUserItem {
    firstName: string,
    lastName: string, 
    id: string, 
    images: string[] ,
    courselist?: string[],
    advisorID?: string,
    password: string,
    email: string,
    username: string,
    role?: string[],
    ownStudent?: []
}


  