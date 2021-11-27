import "./App.css";
import Form from './components/Form';
import Search from './components/Search';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Routes>
          {/* <Route path='/' exact element={<Homepage/>}/> */}
          <Route path='/create' element={<Form/>}/>
          <Route path='/search' element={<Search/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
