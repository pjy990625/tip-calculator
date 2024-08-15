import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/index';
import './Header.css'

function Header() {
    const dispatch = useDispatch();

    const selectedLocation = useSelector(state => state.location.selectedLocation);

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return (
        <header>
            <nav className='navbar'>
                <ul>
                    <li>
                        <h2>Hello, {selectedLocation}</h2>
                    </li>
                    <li>
                        <button className='logout-button' onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header >
    );
}

export default Header;