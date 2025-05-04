import React from 'react'
import AppTable from '../components/AppTable';
import { FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useGetUser } from '../hooks/useGetUsers';
import { useState } from 'react';
import Loader from '../components/Loader';
import { formatDate, GenderEnum, RoleEnum } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDeleteUser } from '../hooks/useDeleteUser';

function Users() {
  const [page,setPage]=useState(1);
  const [limit]=useState(8);
  const {isLoading,isError,error,data:users,isPreviousData}=useGetUser(page,limit);
  const [selectedUser,setSelectedUser]=useState(null);
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pagesArray=users && Array(Math.ceil(users?.total_data / limit) ).fill().map((_, index)=>index+1);
  const openModal = (row) => {
    setSelectedUser(row);
    setIsModalOpen(true)
  };
  const closeModal = () => setIsModalOpen(false);
  const {mutate,isFetching:isDeleting}=useDeleteUser(()=>closeModal());
  const confirmDelete = () => {
      mutate(selectedUser?.id);
  };
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
  { header: 'Role', accessor: 'role', render: (row) => RoleEnum[row.role] || 'Unknown' },
  { header: 'Actions', render: (row) => {
      return (
        <div className="action__btns">
          <button className="cBtn cBtn--blue" onClick={()=>{
            navigate(`/users/edit/${row.id}`);
          }}>
            <span><FaEdit></FaEdit>Edit</span>
          </button>
          <button className="cBtn cBtn--red" onClick={()=>openModal(row)}>
            <span><FaTrash/>Delete</span>
          </button>
        </div>
      )
    } 
  }
];


return (
  <div className="componentPanel">
    <div className="componentPanel__header">
      <h2 className="componentPanel__header__title">
        Users
      </h2>
      <button className="cBtn cBtn--green" onClick={()=>navigate('add')}>
        <span>Add User</span>
      </button>
    </div>
    <div className="componentPanel__body">
      {isLoading ? <Loader customStyles={{
        height:'100%',
        margin:'50px'
      }}></Loader>:isError?<p>Error: {error.message}</p>:<AppTable columns={columns} data={users.results} pagesArray={pagesArray} setPage={setPage} isPreviousData={isPreviousData} page={page} totalPages={Math.ceil(users?.total_data / limit) }></AppTable>}
    </div>
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2 className="componentPanel__header__title">Confirm Delete</h2>
        <div className="modal-body">
          <p>Are you sure you wanxt to Delete User <span className="highlight-text">{selectedUser?.first_name} {selectedUser?.last_name}</span></p>
        </div>
        <div className="modal-footer">
          <button className="cBtn cBtn--green" onClick={confirmDelete} disabled={isDeleting}>
             <span>
              {isDeleting ? 'Deleting...' : 'Yes'}
             </span>
          </button>
          <button className="cBtn cBtn--red" onClick={closeModal}>
             <span>
              Cancel
             </span>
          </button>
        </div>
    </Modal>
  </div>
)
}

export default Users;
