import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactSetting = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});
  // let accessToken = localStorage.getItem("accessToken");

  const onSubmit = async (data) => {
    try {
      let dataobject = {
        company_name: data.CompanyName,
        office_contact_no: data.OfficeContactNo,
        office_address: data.OfficeAddress,
        Email: data.Email,
      };
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}api/admin/contact`,
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
        toast.error(error.response.data.originalError);
      }
      //   await dispatch(changePassword(dataobject));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  CompanyName<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="CompanyName"
                  className={`form-control ${
                    errors.CompanyName ? "is-invalid" : ""
                  }`}
                  {...register("CompanyName", {
                    required: true,
                  })}
                />
                {errors.CompanyName && (
                  <small className="text-danger">
                    Please enter a companyname
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Office Contact No<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="OfficeContactNo"
                  className={`form-control ${
                    errors.OfficeContactNo ? "is-invalid" : ""
                  }`}
                  {...register("OfficeContactNo", {
                    required: true,
                  })}
                />
                {errors.OfficeContactNo && (
                  <small className="text-danger">
                    Please enter a office contact no
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="Email"
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                  {...register("Email", {
                    required: true,
                  })}
                />
                {errors.Email && (
                  <small className="text-danger">Please enter a email</small>
                )}
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label>
                  Office Address<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  name="OfficeAddress"
                  className={`form-control ${
                    errors.OfficeAddress ? "is-invalid" : ""
                  }`}
                  {...register("OfficeAddress", {
                    required: true,
                  })}
                />
                {errors.OfficeAddress && (
                  <small className="text-danger">
                    Please enter a officeaddress
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer col-md-12 mt-4">
            <Button className=" btn-outline-secondary btn-light mx-2">
              Back
            </Button>
            <Button className="" type="submit">
              Save Changes{" "}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactSetting;
