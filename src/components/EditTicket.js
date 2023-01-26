import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import Loading from "../pages/Loading";

const url = `${process.env.REACT_APP_API_SERVER_URL}`;

const ajaxUpdate = (id, data, callbackLoading, callbackErr) => {
    callbackLoading(true)
    const formData = new FormData()

    formData.append('airline', data.name);
    formData.append('from_city', data.fromCity);
    formData.append('destination', data.destCity);
    formData.append('price', data.price);
    formData.append('no_chair', data.noChair);
    formData.append('date_air', data.dateAir);
    formData.append('type_ticket', data.type);
    formData.append('estimated_up_dest', data.dateLand);
    formData.append('kelas', data.classTicket);
    formData.append('flightNumber', data.flightNumber);

    if (data.img !== undefined) {
        formData.append('image', data.img);
    }

    fetch(`${url}/api/v1/ticket/${id}/update`, {
        method: "PUT",
        headers: {
            "x-access-token": localStorage.getItem("x-access-token")
        },
        body: formData
    }).then((res) => {
        if (res.status == 200) window.location.reload()
        else {
            res.json().then(json => {
                console.log(json);
                callbackLoading(false)
                callbackErr(json.errors)
            })
        }
    }).catch((err) => {
        console.log(err);
        callbackLoading(false)
        callbackErr(err)
    })
}

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

const EditTicket = ({ data }) => {

    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState(null)

    const id = useRef(null)
    const name = useRef(null)
    const fromCity = useRef(null)
    const destCity = useRef(null)
    const dateAir = useRef(null)
    const dateLand = useRef(null)
    const flightNumber = useRef(null)
    const noChair = useRef(null)
    const price = useRef(null)


    const handleUpdate = (evt) => {
        evt.preventDefault()
        const classTicket = document.getElementById('select-class').value
        const type = document.getElementById("select-type").value
        let img = document.getElementById("in-file").files[0]
        let fNumber = flightNumber.current.value.split(' ')
        fNumber = fNumber[fNumber.length - 1]
        console.log(img, type, classTicket, name.current.value,
            fromCity.current.value,
            destCity.current.value,
            dateAir.current.value,
            dateLand.current.value,
            flightNumber.current.value,
            noChair.current.value, id.current.value, fNumber);
        
        ajaxUpdate(id.current.value, {
            name: name.current.value,
            fromCity: fromCity.current.value,
            destCity: destCity.current.value,
            dateAir: dateAir.current.value,
            dateLand: dateLand.current.value,
            flightNumber: fNumber,
            noChair: noChair.current.value,
            price: price.current.value,
            classTicket: classTicket,
            type: type,
            img: img
        }, setLoading, setMsg)
    }

    return (
        <div className="bg-white rounded-3 p-4">
            {msg ? (<div className='w-100 text-center mt-3'>
                <div className='alert alert-danger' role={"aledf"}>{msg}</div>
            </div>) : ('')}
            {loading ? (<Loading></Loading>) : (data === null || data === undefined ? (
                <form>
                    <div className="mb-3 text-center">
                        <h5>Data Tidak Ada</h5>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleUpdate}>
                    <div className="mb-3 text-center">
                        <img width={"200px"} src={`${process.env.REACT_APP_API_SERVER_URL}${data.logo}`}></img>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Logo</label>
                        <input type="file" className="form-control" id="in-file" />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Maskapai</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" defaultValue={data.name} ref={name} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kota / Bandara Asal</label>
                        <input className="form-control" aria-describedby="emailHelp" defaultValue={data.from} ref={fromCity} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kota / bandara Tujuan</label>
                        <input className="form-control" aria-describedby="emailHelp" defaultValue={data.dest} ref={destCity} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Waktu Keberangkatan</label>
                        <input type={"datetime-local"} className="form-control" aria-describedby="emailHelp" defaultValue={new Date(data.date_air).addHours(7).toISOString().slice(0, 16)} ref={dateAir} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Waktu Kedatangan</label>
                        <input type={"datetime-local"} className="form-control" aria-describedby="emailHelp" defaultValue={new Date(data.estimated_up_dest).addHours(7).toISOString().slice(0, 16)} ref={dateLand} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Harga</label>
                        <input className="form-control" type={"number"} aria-describedby="emailHelp" defaultValue={data.price} ref={price} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">No Penerbangan</label>
                        <input className="form-control" aria-describedby="emailHelp" defaultValue={data.flight_number} ref={flightNumber} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Ticket</label>
                        <input className="form-control" aria-describedby="emailHelp" defaultValue={data.id} ref={id} readOnly={true} disabled={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kelas</label>
                        <select className="form-select" id="select-class" defaultValue={data.kelas}>
                            <option value={1}>ECONOMY</option>
                            <option value={2}>BUSSINESS</option>
                        </select>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Jumlah Kursi</label>
                        <input className="form-control" aria-describedby="emailHelp" defaultValue={data.no_chair} ref={noChair} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kursi Terjual</label>
                        <input className="form-control" aria-describedby="emailHelp" defaultValue={data.no_chair - data.available.length} readOnly={true} disabled={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Penumpang</label>
                        <select className="form-select" id="select-type" defaultValue={data.type}>
                            <option value={2}>ANAK-ANAK</option>
                            <option value={1}>DEWASA</option>

                        </select>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tanggal Pembuatan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={new Date(data.createdAt).toLocaleString()} readOnly={true} disabled={true} />

                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary ms-2 me-2">Simpan Perubahan</button>
                        <p>*Klik luar form untuk membatalkan edit*</p>
                    </div>
                </form>
            ))}
        </div>
    )
}

EditTicket.propTypes = {
    data: PropTypes.node.isRequired
}

export default EditTicket