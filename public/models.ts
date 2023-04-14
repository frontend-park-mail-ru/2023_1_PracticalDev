interface IPin {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    media_source: string;
    author_id: number;
    liked: boolean;
    n_likes: number;
}

interface IBoard {
    id: number;
    name: string;
    description: string;
    pins: IPin[];
}

interface IUser {
    id: number;
    email: string;
    username: string;
    name: string;
    surname: string;
    profile_image: string;
}

type IBoardWithPins = IBoard & { pins: IPin[] };

export { IPin, IUser, IBoard, IBoardWithPins };
