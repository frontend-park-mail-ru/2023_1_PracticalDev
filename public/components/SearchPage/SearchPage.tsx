import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import { Main } from '../Main/main';
import './SearchPage.css';
import { IBoard, IPin, IUser } from '../../models';
import { Search } from '../../models/search';
import { store } from '../../store/store';
import Feed from '../Feed/feed';
import { BoardList } from '../BoardList/boardlist';
import { UsersList } from '../UsersList/UsersList';

type SearchPageState = {
    curTab: string;
    pins: IPin[];
    users: IUser[];
    boards: IBoard[];
};

export class SearchPage extends Component<{}, SearchPageState> {
    private unsub: Function[] = [];
    constructor() {
        super();
        this.state = { curTab: 'pins', pins: [], users: [], boards: [] };
    }

    private tagToComponent(tabName: string): VNode {
        switch (tabName) {
            case 'pins':
                return <Feed pins={this.state.pins} />;
            case 'boards':
                return <BoardList boards={this.state.boards} />;
            default:
                return <UsersList users={this.state.users} />;
        }
    }

    private switchTab(tabName: string) {
        if (tabName === this.state.curTab) {
            return;
        }

        this.setState((s) => {
            return { ...s, curTab: tabName };
        });
    }

    private getClassName(tabName: string) {
        const base = 'search-result__tab-btn';
        if (this.state.curTab === tabName) {
            return base + ' ' + 'active';
        }
        return base;
    }

    private onSearch = () => {
        if (store.getState().type === 'search') {
            this.loadData(store.getState().searchQuery);
        }
    };

    private loadData(query: string) {
        Search.getDataBySearchQuery(query).then((res) => {
            res.boards.then((boards) => {
                this.setState((s) => {
                    return { ...s, pins: res.pins, boards: boards, users: res.users };
                });
            });
        });
    }

    componentDidMount(): void {
        const [_, params] = location.href.split('?');
        this.unsub.push(store.subscribe(this.onSearch.bind(this)));
        this.loadData(params.split('=')[1]);
    }

    componentWillUnmount(): void {
        for (const fun of this.unsub) {
            fun();
        }
    }

    render(): VNode {
        return (
            <Main>
                <div className="search-result__container">
                    <ul className={'search-result__tabs'}>
                        <li
                            className={this.getClassName('pins')}
                            onclick={() => {
                                this.switchTab('pins');
                            }}
                        >
                            Pins
                        </li>
                        <li
                            className={this.getClassName('boards')}
                            onclick={() => {
                                this.switchTab('boards');
                            }}
                        >
                            Boards
                        </li>
                        <li
                            className={this.getClassName('users')}
                            onclick={() => {
                                this.switchTab('users');
                            }}
                        >
                            Users
                        </li>
                    </ul>
                    <div className="search-result__content">{this.tagToComponent(this.state.curTab)}</div>
                </div>
            </Main>
        );
    }
}
