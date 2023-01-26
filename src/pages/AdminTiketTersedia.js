// import { useState, useCallback } from "react";
import React, { useEffect, useState } from 'react'
// import "./AdminTiketTerjual.css";
import axios from "axios";
import Loading from './Loading';
import PortalPopup from "../components/PortalPopup";
import Popup from "../components/Popup";
import EditTicket from "../components/EditTicket";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const url = `${process.env.REACT_APP_API_SERVER_URL}`;

const getTicketsAvailable = (tickets) => {
  let results = []
  for (let i = 0; i < tickets.length; i++) {
    if ( tickets[i].available.length > 0 && new Date() < new Date(tickets[i].date_air)) {
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
    let ticketts = getTicketsAvailable(result.data.tickets)
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
            <div className="tiket-terjual6">Tiket Tersedia</div>
          </div>
          <div className="frame-div289">
            <div className="description4">Daftar Tiket Tersedia</div>
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
            
                {console.log(datas)}

                {datas.map((data, index) => {
                  return (
                    <div key={index} className="card mb-4 shadow">
                      <div className="card-header bg-primary">
                        <div className='row'>
                          <div className='col-md-4 mb-2 mt-2'>
                            {data.ticketClass.name}
                          </div>
                          <div className='col-md-4 mb-2 mt-2 text-center'>
                            <img width={"200px"} src={`${url}${data.logo}`} />
                          </div>
                          <div className='col-md-4 mb-2 mt-2 text-end'>
                            <a className='btn btn-success'>Tersedia {data.available.length} dari {data.no_chair} Kursi</a>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className='row'>
                          <div className='col-md-4 text-center'>
                            <div className="frame-div70">
                              <img width={"100%"}
                                 className="logo-web-icon6 mb-3"
                                 alt=""
                                 src="../logo-web10@2x.png"
                               />
                             </div>
                             <i className="boarding-pass fw-bolder mt-3 text-primary">BOARDING PASS</i>
                          </div>
                          <div className='col-md-3 mt-2'>
                            <p className='text-primary'>{data.from + " TO "}{data.dest}</p>
                            <p className='text-primary'>{data.name}</p>
                            <p className='text-primary'>{data.flight_number}</p>
                            <p className='text-primary'>{new Date(data.date_air).toLocaleString()}</p>
                          </div>
                          <div className='col-md-2 text-center d-flex'>
                            <div className='row w-100'>
                              <div className='col-12 d-flex'>
                                <h5 className='text-primary fw-bold fw-italic mt-auto mb-2 w-100'>Harga Tiket : </h5>
                              </div>
                              <div className='col-12 d-flex'>
                                <h5 className='text-danger fw-bold fw-italic mb-auto mt-2 w-100'>Rp. {data.price} </h5>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 text-center d-flex">
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
                          <div className='col-12 mt-3 text-start'>
                            <button className='btn btn-warning ms-2 me-2' onClick={()=>{openDetailTicketPopup(data)}}>Edit</button>
                            <button className='btn btn-danger ms-2 me-2' onClick={()=>{openPopupDel(data)}}>Hapus</button>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  )
                })}
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
          <EditTicket data={isDetailTicketOpen}></EditTicket>
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

// <tr key={index}>
                    //   <th scope="row">{index + 1}</th>
                    //   <td>
                    //     <b>{data.name}</b> <br />
                    //     <img width={"100px"} src={`${url}${data.logo}`} />
                    //   </td>
                    //   <td>{data.from}</td>
                    //   <td>{data.dest}</td>
                    //   <td>{data.flight_number}</td>
                    //   <td>{data.ticketClass.name}</td>
                    //   <td>{data.price}</td>
                    //   <td>{data.no_chair - data.available.length} Kursi dari {data.no_chair} Kursi</td>
                    //   <td>
                    //     <btn className="btn btn-primary w-100 mt-2 mb-2 ms-2 me-2" onClick={() => { openDetailTicketPopup(data) }}>Detail</btn>
                    //     <br />
                    //     <btn className="btn btn-danger w-100 mt-2 mb-2 ms-2 me-2" onClick={() => { openPopupDel(data) }}>Hapus</btn>
                    //   </td>
                    // </tr>

// import React from 'react'
// import { TextField } from "@mui/material";
// import "./AdminTiketTersedia.css";

// const AdminTiketTersedia = () => {
//   return (
//     <>
      
//           <div>
//             <div className="title-frame1">
//               <div className="frame-div53">
//                 <div className="frame-div54">
//                   <div className="frame-div55">
//                     <div className="frame-div56">
//                       <div className="frame-div57">
//                         <div className="tiket-tersedia2">Tiket Tersedia</div>
//                       </div>
//                       <div className="frame-div58">
//                         <div className="description1">
//                           Daftar Tiket Tersedia
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="frame-div59">
//                 <div className="frame-div60">
//                   <div className="frame-div61">
//                     <TextField
//                       className="group-textfield"
//                       sx={{ width: 335 }}
//                       color="info"
//                       variant="outlined"
//                       type="search"
//                       label="Cari sesuatu"
//                       placeholder="Cari Sesuatu"
//                       size="medium"
//                       margin="none"
//                     />
//                   </div>
//                 </div>
//                 <div className="frame-div62">
//                   <TextField
//                     className="group-textfield"
//                     sx={{ width: 354 }}
//                     color="info"
//                     variant="outlined"
//                     type="search"
//                     label="Cari sesuatu"
//                     placeholder="Cari Sesuatu"
//                     size="medium"
//                     margin="none"
//                   />
//                 </div>
                
//                 <div className="frame-div111">
//                   <div className="frame-div113" style={{
//                     borderRadius: "8px", fontSize: "12pt"
//                   }}>
//                     <div className="frame-div114" style={{
//                       borderRadius: "8px 8px 0px 0px"
//                     }}>
//                       <b className="kelas-ekonomi4">Kelas Ekonomi</b>
//                       <img
//                         className="image-57-icon"
//                         alt=""
//                         src="../image-57@2x.png"
//                       />
                      
//                     </div>
//                     <div className="daftar-user3">
//                       <div className="frame-div115">
//                         <div className="frame-div70">
//                           <div className="frame-div117">
//                             <div className="frame-div70">
//                               <img
//                                 className="logo-web-icon6"
//                                 alt=""
//                                 src="../logo-web10@2x.png"
//                               />
//                             </div>
//                             <i className="boarding-pass">BOARDING PASS</i>
//                           </div>
//                         </div>
//                         <div className="frame-div119">
//                           <div className="frame-div120">
//                             <div className="frame-div121">
//                               <div className="frame-div122">
//                                 <div className="nomor-tiket-pesawat"  style={{fontSize: "12pt"}}>
//                                   Nomor Tiket Pesawat :
//                                 </div>
//                                 <div className="nomor-penerbangan4"  style={{fontSize: "12pt"}}>
//                                   Nomor Penerbangan :
//                                 </div>
//                                 <div className="nomor-penerbangan4"  style={{fontSize: "12pt"}}>Dari :</div>
//                                 <div className="nomor-penerbangan4"  style={{fontSize: "12pt"}}>
//                                   Tujuan :
//                                 </div>
//                               </div>
//                               <div className="frame-div123">
//                                 <div className="hcbd0214"  style={{fontSize: "12pt"}}>HCBD021</div>
//                                 <div className="h240a124"  style={{fontSize: "12pt"}}>H240/A12</div>
//                                 <div className="jakarta4"  style={{fontSize: "12pt"}}>Jakarta</div>
//                                 <div className="bali4"  style={{fontSize: "12pt"}}>Bali</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="frame-div124">
//                           <div className="frame-div125">
//                             <div className="harga-tiket" style={{fontSize: "12pt"}}>Harga Tiket</div>
//                             <b className="rp-2500000" style={{fontSize: "12pt"}}>Rp. 2.500.000</b>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
                  
//                 </div>
//               </div>
//             </div>
//           </div>
     
//     </>
//   );
// };

// export default AdminTiketTersedia;
