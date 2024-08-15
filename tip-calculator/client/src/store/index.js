import { createSlice, configureStore } from '@reduxjs/toolkit';

// create location slice
const initialLocationState = { selectedLocation: 'Port Coquitlam' };

const locationSlice = createSlice({
    name: 'location',
    initialState: initialLocationState,
    reducers: {
        updateLocation(state, action) {
            state.selectedLocation = action.payload;
        }
    }
});

// create auth slice
const initialAuthState = { isAuthenticated: false };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});


// create the store
const store = configureStore({
    reducer: {
        location: locationSlice.reducer,
        auth: authSlice.reducer
    }
});

// export actions
export const locationActions = locationSlice.actions;
export const authActions = authSlice.actions;

// export the store
export default store;