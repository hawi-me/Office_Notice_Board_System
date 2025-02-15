import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs, noticeInputs } from "./formSource";
import "./style/dark.scss";
import Home from "./pages/Home";
import List from "./pages/AdminDashboard/List/List";
import SingleUser from "./pages/AdminDashboard/Single/SingleUser";
import SingleNotice from "./pages/AdminDashboard/Single/SingleNotice";
import NewUser from "./pages/AdminDashboard/New/NewUser";
import New from "./pages/AdminDashboard/New/NewNotice";
import HomeAdmin from "./pages/AdminDashboard/Home/HomeAdmin";
import Signin from "./pages/Signin";
import NoticeList from "./components/Table/Table";
import ListNotice from "./pages/AdminDashboard/List/ListNotice";
import Chart from "./components/Chart/Chart";

function App() {
  // const { darkMode } = useContext(DarkModeContext);

  return (
    // <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path="chart" element={<Chart/>} />

            <Route path="login" element={<Signin/>} />
            <Route path="dashboard" element={<HomeAdmin/>}/>
            
            {/* User Routes */}
            <Route path="users">
              <Route index element={<List/>} />
              <Route path=":userId" element={<SingleUser />} /> 
              <Route path="new" element={<NewUser inputs={userInputs} title="Add New User" />} />
            </Route>

            {/* Notice Routes */}
            <Route path="notices">
              <Route index element={<ListNotice />} />
              <Route path=":noticeId" element={<SingleNotice/>} />  
              <Route path="new" element={<New inputs={noticeInputs} title="Add New Notice" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
