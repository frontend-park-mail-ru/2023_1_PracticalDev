import { Component, createElement } from '@t1d333/pickpinlib';
import { Pin, IPin } from '../Pin/pin';
import Ajax from '../../util/ajax';
interface FeedProps {}
interface FeedState {
    Pins: IPin[];
}

export default class Feed extends Component<FeedProps, FeedState> {
    protected state: FeedState;
    constructor() {
        super();
        this.state = { Pins: [] };
    }

    componentDidMount(): void {
        Ajax.get('/api/posts').then((response) => {
            console.log(response.body as IPin[]);
            this.setState((s: FeedState) => {
                return {
                    Pins: response.body as IPin[],
                };
            });
        });
    }

    componentWillUnmount(): void {
        console.log('Bye!');
    }

    render() {
        return (
            <div key="pin_container" className="pin_container">
                {...this.state.Pins.map((pin) => {
                    return <Pin key={pin.id} pin={pin} />;
                })}
            </div>
        );
    }
}
