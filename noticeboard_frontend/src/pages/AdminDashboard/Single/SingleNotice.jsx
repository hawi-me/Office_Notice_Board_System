import "./single.scss";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import Chart from "../../../components/Chart/Chart";
import NoticeList from "../../../components/Table/Table";

const SingleNotice = () => {
  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar></Navbar>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Notice Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Meeting Notice</h1>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    This meeting will cover important updates.
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date:</span>
                  <span className="itemValue">2025-02-14</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Time:</span>
                  <span className="itemValue">10:00 AM</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Location:</span>
                  <span className="itemValue">Conference Room A</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Important Notes:</span>
                  <span className="itemValue">
                    Please be on time and bring your reports.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Notice Attendance ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Recent Notices</h1>
          <NoticeList></NoticeList>
        </div>
      </div>
    </div>
  );
};

export default SingleNotice;
