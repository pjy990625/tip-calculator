import Location from './Location';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index';

function Auth() {
    const dispatch = useDispatch();

    const loginHandler = (event) => {
        event.preventDefault();

        dispatch(authActions.login());
    }

    return (
        <main>
            <section>
                <form onSubmit={loginHandler}>
                    <Location />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' />
                    <button className='button'>Login</button>
                </form>
            </section>
        </main>
    );
}

export default Auth;