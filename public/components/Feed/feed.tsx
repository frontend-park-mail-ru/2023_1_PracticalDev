import { Component, createElement } from '@t1d333/pickpinlib';
import { Pin, IPin } from '../Pin/pin';
import Ajax from '../../util/ajax';
import { store } from '../../store/store';

interface FeedProps {
    pins: IPin[];
}
interface FeedState {}

export default class Feed extends Component<FeedProps, FeedState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
    }

    componentDidMount(): void {}

    componentWillUnmount(): void {}

    render() {
        return (
            <div key="pin_container" className="pin_container">
                {...(this.props.pins || []).map((pin) => {
                    return <Pin key={pin.id} pin={pin} />;
                })}
            </div>
        );
    }
}
