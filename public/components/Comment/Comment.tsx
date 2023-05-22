import { Component, createElement } from '@t1d333/pickpinlib';
import { IComment } from '../../models/comment';
import './Comment.css';
import { IUser } from '../../models';
import User from '../../models/user';
import { formatDate } from '../../util/formatDate';

type CommentProps = {
    comment: IComment;
};

type CommentState = {
    author: IUser | undefined;
    isLoading: boolean;
    intervalId: any;
};
export class Comment extends Component<CommentProps, CommentState> {
    constructor() {
        super();
        this.state = {
            author: undefined,
            isLoading: true,
            intervalId: 0,
        };
    }

    componentDidMount(): void {
        const id = setInterval(() => {
            this.setState(() => {
                return this.state;
            });
        }, 15000);

        User.getUser(this.props.comment.author_id).then((res) => {
            this.setState((state: CommentState) => {
                return {
                    author: res,
                    isLoading: false,
                    intervalId: id,
                };
            });
        });
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <div className="comment">
                <div className="comment__author">
                    <img
                        className="comment__author-img"
                        src={!this.state.isLoading ? this.state.author!.profile_image : ''}
                    />
                </div>
                <div className="comment__text-container">
                    <div className="comment__header">
                        <span className="comment__author-name">
                            {this.state.author ? this.state.author.username : ''}
                        </span>
                        <span className="comment__date">{formatDate(this.props.comment.created_at)}</span>
                    </div>

                    <div className="comment__text">{this.props.comment.text}</div>
                </div>
            </div>
        );
    }
}
