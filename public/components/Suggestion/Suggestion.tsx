import { Component, createElement } from '@t1d333/pickpinlib';
import './Suggestion.css';

type SuggestionProps = {
    suggestions: string[];
    query: string;
    visible: boolean;
    onActivateSuggestion: Function;
};

type SuggestionState = {};
export class Suggestion extends Component<SuggestionProps, SuggestionState> {
    render() {
        return (
            <div
                className={`suggestion ${this.props.visible && this.props.suggestions.length > 0 ? 'active' : ''}`}
                onclick={(event: any) => {
                    event.stopPropagation();
                }}
            >
                {...this.props.suggestions.map((suggestion) => {
                    return (
                        <div
                            className="suggestion__item"
                            onclick={() => {
                                this.props.onActivateSuggestion(suggestion);
                            }}
                        >
                            <span className="material-symbols-outlined suggestion__item-icon">search</span>
                            <span className="suggestion__item-text">{suggestion}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
