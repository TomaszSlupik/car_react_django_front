import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Main />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App;
