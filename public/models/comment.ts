import Ajax from '../util/ajax';

export type IComment = {
    id: number;
    author_id: number;
    pin_id: number;
    text: string;
    created_at: string;
};

export class Comment {
    static async getComments(id: number) {
        return Ajax.get(`/api/pins/${id}/comments`).then((res) => {
            if (res.ok) {
                return res.body.items as IComment[];
            }
            return Promise.reject(res);
        });
    }

    static async addComment(id: number, text: string) {
        if (!text) return;
        const res = await Ajax.post(`/api/pins/${id}/comments`, { text: text });
        if (res.ok) {
            return res.body as IComment;
        }
        return Promise.reject(res);
    }
}
