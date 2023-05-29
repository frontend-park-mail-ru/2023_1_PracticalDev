import { Component, createElement } from '@t1d333/pickpinlib';
import { Main } from '../Main/main';
import { IPin } from '../../models';
import Feed from '../Feed/feed';
import { Pin } from '../../models/pin';
import { store } from '../../store/store';
import { Loader } from '../Loader/Loader';
import './FavoritePage.css';
import { navigate } from '../../actions/navigation';
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

                {this.state.isLoading ? (
                    <Loader />
                ) : this.state.pins.length > 0 ? (
                    <Feed pins={this.state.pins} />
                ) : (
                    <div className="profile-tab__empty">
                        <h2 className="profile-tab__empty-header">You don't have favorite pins</h2>
                        <button
                            className="profile-tab__create-btn"
                            onclick={() => {
                                navigate('/feed');
                            }}
                        >
                            Go to feed
                        </button>
                    </div>
                )}
            </Main>
        );
    }
}
