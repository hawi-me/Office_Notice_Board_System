import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import "./list.scss"
import NoticeDataTable from '../../../components/Datatable/NoticeDataTable'
function ListNotice() {
  return (
    <div className='list'>
    <Sidebar></Sidebar>

    <div className='listContainer'>
    <Navbar></Navbar>

         {/*notice datatabel */}
         <NoticeDataTable></NoticeDataTable>

    
    </div>

       

  
</div>
  )
}

export default ListNotice
