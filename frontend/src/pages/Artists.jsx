import React from 'react'
import AppTable from '../components/AppTable';
import { FaEdit, FaFileExport, FaFileImport, FaMusic, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Loader from '../components/Loader';
import { formatDate, GenderEnum } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import { useGetArtists } from '../hooks/useGetArtists';
import Modal from '../components/Modal';
import { useDeletArtist } from '../hooks/useDeleteArtist';
import ModalDeleteContent from '../components/ModalDeleteContent';
import ImportFileModalContent from '../components/ImportFileModalContent';
import { FaDownload } from 'react-icons/fa6';
import { useExportArtists } from '../hooks/useExportArtist';
import { RoleGuard } from '../components/RoleGuard';

function Artists() {
  const [page,setPage]=useState(1);
  const [limit]=useState(8);
  const [selectedUser,setSelectedUser]=useState(null);
  const [modalType, setModalType] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isLoading,isError,error,data:users,isPreviousData}=useGetArtists(page,limit);
 
  const navigate=useNavigate();
  const pagesArray=users && Array(Math.ceil(users?.total_data / limit) ).fill().map((_, index)=>index+1);
  const openModal = (type,row=null) => {
    setSelectedUser(row);
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const {mutate,isFetching:isDeleting}=useDeletArtist(()=>closeModal());

  const confirmDelete = () => {
    mutate(selectedUser?.id);
  };

  const {isFetching:isExporting,mutate:exportArtistsMutate}=useExportArtists();
const columns = [
  {
    header: 'Artist Name',
    accessor: 'id',
    render: (row) => (
      <div className="users__fullName">
        <FaUserCircle className="cIcon" />
        <div className="users__fullName__info">
          <div className="users__fullName__info__name">{row.name}</div>
        </div>
      </div>
    )
  },
  { header: 'Date Of Birth', accessor: 'dob',   
     render: (row) => (
      formatDate(row.dob)
  ) },
  { header: 'Gender', accessor: 'gender',render: (row) => GenderEnum[row.gender] || 'Unknown' },
  { header: 'Address', accessor: 'address'},
  { header: 'First Release Year', accessor: 'first_release_year'},
  { header: 'No of albums released', accessor: 'no_of_albums_released'},
  { header: 'Actions', render: (row) => {
      return (
        <div className="action__btns">
          <RoleGuard  roles={['artist_manager']}>
          <button className="cBtn cBtn--blue" onClick={()=>{
              navigate(`/artists/edit/${row.id}`);
          }}>
            <span><FaEdit></FaEdit>Edit</span>
          </button>
          <button className="cBtn cBtn--red" onClick={()=>openModal('delete',row)}>
            <span><FaTrash/>Delete</span>
          </button>
         
          </RoleGuard>
          <RoleGuard roles={['super_admin','artist_manager']}>
          <button className="cBtn cBtn--blue" onClick={()=>navigate(`/artists/${row.id}/songs`)} disabled={isExporting}>
            <span><FaMusic/>Songs</span>
          </button>
          </RoleGuard>
          
        </div>
      )
    } 
  }
];



return (
  <div className="componentPanel">
    <div className="componentPanel__header">
      <h2 className="componentPanel__header__title">
        Artists
      </h2>
      <div className="componentPanel__header__btns">
        <RoleGuard roles={['artist_manager']}>
          <button className="cBtn cBtn--green" onClick={()=>navigate('add')}>
            <span>Add Artist</span>
          </button>
          <button className="cBtn cBtn--green" onClick={()=>openModal('import')}>
            <span><FaFileImport></FaFileImport> Import Artists</span>
          </button>
          <button className="cBtn cBtn--green" onClick={()=>exportArtistsMutate()} disabled={isExporting}>
            <span><FaDownload/> {isExporting?"Exporting...":"Export Artists"}</span>
          </button>
        </RoleGuard>
      </div>
    </div>
    <div className="componentPanel__body">
      {isLoading ? <Loader customStyles={{
        height:'100%',
        margin:'50px'
      }}></Loader>:isError?<p>Error: {error.message}</p>:<AppTable columns={columns} data={users.results} pagesArray={pagesArray} setPage={setPage} isPreviousData={isPreviousData} page={page} totalPages={Math.ceil(users?.total_data / limit) }></AppTable>}
    </div>
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {modalType === 'delete' && (
        <ModalDeleteContent
          item={selectedUser}
          onConfirm={confirmDelete}
          onCancel={closeModal}
          isDeleting={isDeleting}
          deleteLabel="Artist"
        />
      )}
       {modalType === 'import' && (
       <ImportFileModalContent onSuccessCallback={closeModal}/>
      )}
    </Modal>
  </div>
)
}

export default Artists;
