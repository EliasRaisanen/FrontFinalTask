import './App.css';

import { AppBar, Switch } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import { BrowserRouter as Router,Routes, Route, Link, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">
       
        <Router>
     <AppBar  position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Customers
        </Typography>
      </Toolbar>
     </AppBar>
     
    
      <Routes>
        <Route path='/' element={<Customerlist/>}></Route>
      <Route path="traininglist" element={<Traininglist/>}></Route>
     </Routes>
     
     </Router>
     
    </div>
  );
}


export default App;
