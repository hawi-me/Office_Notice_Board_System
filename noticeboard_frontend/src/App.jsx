import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs, noticeInputs } from "./formSource";
import "./style/dark.scss";
// import Home from "./pages/Home";
// import List from "./pages/AdminDashboard/List/List";
// import SingleUser from "./pages/AdminDashboard/Single/SingleUser";
// import SingleNotice from "./pages/AdminDashboard/Single/SingleNotice";
// import NewUser from "./pages/AdminDashboard/New/NewUser";
// import New from "./pages/AdminDashboard/New/NewNotice";
// import HomeAdmin from "./pages/AdminDashboard/Home/HomeAdmin";
// import Signin from "./pages/Signin";
// import NoticeList from "./components/Table/Table";
// import ListNotice from "./pages/AdminDashboard/List/ListNotice";
// import Chart from "./components/Chart/Chart";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import NoticesList from "./pages/NoticesLists";
import NoticeDetail from "./pages/NoticesDetail";
import CreateNoticeForm from "./pages/CreateNoticeForm";
import OfficeDisplay from "./pages/TvNoticeDisplay";
import Dashboard from "./pages/Dboard";

function App() {
  // const { darkMode } = useContext(DarkModeContext);

  return (
    // <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
          <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notices" element={<NoticesList />} />
        <Route path="/notices/:id" element={<NoticeDetail />} />
        <Route path="/create-notice" element={<CreateNoticeForm />} />
        <Route path="/office-display" element={<OfficeDisplay />} />
      </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
{/* <Route path="/">
            {/* <Route index element={<Home/>} /> */}
            // <Route path="chart" element={<Chart/>} />

            // {/* <Route path="login" element={<Signin/>} /> */}
            // <Route path="dashboard" element={<HomeAdmin/>}/>
            
            // {/* User Routes */}
            // <Route path="users">
            //   <Route index element={<List/>} />
            //   <Route path=":userId" element={<SingleUser />} /> 
            //   <Route path="new" element={<NewUser inputs={userInputs} title="Add New User" />} />
            // </Route>

            {/* Notice Routes */}
          //   <Route path="notices">
          //     <Route index element={<ListNotice />} />
          //     <Route path=":noticeId" element={<SingleNotice/>} />  
          //     <Route path="new" element={<New inputs={noticeInputs} title="Add New Notice" />} />
          //   </Route>
          //   <Route path="login" element={<Login />} />
          //   <Route path="register" element={<Register />} />
          //   <Route path="home" element={<Home />} />
        

          // </Route> */}

// import { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import Login from "./Service/Login";
// import Register from "./Service/Register";
// import Dashboard from "./Service/Dashboard";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   return (
//     <Router>
//       <nav>
//         <Link to="/">Login</Link> | <Link to="/register">Register</Link> | <Link to="/dashboard">Dashboard</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Login setToken={setToken} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
