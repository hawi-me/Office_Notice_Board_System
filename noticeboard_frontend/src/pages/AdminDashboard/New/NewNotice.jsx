import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [noticeData, setNoticeData] = useState({
    title: "",
    department: "",
    publisher: "",
    status: "Published",  // Default status
    date: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submit logic here (e.g., send data to the server or local storage)
    console.log("Notice Created:", noticeData);
  };

  return (
    <div className="new">
      <Sidebar></Sidebar>
      <div className="newContainer">
        <Navbar></Navbar>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* Update input fields for Notice Data */}
              <div className="formInput">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter notice title"
                  value={noticeData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department name"
                  value={noticeData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  placeholder="Enter publisher's name"
                  value={noticeData.publisher}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Status</label>
                <select
                  name="status"
                  value={noticeData.status}
                  onChange={handleChange}
                >
                  <option value="Published">Published</option>
                  <option value="Pending">Pending</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="formInput">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={noticeData.date}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Post Notice</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
