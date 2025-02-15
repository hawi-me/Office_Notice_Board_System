import "./widget.scss";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import NotificationsActiveOutlined from "@mui/icons-material/NotificationsActiveOutlined";
import SpeakerNotesOutlined from "@mui/icons-material/SpeakerNotesOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import FeedbackOutlined from "@mui/icons-material/FeedbackOutlined";

const Widget = ({ type }) => {
  let data;

  // Example Data (Replace with real data)
  const count = 120; 
  const diff = 15;

  switch (type) {
    case "employees":
      data = {
        title: "EMPLOYEES",
        description: "Total employees using the board",
        link: "View all employees",
        icon: (
          <PeopleAltOutlined
            className="icon"
            style={{ color: "blue", backgroundColor: "rgba(0, 0, 255, 0.2)" }}
          />
        ),
      };
      break;
    case "notices":
      data = {
        title: "NOTICES",
        description: "Total notices posted",
        link: "Manage notices",
        icon: (
          <SpeakerNotesOutlined
            className="icon"
            style={{ backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod" }}
          />
        ),
      };
      break;
    case "announcements":
      data = {
        title: "ANNOUNCEMENTS",
        description: "Important announcements shared",
        link: "View recent announcements",
        icon: (
          <NotificationsActiveOutlined
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "feedback":
      data = {
        title: "FEEDBACK",
        description: "Total feedback received",
        link: "Review feedback",
        icon: (
          <FeedbackOutlined
            className="icon"
            style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", color: "purple" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{count}</span>
        <span className="description">{data.description}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
