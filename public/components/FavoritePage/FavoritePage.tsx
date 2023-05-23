import { Component, createElement } from '@t1d333/pickpinlib';
import { Main } from '../Main/main';
import { IPin } from '../../models';
import Feed from '../Feed/feed';
import { Pin } from '../../models/pin';
import { store } from '../../store/store';
import { Loader } from '../Loader/Loader';
import './FavoritePage.css';
type FavoritePageProps = {};
type FavoritePageState = {
    pins: IPin[];
    isLoading: boolean;
};
export class FavoritePage extends Component<FavoritePageProps, FavoritePageState> {
    protected state = {
        pins: [],
        isLoading: true,
    };

    componentDidMount(): void {
        Pin.getLikedPins(store.getState().user?.id!).then((pins) => {
            this.setState(() => {
                return {
                    pins: pins,
                    isLoading: false,
                };
            });
        });
    }

    render() {
        return (
            <Main>
                <h1 className="favorite__header">Favorite pins</h1>
                {this.state.isLoading ? <Loader /> : <Feed pins={this.state.pins} />}
            </Main>
        );
    }
}
