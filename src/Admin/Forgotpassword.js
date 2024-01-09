import React from 'react'
import { Link } from 'react-router-dom'

const Forgotpassword = () => {
    return (
        <>
            <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
                <div className="container">
                    <div className="row align-items-center d-lg-flex align-items-center justify-content-center d-block h-100">

                        <div className="col-md-6 mt-5 ">
                            <div className="login-box bg-white box-shadow border-radius-10">
                                <div className="login-title">
                                    <h2 className="text-center text-primary">Forgot Password</h2>
                                </div>
                                <h6 className="mb-20">
                                    Enter your email address to reset your password
                                </h6>
                                <form>
                                    <div className="input-group custom">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                        />
                                        <div className="input-group-append custom">
                                            <span className="input-group-text">
                                                <i className="fa fa-envelope-o" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-5">
                                            <div className="input-group mb-0">
                                                <Link
                                                    className="btn btn-primary btn-lg btn-block"
                                                    to="/"
                                                >
                                                    Submit
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div
                                                className="font-16 weight-600 text-center"
                                                data-color="#707373"
                                            >
                                                OR
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="input-group mb-0">
                                                <Link
                                                    className="btn btn-outline-primary btn-lg btn-block"
                                                    to="/login"
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Forgotpassword
