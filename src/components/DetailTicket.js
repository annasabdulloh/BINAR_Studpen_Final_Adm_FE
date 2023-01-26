import React from "react";
import PropTypes from 'prop-types';

const DetailTicket = ({ data }) => {

    return (
        <div className="bg-white rounded-3 p-4">
            {data === null || data === undefined ? (
                <form>
                    <div className="mb-3 text-center">
                        <h5>Data Tidak Ada</h5>
                    </div>
                </form>
            ) : (
                <form>
                    <div className="mb-3 text-center">
                        <img width={"200px"} src={`${process.env.REACT_APP_API_SERVER_URL}${data.logo}`}></img>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Maskapai</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" value={data.name} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kota / Bandara Asal</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.from} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kota / bandara Tujuan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.dest} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Wkatu Keberangkatan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={new Date(data.date_air).toLocaleString()} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Waktu Kedatangan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={new Date(data.estimated_up_dest).toLocaleString()} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">No Penerbangan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.flight_number} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Ticket</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.id} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kelas</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.ticketClass.name} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Jumlah Kursi</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.no_chair} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kursi Terjual</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.no_chair - data.available.length} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Penummpang</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.passenger.passenger} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tanggal Pembuatan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={new Date(data.createdAt).toLocaleString()} readOnly={true} />

                    </div>
                </form>
            )}
        </div>
    )
}

DetailTicket.propTypes = {
    data: PropTypes.node.isRequired
}

export default DetailTicket