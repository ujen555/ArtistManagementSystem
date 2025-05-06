import React from 'react'
import AppTable from '../components/AppTable';
import { FaEdit, FaLongArrowAltLeft, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { useGetSongsOfArtist } from '../hooks/useGetSongsOfArtist';
import { useGetArtistById } from '../hooks/useGetArtistById';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { RoleGuard } from '../components/RoleGuard';
import ModalDeleteContent from '../components/ModalDeleteContent';
import { useDeleteSong } from '../hooks/useDeleteSong';

function Songs() {
  const [page,setPage]=useState(1);
  const [limit]=useState(8);
  const { id:artistIdFromParam } = useParams();
  const {data:currentUserInfo}=useCurrentUser();
    const artistId=artistIdFromParam?artistIdFromParam:currentUserInfo?.artist_id;
    const {isLoading,isError,error,data:users,isPreviousData}=useGetSongsOfArtist(artistId,{page,limit});
    const {data:artistDetails }=useGetArtistById(artistId,{
        enabled:!!artistIdFromParam
    });
    const artistInfo = artistDetails || (artistId === currentUserInfo?.artist_id ? currentUserInfo : null);
  const [selectedRow,setSelectedRow]=useState(null);
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pagesArray=users && Array(Math.ceil(users?.total_data / limit) ).fill().map((_, index)=>index+1);
  const openModal = (row) => {
     row['name']=row.title;
     setSelectedRow(row);
    setIsModalOpen(true)
  };
  const closeModal = () => setIsModalOpen(false);
  const {mutate,isFetching:isDeleting}=useDeleteSong(currentUserInfo?.artist_id,()=>closeModal());
  const confirmDelete = () => {
      mutate(selectedRow?.id);
  };
const columns = [
    {
        header: 'Song Title',
        accessor: 'title',
    },
  {
    header: 'Album Name',
    accessor: 'album_name',
  },
  { header: 'Genre', accessor: 'genre' },
  { header: 'Actions', render: (row) => {
      return (
        <div className="action__btns">
          <RoleGuard roles={['artist']}>
            <button className="cBtn cBtn--blue" onClick={()=>{
                navigate(`/songs/edit/${row.id}`);
            }}>
              <span><FaEdit></FaEdit>Edit</span>
            </button>
            <button className="cBtn cBtn--red" onClick={()=>openModal(row)}>
              <span><FaTrash/>Delete</span>
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
        {artistInfo?.name} Songs 
        <span className="warning">({artistInfo?.email})</span>
      </h2>
      <div className="componentPanel__header__btns">
        <RoleGuard roles={['artist']}>
          <button className="cBtn cBtn--green" onClick={()=>navigate('/songs/add')}>
            <span>Add Songs</span>
          </button>
        </RoleGuard>
        <RoleGuard roles={['artist_manager','super_admin']}>
          <button className="cTable__pagination__btn cBtn cTable__pagination__btn--pageNav" onClick={()=>navigate('/artists')} >
            <span>
                <FaLongArrowAltLeft/>
                Back
            </span>
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
        <ModalDeleteContent
          item={selectedRow}
          onConfirm={confirmDelete}
          onCancel={closeModal}
          isDeleting={isDeleting}
          deleteLabel="Song"
        />
    </Modal>
  </div>
)
}

export default Songs;
