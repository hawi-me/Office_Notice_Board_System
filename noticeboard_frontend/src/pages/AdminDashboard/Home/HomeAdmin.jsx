import React from 'react'
import "./home.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import Widget from '../../../components/Widget/Widget'
import Featured from '../../../components/Featured/Featured'
import Chart from '../../../components/Chart/Chart'
import NoticeList from '../../../components/Table/Table'
export default function HomeAdmin() {
  return (
    <div className="home">
        <Sidebar></Sidebar>
<div className='homeContainer'>
<Navbar></Navbar>

<div className="widgets">
  <Widget type="employees" />
  <Widget type="notices" />
  <Widget type="announcements" />
  <Widget type="feedback" />
</div>


<div className='charts'>

  <Featured/>
  <Chart title="Office Notices (Last 6 Months)" aspect={2 / 1} />

</div>
<div className='listContainer'>
  <div className='listTitle'>Latest Notice</div>
  <NoticeList></NoticeList>

</div>



  </div>

 

      
  </div>
  )
}
