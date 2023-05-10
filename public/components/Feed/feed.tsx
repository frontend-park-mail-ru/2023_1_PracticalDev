import { Component, createElement } from '@t1d333/pickpinlib';
import { Pin } from '../Pin/pin';
import { IPin } from '../../models';
import Ajax from '../../util/ajax';
import { store } from '../../store/store';

import './feed.css';

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
            <div className="pin_container">
                {...(this.props.pins || []).map((pin) => {
                    return <Pin pin={pin} />;
                })}
            </div>
        );
    }
}
