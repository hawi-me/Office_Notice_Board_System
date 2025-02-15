import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserList = () => {
  const users = [
    { id: 1, name: "John Doe", email: "johndoe@gmail.com", phone: "+1 234 567 890", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "janesmith@gmail.com", phone: "+1 345 678 901", role: "Manager", status: "Inactive" },
    { id: 3, name: "Alice Brown", email: "alicebrown@gmail.com", phone: "+1 456 789 012", role: "User", status: "Active" },
    { id: 4, name: "Bob Martin", email: "bobmartin@gmail.com", phone: "+1 567 890 123", role: "User", status: "Pending" },
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 700 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">Role</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="tableCell">{user.id}</TableCell>
              <TableCell className="tableCell">{user.name}</TableCell>
              <TableCell className="tableCell">{user.email}</TableCell>
              <TableCell className="tableCell">{user.phone}</TableCell>
              <TableCell className="tableCell">{user.role}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
