import { Component, createElement } from '@t1d333/pickpinlib';
import './Comment.css';
import { IComment } from '../../models';
import { formatDate } from '../../util/formatDate';

type CommentProps = {
    comment: IComment;
};

type CommentState = {
    intervalId: any;
};
export class Comment extends Component<CommentProps, CommentState> {
    state = {
        intervalId: 0,
    };

    componentDidMount(): void {
        const id = setInterval(() => {
            this.setState(() => {
                return this.state;
            });
        }, 15000);
        this.setState(() => {
            return { intervalId: id };
        });
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <div className="comment">
                <div className="comment__author">
                    <img className="comment__author-img" src={this.props.comment.author.profile_image} />
                </div>
                <div className="comment__text-container">
                    <div className="comment__header">
                        <span className="comment__author-name">{this.props.comment.author.username}</span>
                        <span className="comment__date">{formatDate(this.props.comment.created_at)}</span>
                    </div>

                    <div className="comment__text">{this.props.comment.text}</div>
                </div>
            </div>
        );
    }
}
