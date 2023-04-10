interface IPin {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    media_source: string;
    author_id: number;
}

interface IUser {
    id: number;
    email: string;
    username: string;
}

export { IPin, IUser };
