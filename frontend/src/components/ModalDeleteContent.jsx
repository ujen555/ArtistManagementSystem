import React from 'react'

function ModalDeleteContent({ item, onConfirm, onCancel, isDeleting ,deleteLabel="user"}) {
  return (
    <>
    <h2 className="componentPanel__header__title">Confirm Delete</h2>
    <div className="modal-body">
      <p>
        Are you sure you want to delete {deleteLabel} <span className="highlight-text">{item?.name}</span>?
      </p>
    </div>
    <div className="modal-footer">
      <button className="cBtn cBtn--green" onClick={onConfirm} disabled={isDeleting}>
        <span>{isDeleting ? 'Deleting...' : 'Yes'}</span>
      </button>
      <button className="cBtn cBtn--red" onClick={onCancel}>
        <span>Cancel</span>
      </button>
    </div>
  </>
  )
}

export default ModalDeleteContent
