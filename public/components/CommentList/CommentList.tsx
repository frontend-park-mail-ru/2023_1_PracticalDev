import { Component, createElement } from '@t1d333/pickpinlib';
import { IPin } from '../../models';
import { Comment as CommentModel, IComment } from '../../models/comment';
import { store } from '../../store/store';
import './CommentList.css';
import { Comment } from '../Comment/Comment';
import { showModal } from '../../actions/modal';
type CommentListProps = { pin: IPin; onLoadListCallback: Function };
type CommentListState = { comments: IComment[]; profile_image: string };

export class CommentList extends Component<CommentListProps, CommentListState> {
    unsubs: Function[] = [];
    state: CommentListState = {
        comments: [],
        profile_image:
            store.getState().user?.profile_image ?? 'https://pickpin.hb.bizmrg.com/default-user-icon-8-4024862977',
    };

    onLoadUser = () => {
        if (store.getState().type !== 'loadedUser') return;
        this.setState((state) => {
            return { ...state, profile_image: store.getState().user?.profile_image! };
        });
    };

    onUpdatePin = () => {
        if (store.getState().type !== 'updatePin') return;
        const id = store.getState().pinId;
        this.getComments(id);
    };

    getComments = (id: number) => {
        CommentModel.getComments(id).then((res) => {
            this.props.onLoadListCallback();
            this.setState((state) => {
                return {
                    ...state,
                    comments: res,
                };
            });
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onUpdatePin));
        this.unsubs.push(store.subscribe(this.onLoadUser));
        this.getComments(this.props.pin.id);
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
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
                    <img className="comments__comment-builder-avatar" src={this.state.profile_image} />
                    <form
                        className="comments__comment-form"
                        onsubmit={(event: any) => {
                            if (!store.getState().user) {
                                showModal('login');
                                return;
                            }
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
