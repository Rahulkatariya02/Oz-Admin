import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Layout/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});
  // let accessToken = localStorage.getItem("accessToken");

  const new_password = watch("new_password");

  const onSubmit = async (data) => {
    setIsSaving(true); // Set the loading state to true

    try {
      let dataobject = {
        password: data.oldpassword,
        new_password: data.newpassword,
      };
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}api/admin/changepassword`,
          dataobject,
          {
            headers: {
                      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data.status === 1) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
      //   await dispatch(changePassword(dataobject));

      setIsSaving(false); // Set the loading state back to false after dispatch
    } catch (error) {
      setIsSaving(false); // Set the loading state to false in case of an error
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20 col-md-12">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Change Password </h2>
          </div>
          <div className="row">
            <div className="col-md-8 col-sm-12 mb-30">
              <div className="pd-20 card-box ">
                <div className="pd-20  ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row ">
                      <div className="col-md-3 mb-4  ">
                        <label className="form-label">
                          Old Password <span className="text-danger">*</span>{" "}
                        </label>
                      </div>
                      <div className="col-md-8 mb-4 ">
                        <input
                          type="text"
                          name="oldpassword"
                          className={`form-control ${
                            errors.oldpassword ? "is-invalid" : ""
                          }`}
                          {...register("oldpassword", {
                            required: true,
                          })}
                        />
                        {errors.oldpassword && (
                          <small className="text-danger">
                            Please enter a old password
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-3 mb-4  ">
                        <label className="form-label">
                          New Password <span className="text-danger">*</span>{" "}
                        </label>
                      </div>
                      <div className="col-md-8  mb-4 ">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.newpassword ? "is-invalid" : ""
                          }`}
                          name="newpassword"
                          {...register("newpassword", {
                            required: true,
                          })}
                        />
                        {errors.newpassword && (
                          <small className="text-danger">
                            Please enter a new password
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-3 mb-4  ">
                        <label className="form-label">
                          Retype password
                          <span className="text-danger">*</span>{" "}
                        </label>
                      </div>
                      <div className="col-md-8  mb-4 ">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.retypepassword ? "is-invalid" : ""
                          }`}
                          name="retypepassword"
                          {...register("retypepassword", {
                            required: true,
                          })}
                        />
                        {errors.retypepassword && (
                          <small className="text-danger">
                            Please enter a retype new password
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-3 mb-4  ">
                        <label className="form-label"></label>
                      </div>
                      <div className="col-md-8 mb-4 ">
                        <Button
                          className="btn btn-outline-dark btn-light my-2 mx-2"
                          type="submit"
                        >
                          Back
                        </Button>
                        <Button
                          className="btn btn-primary my-2 mx-2"
                          type="submit"
                          disabled={isSaving} // Disable the button while saving
                        >
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
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

export default ChangePassword;
