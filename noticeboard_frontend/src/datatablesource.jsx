import React from 'react';

export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];
  export const noticeColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Notice Title",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithTitle">
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithDescription">
            {params.row.description}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  export const noticeRows = [
    {
      id: 1,
      title: "Office Meeting",
      description: "Quarterly goals discussion.",
      date: "2025-02-14",
      status: "active",
    },
    {
      id: 2,
      title: "Team Outing",
      description: "Team-building event at the park.",
      date: "2025-03-10",
      status: "pending",
    },
    {
      id: 3,
      title: "Policy Update",
      description: "New office policy on remote work.",
      date: "2025-04-01",
      status: "active",
    },
    {
      id: 4,
      title: "Holiday Notice",
      description: "Holiday schedule for the year.",
      date: "2025-05-25",
      status: "active",
    },
    {
      id: 5,
      title: "Office Renovation",
      description: "Renovation of office space starting next month.",
      date: "2025-06-15",
      status: "active",
    },
    {
      id: 6,
      title: "New Employee Orientation",
      description: "Mandatory session for new hires.",
      date: "2025-07-05",
      status: "pending",
    },
    {
      id: 7,
      title: "Annual Performance Review",
      description: "Review process for all employees.",
      date: "2025-08-01",
      status: "active",
    },
    {
      id: 8,
      title: "Training Session",
      description: "Training on the new software tools.",
      date: "2025-09-10",
      status: "pending",
    },
    {
      id: 9,
      title: "Office Closure",
      description: "Office will be closed for maintenance.",
      date: "2025-10-25",
      status: "active",
    },
    {
      id: 10,
      title: "Employee of the Month",
      description: "Congratulations to our top performer!",
      date: "2025-11-20",
      status: "active",
    },
  ];
  