// import { TextField, Button } from '@mui/material';
import './AdminTambahTiket.css';
import React, { useState, useRef } from 'react';
import Loading from './Loading';

const AdminTambahTiket = () => {
  const formData = new FormData();
  const airline = useRef(null);
  const from_city = useRef(null);
  const destination = useRef(null);
  const price = useRef(null);
  const no_chair = useRef(null);
  const date_air = useRef(null);
  const flightNumber = useRef(null);
  const type_ticket = useRef(null);
  const estimated_up_dest = useRef(null);
  const kelas = useRef(null);
  const photo = useRef(null);
  const [errMsg, setErrMsg] = useState(null);
  const [scMsg, setScMsg] = useState(null)
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      airline: airline.current.value,
      from_city: from_city.current.value,
      destination: destination.current.value,
      price: price.current.value,
      no_chair: no_chair.current.value,
      date_air: date_air.current.value,
      flightNumber: flightNumber.current.value,
      type_ticket: type_ticket.current.value,
      estimated_up_dest: estimated_up_dest.current.value,
      kelas: kelas.current.value,
      photo: photo.current.value,
    };
    console.log(data);

    formData.append('airline', airline.current.value);
    formData.append('from_city', from_city.current.value);
    formData.append('destination', destination.current.value);
    formData.append('price', price.current.value);
    formData.append('no_chair', no_chair.current.value);
    formData.append('date_air', date_air.current.value);
    formData.append('type_ticket', type_ticket.current.value);
    formData.append('estimated_up_dest', estimated_up_dest.current.value);
    formData.append('kelas', kelas.current.value);
    formData.append('flightNumber', flightNumber.current.value);
    formData.append('image', document.getElementById('photo').files[0]);

    try {
      const url = `${process.env.REACT_APP_API_SERVER_URL}`;
      fetch(`${url}/api/v1/ticket`, {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'x-access-token': localStorage.getItem('x-access-token'),
        },
      })
        .then((response) => {
          if (response.status == 200) {
            document.getElementById('form-add').reset()
            setScMsg("Data berhasil ditambahkan. Silahkan cek dihalaman ticket tersedia")
            setLoading(false)
            setTimeout(() => {
              setScMsg(null)
            }, 10000)
          } else {
            response.json().then((result) => {
              console.log(result);
              setErrMsg(result.errors);
              setLoading(false);
              setTimeout(() => {
                setErrMsg(null)
              }, 10000)
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setErrMsg("Data gagal dibuat. Server ERROR :(");
          setLoading(false);
          setTimeout(() => {
            setErrMsg(null)
          }, 10000)
        });
    } catch (error) {
      setErrMsg(error);
      setLoading(false);
      setTimeout(() => {
        setErrMsg(null)
      }, 10000)
    }
  };

  return (
    <>
      <div className='w-100'>
        <div className="">
          {/* <div className="frame-div233">
            <div className="frame-div234">
              <div className="frame-div235">
                
              </div>
            </div>
          </div> */}
          <div className="text-start text-dark">
            <div
              style={{
                fontSize: '12pt',
                borderRadius: '8px',
                border: 'opx',
              }}
            >
              <div className="">
                <div className="frame-div238 mb-3 p-2">
                  <div className="description3">Form Tambah Tiket</div>
                </div>
              </div>

              <form id='form-add' className="g-3 p-3" onSubmit={onSubmit}>
                {loading ? (<Loading></Loading>) : (
                  <div className='row'>
                    <div className='col-12'>
                      {scMsg ? (
                        <div className="alert alert-success" >
                          {scMsg}
                        </div>
                      ) : ('')}
                      {errMsg ? (
                        <div className="alert alert-danger" >
                          {errMsg}
                        </div>
                      ) : ('')}
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputNamaPengguna" className="form-label">
                        Nama Pesawat / Maskapai
                      </label>
                      <input ref={airline} type="text" className="form-control" id="inputNama" placeholder="" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputNomerpenerbangan" className="form-label">
                        Nomer Penerbangan
                      </label>
                      <input ref={flightNumber} type="number" className="form-control" id="inputNomerpenerbangan" placeholder="" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputdari" className="form-label">
                        Dari
                      </label>
                      <input ref={from_city} type="text" className="form-control" id="inputdari" placeholder="" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputdestinasi" className="form-label">
                        Destinasi
                      </label>
                      <input ref={destination} type="text" className="form-control" id="inputdestinasi" placeholder="" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputkeberangkatan" className="form-label">
                        Keberangkatan
                      </label>
                      <input ref={date_air} type="datetime-local" className="form-control" id="inputkeberangkatan" placeholder="" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputsampai" className="form-label">
                        Sampai
                      </label>
                      <input ref={estimated_up_dest} type="datetime-local" className="form-control" id="inputsampai" placeholder="" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputharga" className="form-label">
                        Harga
                      </label>
                      <input ref={price} type="text" className="form-control" id="inputharga" placeholder="" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputkursi" className="form-label">
                        Jumlah Kursi
                      </label>
                      <input ref={no_chair} type="text" className="form-control" id="inputkursi" placeholder="" />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="photo">Logo</label>
                      <input ref={photo} type="file" className="form-control" id="photo" placeholder="" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="kelas">Kelas</label>
                      <select ref={kelas} name="" id="kelas" className="form-select-sm form-select" required defaultValue="">
                        <option value="1">Ekonomi</option>
                        <option value="2">Bisnis</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="type_ticket">Kategori Penumpang</label>
                      <select ref={type_ticket} name="" id="type_ticket" className="form-select-sm form-select" required defaultValue="">
                        <option value="1">Dewasa</option>
                        <option value="2">Anak-Anak</option>
                      </select>
                    </div>
                    <div className="row col-12 d-flex justify-content-center align-content-center p-3">
                      <div className="col-md-3 my-5">
                        <input type="submit" value={'Simpan'} className="btn btn-primary col-md-12" />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTambahTiket;
