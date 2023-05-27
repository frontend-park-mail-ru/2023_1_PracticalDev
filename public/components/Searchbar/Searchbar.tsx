import { Component, createElement } from '@t1d333/pickpinlib';
import { Input } from '../Input/input';
import { store } from '../../store/store';
import { navigate } from '../../actions/navigation';
import './Searchbar.css';
import { Suggestion } from '../Suggestion/Suggestion';
import { Search } from '../../models/search';
import { search } from '../../actions/search';
import { debounce } from '../../util/debounce';
import { showModal } from '../../actions/modal';

type SearchbarState = {
    query: string;
    suggestionsVisible: boolean;
    suggestions: string[];
};

export class Searchbar extends Component<{}, SearchbarState> {
    private params = location.href.split('?');
    state = {
        query: this.params[1] ? this.params[1].split('=')[1] : '',
        suggestionsVisible: false,
        suggestions: [],
    };

    getSuggestion(query: string) {
        if (!query) {
            this.setState((state) => {
                return {
                    ...state,
                    suggestionsVisible: false,
                };
            });
            return;
        }

        Search.getSuggestions(query).then((res) => {
            this.setState((state) => {
                return {
                    ...state,
                    suggestionsVisible: true,
                    suggestions: res,
                };
            });
        });
    }

    onSearch(query: string) {
        if (!query) return;
        search(query);
        const curPage = location.href.split('/')[3];
        if (curPage !== 'search') {
            navigate(`/search/?q=${query.trim()}`);
        } else {
            window.history.pushState('data', 'title', `/search/?q=${query.trim()}`);
        }
        this.setState((state) => {
            return { ...state, query: query, suggestionsVisible: false };
        });
    }

    closeSuggestions() {
        this.setState((state) => {
            return {
                ...state,
                suggestionsVisible: false,
                query: this.params[1] ? this.params[1].split('=')[1] : '',
            };
        });
    }

    componentDidMount() {
        window.addEventListener('click', (event: any) => {
            if (this.state.suggestionsVisible) {
                if (event.target.classList.contains('suggestion')) {
                    return;
                }
                this.setState((state) => {
                    return { ...state, suggestionsVisible: false };
                });
            }
        });
    }

    debouncedOnSearchCallback = debounce((event: any) => {
        this.getSuggestion(event.target.value);
    }, 300);

    render() {
        return (
            <div className="searchbar__wrapper">
                <form
                    className="searchbar__form"
                    onsubmit={(event: any) => {
                        event.preventDefault();
                        if (!store.getState().user) {
                            showModal('login');
                            return;
                        }

                        const query = event.target.search.value;
                        this.onSearch(query);
                    }}
                >
                    <Input
                        type="search"
                        name="search"
                        icon="search"
                        validator={this.debouncedOnSearchCallback}
                        value={
                            store.getState().page === '/search'
                                ? decodeURI(store.getState().searchQuery)
                                : decodeURI(this.state.query)
                        }
                    />
                </form>
                <Suggestion
                    visible={this.state.suggestionsVisible}
                    query={this.state.query}
                    suggestions={this.state.suggestions}
                    onActivateSuggestion={this.onSearch.bind(this)}
                />
            </div>
        );
    }
}
