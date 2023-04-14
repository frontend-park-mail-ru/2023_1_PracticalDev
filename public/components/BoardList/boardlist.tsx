import { Component, createElement, VNode } from '@t1d333/pickpinlib';
import { IBoardWithPins } from '../../models';

type BoardListItemProps = { board: IBoardWithPins };
type BoardListItemState = {};

export class BoardListItem extends Component<BoardListItemProps, BoardListItemState> {
    private classNames = ['boardlist-item__first-image', 'boardlist-item__second-image', 'boardlist-item__third-image'];
    private getImages = () => {
        const result: VNode[] = [];
        let i = 0;
        for (; i < this.props.board.pins.length && i < 3; ++i) {
            result.push(
                <div className={this.classNames[i] + '-wrapper'}>
                    <img className={this.classNames[i]} src={this.props.board.pins[i].media_source} />
                </div>,
            );
        }
        while (result.length < 3) {
            result.push(<div className={this.classNames[i] + '-wrapper'}></div>);
            ++i;
        }

        return result;
    };
    render() {
        return (
            <div key={'boarditem-' + this.props.board.id}>
                <div className="boardlist-item">{...this.getImages()}</div>
                <div className="boardlist-item__name">{this.props.board.name}</div>
            </div>
        );
    }
}

type BoardListProps = {
    boards: IBoardWithPins[];
};
type BoardListState = {};

export class BoardList extends Component<BoardListProps, BoardListState> {
    render() {
        console.log(this.props.boards);
        return (
            <div className="boardlist">
                <a href={'/board/1'}>Ну и *****</a>
                {...this.props.boards.map((board) => {
                    return <BoardListItem key={board.id} board={board} />;
                })}
            </div>
        );
    }
}
