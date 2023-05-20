import { Component, createElement } from '@t1d333/pickpinlib';
import { Input } from '../Input/input';
import './Searchbar.css';
import { store } from '../../store/store';
import { navigate } from '../../actions/navigation';
export class Searchbar extends Component<{}, {}> {
    private query: string;

    constructor() {
        super();
        const [_, params] = location.href.split('?');
        this.query = params ? params.split('=')[1] : '';
    }
    render() {
        return (
            <form
                className="search-form"
                onsubmit={(e: any) => {
                    e.preventDefault();
                    const query = e.target.search.value;
                    if (query) {
                        store.dispatch({
                            type: 'search',
                            payload: {
                                query: query,
                            },
                        });

                        const curPage = location.href.split('/')[3];
                        if (curPage !== 'search') {
                            navigate(`/search/?q=${query.trim()}`);
                        } else {
                            window.history.pushState('data', 'title', `/search/?q=${query.trim()}`);
                        }
                    }
                }}
            >
                <Input
                    key="search-input"
                    type="search"
                    name="search"
                    icon="search"
                    value={
                        store.getState().page === '/search'
                            ? decodeURI(store.getState().searchQuery)
                            : decodeURI(this.query)
                    }
                />
            </form>
        );
    }
}
