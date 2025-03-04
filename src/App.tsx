import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './layout/Layout';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import {
  Dashboard,
  NotFound,
  Transaction,
  Subscriptions,
  Settings,
  Support,
  Notification,
  Social, Rank,
  Predication,
  UserManagement,
  UserProfile,
} from './RouteComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './pages/login/LoginForm';
import { AuthProvider } from './context/AuthContext';

const clientProvider = new QueryClient();


function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={clientProvider}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/" element={<Layout />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='users' element={<UserManagement />} />
                <Route path='users/:username/profile' element={<UserProfile />} />
                <Route path='transactions' element={<Transaction />} />
                <Route path='predications' element={<Predication />} />
                <Route path='/rank/managment' element={<Rank />} />
                <Route path='socials' element={<Social />} />
                <Route path='subscriptions' element={<Subscriptions />} />
                <Route path='notfications' element={<Notification />} />
                <Route path='settings' element={<Settings />} />
                <Route path='support' element={<Support />} />
              </Route>
            </Routes>
          </Router>
          <ToastContainer />
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}

export default App
