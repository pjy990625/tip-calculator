import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

// Create a client
const queryClient = new QueryClient()

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={!isAuth ? <Landing /> : <Dashboard />}
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;