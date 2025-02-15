import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import Datatable from '../../../components/Datatable/Datatable'
import "./list.scss"
function List() {
  return (
    <div className='list'>
        <Sidebar></Sidebar>

        <div className='listContainer'>
        <Navbar></Navbar>

             {/* datatabel */}
             <Datatable></Datatable>
        
        </div>

           

      
    </div>
  )
}

export default List
