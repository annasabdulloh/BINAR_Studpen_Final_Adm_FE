import React from "react";
import PropTypes from 'prop-types';
import "./DetailUser.css";

const DetailUser = ({ onClose, data }) => {
  console.log(onClose);
  return (
    <div className="bg-white" style={{
      padding: "25px",
      borderRadius: "8px",
      fontSize: "11pt"
    }}>
      {console.log(data, "Ini mmasuk detail")}
      {data === null || data === undefined ? (
        <form>
          <div className="mb-3 text-center">
            <h5>Data Tidak Ada</h5>
          </div>
        </form>
      ) : (
        <form>
          <div className="mb-3 text-center">
            <img width={"60px"} height={"60px"} className="rounded-circle" src={`${process.env.REACT_APP_API_SERVER_URL}${data.photo}`}></img>
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" value={data.email}  readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input  className="form-control" aria-describedby="emailHelp" value={data.username}  readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">Nama Depan</label>
            <input className="form-control" aria-describedby="emailHelp" value={data.f_name}  readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">Nama Belakang</label>
            <input className="form-control" aria-describedby="emailHelp" value={data.l_name}  readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">G_ID</label>
            <input  className="form-control" aria-describedby="emailHelp" value={data.g_id} readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">Visa ID</label>
            <input  className="form-control" aria-describedby="emailHelp" value={data.visa_ID} readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">ID User</label>
            <input  className="form-control" aria-describedby="emailHelp" value={data.id} readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input  className="form-control" aria-describedby="emailHelp" value={data.active ? "Aktif" : "Belum diverifikasi"} readOnly={true}/>

          </div>
          <div className="mb-3">
            <label className="form-label">Tanggal Daftar</label>
            <input  className="form-control" aria-describedby="emailHelp" value={new Date(data.createdAt).toLocaleString()} readOnly={true}/>

          </div>
        </form>
      )}

    </div>
  );
};

DetailUser.propTypes = {
  onClose: PropTypes.node.isRequired,
  data: PropTypes.node.isRequired
}

export default DetailUser;
