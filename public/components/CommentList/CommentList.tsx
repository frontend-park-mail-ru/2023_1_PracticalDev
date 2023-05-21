import { Component, createElement } from '@t1d333/pickpinlib';
import { IPin } from '../../models';
import { Comment as CommentModel, IComment } from '../../models/comment';
import { store } from '../../store/store';
import './CommentList.css';
import { Comment } from '../Comment/Comment';
type CommentListProps = { pin: IPin; onLoadListCallback: Function };
type CommentListState = { comments: IComment[] };

export class CommentList extends Component<CommentListProps, CommentListState> {
    constructor() {
        super();
        this.state = {
            comments: [],
        };
    }

    componentDidMount(): void {
        CommentModel.getComments(this.props.pin.id).then(async (res) => {
            this.props.onLoadListCallback();
            this.setState((state) => {
                return {
                    comments: res,
                };
            });
        });
    }

    render() {
        return (
            <div className="comments">
                <div className="comments__list">
                    {...this.state.comments.map((comment) => {
                        return <Comment comment={comment} />;
                    })}
                </div>
                <div className="comments__comment-builder">
                    <img
                        className="comments__comment-builder-avatar"
                        src={store.getState().user?.profile_image ?? ''}
                    />
                    <form
                        className="comments__comment-form"
                        onsubmit={(event: any) => {
                            const text = event.target.comment.value;
                            if (!text) return;
                            CommentModel.addComment(this.props.pin.id, text).then((comment) => {
                                event.target.comment.value = '';
                                this.setState((state) => {
                                    return {
                                        ...state,
                                        comments: [...state.comments, comment!],
                                    };
                                });
                            });
                        }}
                    >
                        <input className="comments__comment-input" placeholder="Add a comment" name="comment" />
                    </form>
                </div>
            </div>
        );
    }
}
