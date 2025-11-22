import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login"
import Registration from "./pages/Registration";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/registration" element={ <Registration/> }></Route>
      </Routes>
    </Router>
  )
}

export default App
