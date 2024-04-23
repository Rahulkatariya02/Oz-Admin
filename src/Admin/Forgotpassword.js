import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const url = process.env.REACT_APP_API_BASE_URL;
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm({});
  const user = watch("username");

  const onSubmit = async (data) => {
    setLoading1(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/admin/forgotpassword`,
        data
      );
      if (response.data.status === 1) {
        setData(response.data);
        toast.success(response.data.message);
        reset();
        navigate("/login");
      } else {
        toast.error(data.error);
        setLoading1(false);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center"></div>
      <div className="main-container forget-pass">
        <div className="xs-pd-10 pd-ltr-20 col-md-12">
          <div className="row d-lg-flex d-block h-100">
            <div className="col-md-8 col-sm-12 mb-30">
              <div className="pd-20 card-box height-100-p">
                <div className="pd-20 ">
                  <div className="login-title">
                    <div className="text-center text-primary">
                      <img src="/logo(2).png" alt="" />
                      <br />
                      <h4 className="my-3">Forgot Password</h4>{" "}
                    </div>
                    <h6 className="mb-20 text-center">
                      Enter your email address to reset your password
                    </h6>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group custom">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Username"
                        required
                        {...register("username")}
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
                          <button
                            type="submit"
                            disabled={!user}
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Send
                          </button>
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
      </div>
    </>
  );
};

export default ForgotPassword;
