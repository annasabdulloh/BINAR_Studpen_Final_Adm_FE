import React from 'react';
import "antd/dist/antd.min.css";
import { Button } from "antd";
import PropTypes from 'prop-types'
import "./Popup.css";

const handleDelete = (url, callbackErr, callbackLoading) => {
  callbackLoading(true)
  fetch(url,{
    method: "DELETE",
    headers: {
      "x-access-token": localStorage.getItem('x-access-token')
    }
  }).then((res) => {
    if(res.status == 200) window.location.reload()
    else {
      res.json().then(json => {
        callbackErr(json)
        callbackLoading(false)
      })
    }
  }).catch(err => {
    console.log(err);
    callbackLoading(false)
    callbackErr(err)
  })
}

const Popup = ({ onClose, url, callbackSetErr, callbackLoading }) => {

  const deleteData = () => {
    handleDelete(url, callbackSetErr, callbackLoading)
    onClose()
  }

  return (
    <div className="row bg-white p-5" style={{
      borderRadius: "8px",
      textAlign: "center"
    }}>
      <div className="col-12">
        Apa anda yakin ingin menghapus data ini?
      </div>
      <div className="col-12 mt-3">
        <Button
          className="ms-2 me-2"
          type="primary"
          size="middle"
          shape="default"
          onClick={onClose}
        >
          Batal
        </Button>
        <Button
          className='ms-2 me-2'
          type="primary"
          size="middle"
          shape="default"
          danger
          onClick={deleteData}
        >{`Hapus `}</Button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  onClose: PropTypes.node.isRequired,
  url: PropTypes.node.isRequired,
  callbackSetErr: PropTypes.node.isRequired,
  callbackLoading: PropTypes.node.isRequired
}

export default Popup;
