import { createElement, Component } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { BoardList } from '../BoardList/boardlist';

const testBoards = [
    {
        name: 'test',
        id: 1,
        images: ['https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg'],
    },
    {
        name: 'testbbbb',
        id: 2,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'taaaaaaest',
        id: 3,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'test1234',
        id: 4,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'Boartest',
        id: 5,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'Boartest',
        id: 6,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'Boartest',
        id: 7,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'Boartest',
        id: 8,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
    {
        name: 'Boartest',
        id: 9,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },

    {
        name: 'Boartest',
        id: 10,
        images: [
            'https://i.pinimg.com/736x/03/af/05/03af0502f6bcf205a6235d77acb0a4d6.jpg',
            'https://i.pinimg.com/736x/86/f9/d3/86f9d34a8f6ae41717dfa98e4a8e7eaa.jpg',
        ],
    },
];

type ProfileTabState = {
    currentTab: 'pins' | 'boards';
};
type ProfileTabProps = {};
const tabs = {
    pins: <Feed key="feed" />,
    boards: <BoardList boards={testBoards} />,
};

export class ProfileTab extends Component<ProfileTabProps, ProfileTabState> {
    constructor() {
        super();
        this.state = { currentTab: 'pins' };
    }
    switchTab = (newTab: 'pins' | 'boards') => {
        if (newTab !== this.state.currentTab) {
            this.setState((s: ProfileTabState) => {
                return { ...s, currentTab: newTab };
            });
        }
    };

    render() {
        return (
            <div className="profile__tab-container">
                <div className="profile__tab-menu">
                    <div className="profile__tab-buttons">
                        <button
                            key="pins-btn"
                            className={
                                this.state.currentTab === 'pins' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('pins');
                            }}
                        >
                            pins
                        </button>
                        <button
                            key="boards-btn"
                            className={
                                this.state.currentTab === 'boards' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('boards');
                            }}
                        >
                            boards
                        </button>
                    </div>
                    {this.state.currentTab === 'pins' ? (
                        <button key="pin-creation-btn" className="profile__creation-btn">
                            <span className="material-symbols-outlined profile__creation-btn-icon md-32">add</span>
                        </button>
                    ) : (
                        <button key="board-creation-btn" className="profile__creation-btn">
                            <span className="material-symbols-outlined profile__creation-btn-icon md-32">add</span>
                        </button>
                    )}
                </div>
                <div className="profile__tab-content">{tabs[this.state.currentTab]}</div>
            </div>
        );
    }
}
