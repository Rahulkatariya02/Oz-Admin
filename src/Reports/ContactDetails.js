import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContactDetails = () => {
    const location = useLocation();
    const data = location.state?.data || {};
    console.log('location', location);
    return (
        <>
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="title pb-20">
                        <h2 className="h3 mb-0"> Book Appointment Details</h2>

                    </div>
                    <div className="card-box mb-30">
                        <div className="pd-20 ">
                            <form>
                                <div className="row mb-4">
                                    <div className="col-md-2 ">
                                        <label htmlFor="validationCustom01" className="form-label">
                                            Name
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            id="validationCustom01"
                                            className="form-control"
                                            value={data.name}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-2 ">
                                        <label htmlFor="validationCustom01" className="form-label">
                                            Email
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            id="validationCustom01"
                                            className="form-control"
                                            value={data.email}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-2 ">
                                        <label htmlFor="validationCustom01" className="form-label">
                                            Mobile No
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            id="validationCustom01"
                                            className="form-control"
                                            value={data.mobile_no}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-2 ">
                                        <label htmlFor="validationCustom01" className="form-label">
                                          Postal code
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            id="validationCustom01"
                                            className="form-control"
                                            value={data.postalCode}
                                        />
                                    </div>
                                </div>
                                                       
                                <div className="row mb-4">
                                    <div className="col-md-2">
                                        <label
                                            htmlFor="exampleFormControlInput1"
                                            className="form-label">
                                            Address
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <textarea
                                            type="text"
                                            rows="4"
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            value={data.address}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-2">
                                        <label
                                            htmlFor="exampleFormControlInput1"
                                            className="form-label">
                                            Message
                                        </label>
                                    </div>
                                    <div className="col-sm-8">
                                        <textarea
                                            type="text"
                                            rows="4"
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            value={data.message}
                                        />
                                    </div>
                                </div>

                                <div className="inquirylist">
                                    <div>
                                        <Link to="/appointmentlist">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal">
                                                Go to list
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactDetails