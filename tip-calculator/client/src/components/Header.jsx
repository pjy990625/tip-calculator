import { useDispatch } from 'react-redux';
import { authActions } from '../store/index';

function Header() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return (
        <header>
            <nav>
                <button className='button' onClick={logoutHandler}>Logout</button>
            </nav>
        </header>
    );
}

export default Header;