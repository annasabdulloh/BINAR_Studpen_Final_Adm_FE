// import { useState, useCallback } from "react";
import React, { useEffect, useState } from 'react'
import "./AdminTiketTerjual.css";
import axios from "axios";
import Loading from './Loading';
import PortalPopup from "../components/PortalPopup";
import Popup from "../components/Popup";
import DetailTicket from "../components/DetailTicket";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const url = `${process.env.REACT_APP_API_SERVER_URL}`;

const getTicketsSealed = (tickets) => {
  let results = []
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].no_chair > tickets[i].available.length) {
      results.push(tickets[i])
    }
  }
  return results
}

const generatePdf = (idTarget) => {
  console.log(document.querySelector(idTarget));
  html2canvas(document.querySelector(idTarget),
    { scale: 1 }
  ).then(canvas => {
    console.log(canvas);
    const pdf = new jsPDF('l', 'px', [256, 256]);
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 256, 256);
    pdf.save('checkin-myairfare.pdf');
  });
}

const fetchData = async (callbackDatas, callbackLoading, callbackErr) => {
  callbackLoading(true)
  const result = await axios.get(`${url}/api/v1/tickets`, {
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    }
  });

  if (result.status == 200) {
    let ticketts = getTicketsSealed(result.data.tickets)
    callbackDatas(ticketts)
    callbackLoading(false)
  } else {
    callbackErr(result.data.errors)
    callbackLoading(false)
  }
};

const AdminTiketTerjual = () => {

  const [datas, setDatas] = useState(null)
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)

  // ===================================== kontrol pop up =========================================================

  const [isDetailTicketOpen, setDetailOpen] = useState(null)
  const [isPopupDel, setDelOpen] = useState(null)

  const openDetailTicketPopup = (data) => {
    setDetailOpen(data);
  };

  const closeDetailTicketPopup = () => {
    setDetailOpen(null)
  }

  const openPopupDel = (data) => {
    let args = {
      setMsg
    }
    let url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/ticket/${data.id}/delete`
    args.url = url
    setDelOpen(args)
  }

  const closePopupDel = () => {
    setDelOpen(null);
  }

  // ==============================================================================================================

  useEffect(() => {
    if (counter === 0) {
      fetchData(setDatas, setLoading, setMsg)
      setCounter(counter + 1)
    }
  })

  return (
    <div className='row w-100'>
      <div className="col-12">
        <div className="frame-div287">
          <div className="frame-div288">
            <div className="tiket-terjual6">Tiket Terjual</div>
          </div>
          <div className="frame-div289">
            <div className="description4">Daftar Tiket Terjual</div>
          </div>
        </div>
      </div>
      {console.log(msg)}
      {/* <div className='d-flex text-end mt-3'>
        <input id='search' className="form-control ms-auto w-25" placeholder='Cari Nomor Penerbangan' />
      </div> */}
      {msg ? (<div className='w-100 text-center mt-3'>
        <div className='alert alert-danger' role={"aledf"}>{msg.errors}</div>
      </div>) : ('')}
      {loading ? (
        <Loading></Loading>
      ) : (
        datas === null ? (
          <div className='text-center w-100'>
            <h5>Data Tidak ditemukan</h5>
          </div>
        ) : (

          <div className='col-12 mt-4'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Maskapai</th>
                  <th scope="col">Dari</th>
                  <th scope="col">Tujuan</th>
                  <th scope='col'>Nomor Penerbangan</th>
                  <th scope='col'>Kelas</th>
                  <th scope='col'>Harga</th>
                  <th scope='col'>Kursi Terjual</th>
                  <th scope='col'> QR ticket</th>
                  <th scope='col'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {console.log(datas)}

                {datas.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <b>{data.name}</b> <br />
                        <img width={"100px"} src={`${url}${data.logo}`} />
                      </td>
                      <td>{data.from}</td>
                      <td>{data.dest}</td>
                      <td>{data.flight_number}</td>
                      <td>{data.ticketClass.name}</td>
                      <td>{data.price}</td>
                      <td>{data.no_chair - data.available.length} Kursi dari {data.no_chair} Kursi</td>
                      <td>
                          <div className="text-center d-flex">
                            <div className='row'>
                              <div id={`doc-print-${index}`} className='col-12' style={{ height: "auto", margin: "0 auto", padding: "20px", width: "100%", display: "block" }}>
                                  <QRCode
                                  size={1000}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  value={data.flight_number}
                                  viewBox={`0 0 1000 1000`}
                                  />
                              </div>
                              <div className='col-12'>
                                <button className='btn btn-success ' onClick={() => generatePdf(`#doc-print-${index}`)}> Download QR</button>
                              </div>
                            </div>
                          </div>
                      </td>
                      <td>
                        <btn className="btn btn-primary w-100 mt-2 mb-2 ms-2 me-2" onClick={() => { openDetailTicketPopup(data) }}>Detail</btn>
                        <br />
                        <btn className="btn btn-danger w-100 mt-2 mb-2 ms-2 me-2" onClick={() => { openPopupDel(data) }}>Hapus</btn>
                      </td>
                    </tr>
                  )
                })}

              </tbody>

            </table>
          </div>
        )
      )}

      {isDetailTicketOpen !== null ? (
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
          <DetailTicket data={isDetailTicketOpen}></DetailTicket>
        </PortalPopup>
      ) : ('')}

      {isPopupDel !== null ? (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupDel}
          zIndex={100}
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <Popup onClose={closePopupDel} url={isPopupDel.url} callbackSetErr={isPopupDel.setMsg} callbackLoading={setLoading} />
        </PortalPopup>
      ) : ('')}

    </div>
  );
};

export default AdminTiketTerjual;
