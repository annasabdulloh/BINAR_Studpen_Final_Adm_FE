import React from 'react';
import { useEffect, useState } from 'react';
import './AdminDataTransfer.css';
import Loading from './Loading';
import PortalPopup from "../components/PortalPopup";
import DetailTrx from '../components/DetailTrx';

const DataTransfer = () => {
  const [users, Transactions] = useState(null);
  const [loading, setLoading] = useState(false)

  // ======================================== Kontrol Pop Up ==================================================

  const [isDetailTrxOpen, setDetailOpen] = useState(null)

  const openDetailTicketPopup = (data) => {
    setDetailOpen(data);
  };

  const closeDetailTicketPopup = () => {
    setDetailOpen(null)
  }

  // ==========================================================================================================

  const AdminDataTransfer = () => {
    setLoading(true)
    try {
      const url = `${process.env.REACT_APP_API_SERVER_URL}`;
      fetch(`${url}/api/v1/admin-transactions`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('x-access-token'),
        },
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          if(response.status == 200){
            Transactions(data);
            setLoading(false)
          }else{
            setLoading(false)
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        });
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    AdminDataTransfer();
  }, []);
  return (
    <>
      <div className='w-100'>
        <div className="">
          <div className="frame-div160 ps-0">
            <div className="description2">Daftar Pembayaran User</div>
          </div>
          <div className="text-dark">
            {/*  */}
            {/* {users !== null ? console.log(users.transaction) : console.log('Data User masih kosong')} */}
            <div className='row w-100'>
              {loading ? (<Loading></Loading>) : (
                users === null ? (<div className='text-center w-100'><h4 className='mt-4'>Data Masih Kosong</h4></div>) : (
                  users.transaction.map((dataforecast, index) => (
                    <div key={index} className="col-12 mt-4 mb-3">
  
                      <div className="card rounded-4 shadow">
                        <div className="card-header bg-primary text-white">
                          <div className="row p-3">
                            <div className="col-md-4 fs-4 fw-bold mb-3">Username <div className="col fs-5 text-uppercase fw-light">{dataforecast.user.username}</div> </div>
                            <div className="col-md-4 fs-4 fw-bold mb-3">Nama User <div className="col fs-5 fw-light">{dataforecast.user.f_name + ' ' + dataforecast.user.l_name}</div> </div>
                            <div className="col-md-4 fs-4 fw-bold mb-3">Email <div className="col fs-5 fw-light">{dataforecast.user.email}</div> </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row mt-2 ps-3 pe-3">
                            <div className="col fw-bold text-primary">Order ID</div>
                            <div className="col ">{dataforecast.order_id}</div>
                            <div className="col"></div>
                          </div>
                          <div className="row mt-2 ps-3 pe-3">
                            <div className="col fw-bold text-primary">Harga Tiket </div>
                            <div className="col ">{dataforecast.price}</div>
                            <div className="col"></div>
                          </div>
                          <div className="row mt-2 ps-3 pe-3">
                            <div className="col fw-bold text-primary">Status </div>
                            <div className="col"><button className={`btn text-uppercase ${dataforecast.status == "finished" ? 'btn-success' : (dataforecast.status == 'expired' ? 'btn-danger' : 'btn-warning')}`}>{dataforecast.status}</button></div>
                            <div className="col"></div>
                          </div>
                          <div className="row mt-2 ps-3 pe-3 pb-3">
                            <div className='col-12 d-flex'>
                              <button onClick={() => openDetailTicketPopup(dataforecast)} className='btn btn-warning ms-auto'>Lihat Detail</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>)
                  ))
              )}
            </div>
          </div>
        </div>
      </div>

      {isDetailTrxOpen !== null ? (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDetailTicketPopup}
          zIndex={100}
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <DetailTrx data={isDetailTrxOpen}></DetailTrx>
        </PortalPopup>
      ) : ('')}
    </>
  );
};

export default DataTransfer;
