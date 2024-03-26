import './App.css';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Home from './components/screens/Home';
import Dashboard from './components/screens/Dashboard';
import DashNav from './components/includes/DashNav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Home/>} />
        <Route path='/dashboard/:name' element={<DashNav/>}>
          <Route index element={<Dashboard/>} />
        </Route>
      </Routes>
    </Router>    
  );
}

export default App;
