import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import SignIn from "./components/admin/SignIn";
import SignUp from "./components/admin/SignUp";
import UserSignIn from "./components/user/UserSignIn";
import UserSignUp from "./components/user/UserSignUp";
import Home from "./components/admin/Home";
import ErrorPage from "./components/ErrorPage";
import UserHome from "./components/user/UserHome";
import UserInfo from "./components/admin/UserInfo";
import NavBar from "./components/NavBar";
import VideoPlayer from "./components/VideoPlayer";
import Protected from "./components/Protected";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const authenticate = localStorage.getItem('id')
  const user = localStorage.getItem('user')
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/admin' element={authenticate ? <ErrorPage/> : <SignIn />} />
          <Route path='/admin/signup' element={authenticate ? <ErrorPage/> : <SignUp />} />
          <Route path="/" element= {authenticate ? <ErrorPage/> : <UserSignIn />} />
          <Route path="/signup" element= {authenticate ? <ErrorPage/> :<UserSignUp />} />
          <Route path="/dashboard" element={user === '"user"' ? <ErrorPage /> : <Protected Component={Home} />} />
          <Route path="/home" element={user === '"admin"' ? <ErrorPage /> :  <Protected Component={UserHome} />} />
          <Route path="/userinfo/:params" element={user === '"user"' ? <ErrorPage /> : <Protected Component={UserInfo} />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/videoplayer/:params" element={user === '"admin"' ? <ErrorPage /> : <Protected Component={VideoPlayer} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
