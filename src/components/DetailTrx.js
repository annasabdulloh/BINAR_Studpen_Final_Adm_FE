import React from "react";
import PropTypes from 'prop-types';

const DetailTrx = ({ data }) => {

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
                    <div className="mb-3">
                        <label className="form-label">Order ID</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" value={data.order_id} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipe Perjalanan</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.count == 2 ? "Pulang Pergi" : "Single Trip"} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status : &nbsp;</label> 
                        <button className={`btn text-uppercase ${data.status == "finished" ? 'btn-success' : (data.status == 'expired' ? 'btn-danger' : 'btn-warning')}`}>{data.status}</button>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tanggal Pembelian</label>
                        <input className="form-control" aria-describedby="emailHelp" value={new Date(data.createdAt).toLocaleString()} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Harga</label>
                        <input className="form-control" aria-describedby="emailHelp" value={new Date(data.price).toLocaleString()} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">User ID</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.user.id} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email User</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.user.email} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" aria-describedby="emailHelp" value={data.user.username} readOnly={true} />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tiket Yang Dibeli :</label>
                        {data.carts.map((cart, index) => {
                            return (
                                <div key={index} className="card mb-3 shadow">
                                    <div className="card-header bg-primary text-white">
                                        Ticket ID : {cart.ticket.id}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{cart.ticket.name}</h5>
                                        <p className="card-text">{cart.ticket.flight_number}</p>
                                        <p className="card-text">{new Date(cart.ticket.date_air).toLocaleString()}</p>
                                        <p className="card-text">{cart.ticket.from} - {cart.ticket.dest}</p>
                                        <p className="card-text">No Kursi : {cart.chair_number}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </form>
            )}
        </div>
    )
}

DetailTrx.propTypes = {
    data: PropTypes.node.isRequired
}

export default DetailTrx