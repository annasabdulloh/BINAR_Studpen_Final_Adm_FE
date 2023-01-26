import React from 'react'
import { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import PortalPopup from "../components/PortalPopup";
import Popup from "../components/Popup";
import DetailUser from "../components/DetailUser";
import axios from "axios";
import Loading from './Loading';
// import "./AdminDaftarUser1.css";
const UserContent = () => {
  const [isDetailUserPopupOpen, setDetailUser1PopupOpen] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(null);
  const [msg, setMsg] = useState(null)

  const openDetailUserPopup = (data) => {
    setDetailUser1PopupOpen(data);
  };

  const closeDetailUserPopup = () => {
    setDetailUser1PopupOpen(null)
  }

  const openPopup = (data) => {
    let args = {
      setMsg
    }
    let url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/${data.id}/delete-user`
    args.url = url
    setPopupOpen(args)
  }

  const closePopup = () => {
    setPopupOpen(null);
  }

  const url = `${process.env.REACT_APP_API_SERVER_URL}`;
  const [loading, setLoading] = useState(false);
  const [user, setUsers] = useState(null)
  const [counter, setCounter] = useState(0)

  const fetchData = async () => {
    const result = await axios.get(`${url}/api/v1/users`, {
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    });
    return result.data
  };

  useEffect(() => {
    if (counter == 0) {
      setLoading(true)
      fetchData().then((res) => {
        setUsers(res.users)
        setCounter(counter + 1)
        setLoading(false);
      }).catch(() => {
        setUsers([])
        setCounter(counter + 1)
        setLoading(false);
      })
    }
  }, [user]);

  return (
    <div className='w-100'>
      <div className="">
        <div className="title-frame5">
          <div className="daftar-user9">Daftar User</div>
          <div className="description5">Daftar User Teregistrasi</div>

          <div className='row w-100'>
            {msg ? (
              <div className="alert alert-danger" role="alert">
                {msg}
              </div>

            ) : ('')}
            {loading === false ? (
              user === null ? (<div className="text-center"><h5 className='text-center'> Belum Ada User Terdaftar </h5></div>) : (
                user.map((data, index) => (

                  <div key={index} className="col-12 shadow p-4 rounded-5" style={{ fontSize: "12pt" }}>

                    <div className="row">
                      <div className="col-md-10">
                        <div className='row'>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>Nama Depan</div>
                                <div className="testi13" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.f_name}</div>
                              </div>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>Username</div>
                                <div className="div29" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.username}</div>
                              </div>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>G_ID</div>
                                <div className="xxxxxxxxxxxxx2" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.g_id}</div>
                              </div>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>ID User</div>
                                <div className="xxxxxxxxxxx4" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.id}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className='col-12'>
                            <div className='row'>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>Nama Belakang</div>
                                <div className="testi14" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.l_name}</div>
                              </div>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>E-Mail</div>
                                <div className="indonesia4" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.email}</div>
                              </div>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>Visa ID</div>
                                <div className="testgmailcom6" style={{ overflowWrap: "anywhere", width: "100%" }}>{data.visa_ID}</div>
                              </div>
                              <div className="col-md-3">
                                <div className="fw-bold mb-1" style={{ color: "black" }}>Photo</div>
                                <div className="xxxxxxxxxxx5">
                                  <img width={"60px"} height={"60px"} className="rounded-circle" src={`${process.env.REACT_APP_API_SERVER_URL}${data.photo}`}></img>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className='row'>
                          <div className='col-12'>
                            <Button
                              className="btn btn-primary mt-3 w-100"
                              type="primary"
                              icon={<ExclamationCircleOutlined />}
                              size="middle"
                              shape="default"
                              onClick={() => {
                                openDetailUserPopup(data)
                              }}
                            >
                              Detail
                            </Button>
                          </div>
                          <div className='col-12'>
                            <Button
                              className="btn btn-danger mt-3 w-100"
                              type="primary"
                              icon={<DeleteOutlined />}
                              size="middle"
                              shape="default"
                              danger
                              onClick={() => {
                                openPopup(data)
                              }}
                            >
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              )
            ) : (
              <div className='col-12 text-center'>
                <Loading className="col-12"></Loading>
              </div>
            )}
          </div>


        </div>
      </div>


      {isDetailUserPopupOpen !== null ? (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDetailUserPopup}
          zIndex={100}
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <DetailUser onClose={closeDetailUserPopup} data={isDetailUserPopupOpen} />
        </PortalPopup>
      ) : ('')}

      {isPopupOpen !== null ? (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopup}
          zIndex={100}
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          <Popup onClose={closePopup} url={isPopupOpen.url} callbackSetErr={isPopupOpen.setMsg} callbackLoading={setLoading} />
        </PortalPopup>
      ) : ('')}

    </div>
  )

};

export default UserContent;
