import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './layout/Layout';
import "bootstrap-icons/font/bootstrap-icons.css";
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


function App() {
  return (
    <>
      <Router>
        <Routes>
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
    </>
  )
}

export default App
