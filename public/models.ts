interface IPin {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    media_source: string;
    author_id: number;
}

interface IBoard {
    id: number;
    name: string;
    description: string;
}

interface IUser {
    id: number;
    email: string;
    username: string;
    name: string;
    surname: string;
    profile_image: string;
}

export { IPin, IUser, IBoard };
