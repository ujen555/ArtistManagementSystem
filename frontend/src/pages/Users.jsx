import React from 'react'
import AppTable from '../components/AppTable';
import { FaUserCircle } from 'react-icons/fa';
import { useGetUser } from '../hooks/useGetUsers';
import { useState } from 'react';
import Loader from '../components/Loader';
import { formatDate, GenderEnum, RoleEnum } from '../helpers/helpers';
function Users() {
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const {isLoading,isError,error,data:users,isPreviousData}=useGetUser(page,limit);
  
  
  const pagesArray=users && Array(Math.ceil(users?.total_data / limit) ).fill().map((_, index)=>index+1)
  
const columns = [
  {
    header: 'Full Name',
    accessor: 'id',
    render: (row) => (
      <div className="users__fullName">
        <FaUserCircle className="cIcon" />
        <div className="users__fullName__info">
          <div className="users__fullName__info__name">{row.first_name} {row.last_name}</div>
          <div className="users__fullName__info__phone">{row.phone}</div>
        </div>
      </div>
    )
  },
  { header: 'Email', accessor: 'email' },
  { header: 'Date Of Birth', accessor: 'dob',   
     render: (row) => (
      formatDate(row.dob)
  ) },
  { header: 'Gender', accessor: 'gender',render: (row) => GenderEnum[row.gender] || 'Unknown' },
  { header: 'Role', accessor: 'role', render: (row) => RoleEnum[row.role] || 'Unknown' }
];


return (
  <div className="componentPanel">
    <div className="componentPanel__header">
      <h2 className="componentPanel__header__title">
        Users
      </h2>
    </div>
    <div className="componentPanel__body">
      {isLoading ? <Loader customStyles={{
        height:'100%',
        margin:'50px'
      }}></Loader>:isError?<p>Error: {error.message}</p>:<AppTable columns={columns} data={users.results} pagesArray={pagesArray} setPage={setPage} isPreviousData={isPreviousData} page={page} totalPages={Math.ceil(users?.total_data / limit) }></AppTable>}
    </div>
  </div>
)
}

export default Users;
