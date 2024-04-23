import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/admin/login`,
        data
      );

      const data12 = response.data;

      if (data12.status === 1) {
        toast.success(data12.message);
        localStorage.setItem("token", data12.token);
        localStorage.setItem("accessToken", data12.accessToken);
        navigate("/");
        window.location.reload(true);
      }
    } catch (error) {
      toast.error(error.response.data.error);
     
    }
  };

  return (
    <>
      <div className="main-container login ">
        <div className="xs-pd-20-10 pd-ltr-20 col-md-12">
          <div className="row d-block h-100">
            <div className="col-md-8 col-sm-12 xs-pd-20">
              <div className="pd-20 card-box height-100-p">
                <div className="login-title mb-3">
                  <div className="text-center text-primary">
                    <img src="assets/images/logo.png" alt="" />
                    <h4 className="mt-3">Login to Admin</h4>{" "}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group ">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      name="username"
                      {...register("username", {
                        required: "Please Enter a User Name",
                      })}
                      placeholder="Username"
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1" />
                      </span>
                    </div>
                  </div>
                  {errors.username && (
                    <small className="text-danger">
                      Please Enter a User Name
                    </small>
                  )}
                  <div className="input-group custom">
                    <input
                      type="password"
                      placeholder="**********"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      {...register("password", {
                        required: "Please Enter a Password",
                      })}
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="dw dw-padlock1" />
                      </span>
                    </div>
                  </div>
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                  <div className="row pb-30">
                    <div className="col-6">
                      {/* <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            {...register("isactive")}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1">
                            Remember
                          </label>
                        </div> */}
                    </div>
                    <div className="col-6">
                      <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password</Link>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        <button
                          className="btn btn-primary btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
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
  );
};

export default Login;
