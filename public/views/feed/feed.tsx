import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import { IPin } from '../../models';
import Pin from '../../components/pin/pin';
import Ajax from '../../util/ajax';
import Menu from '../menu/menu';
import Header from '../header/header';

interface FeedProps {}
interface FeedState {
    Pins: IPin[];
}

class Feed extends Component<FeedProps, FeedState> {
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
            <div>
                <div className="" id="menu">
                    <Menu />
                </div>
                <div className="" id="header_wrapper">
                    <Header />
                </div>
                <div className="" id="app" style="left: 100px; width: calc(100% - 100px); top: 80px;">
                    <div className="main__content">
                        <button id="cors-btn">Проверить CORS</button>
                        <div className="pin_container">
                            {...this.state.Pins.map((pin) => {
                                return <Pin key={pin.id} pin={pin} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;
