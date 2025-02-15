import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const NoticeList = () => {
  const notices = [
    { id: 101, title: "Meeting Schedule Update", department: "HR", date: "14 Feb 2025", publisher: "Admin", status: "Published" },
    { id: 102, title: "Maintenance Notice", department: "Facilities", date: "13 Feb 2025", publisher: "Facility Manager", status: "Pending" },
    { id: 103, title: "Holiday Announcement", department: "Administration", date: "10 Feb 2025", publisher: "Admin", status: "Published" },
    { id: 104, title: "IT System Downtime", department: "IT", date: "9 Feb 2025", publisher: "IT Manager", status: "Draft" },
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 700 }} aria-label="notice table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Notice ID</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">Department</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Publisher</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice) => (
            <TableRow key={notice.id}>
              <TableCell className="tableCell">{notice.id}</TableCell>
              <TableCell className="tableCell">{notice.title}</TableCell>
              <TableCell className="tableCell">{notice.department}</TableCell>
              <TableCell className="tableCell">{notice.date}</TableCell>
              <TableCell className="tableCell">{notice.publisher}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${notice.status.toLowerCase()}`}>{notice.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NoticeList;
