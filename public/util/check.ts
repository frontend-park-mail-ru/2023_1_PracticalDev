import { navigate } from '../actions/navigation';
import { store } from '../store/store';
import Ajax from './ajax';

const CheckAuth = () => {
    Ajax.get('/api/auth/me').then((response) => {
        if (!response.ok) {
            if (response.status === 401) {
                navigate('/login');
            }
            return;
        }

        store.dispatch({
            type: 'authCheck',
            payload: {
                user: response.body,
            },
        });
    });
};

export default CheckAuth;
