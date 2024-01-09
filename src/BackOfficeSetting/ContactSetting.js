import axios from "axios";
import React, { useEffect, useState } from "react";
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
        company_name: data.company_name,
        office_contact_no: data.office_contact_no,
        office_address: data.office_address,
        map_url: data.map_url,
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

  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let accessToken = localStorage.getItem('accessToken');
      let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${accessToken}`
      }
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/admin/contact`, {
        headers: headersList,
      });
      setContactData(response.data.document);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (contactData[0]) {
      reset(contactData[0]);
    }
  }, [contactData[0]]);

  return (
    <>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Company Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="company_name"
                  className={`form-control ${errors.company_name ? "is-invalid" : ""
                    }`}
                  {...register("company_name", {
                    required: true,
                  })}
                />
                {errors.company_name && (
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
                  name="office_contact_no"
                  className={`form-control ${errors.office_contact_no ? "is-invalid" : ""
                    }`}
                  {...register("office_contact_no", {
                    required: true,
                  })}
                />
                {errors.office_contact_no && (
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
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Map url<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="map_url"
                  className={`form-control ${errors.map_url ? "is-invalid" : ""}`}
                  {...register("map_url", {
                    required: true,
                  })}
                />
                {errors.map_url && (
                  <small className="text-danger">Please enter a map url</small>
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
                  name="office_address"
                  className={`form-control ${errors.office_address ? "is-invalid" : ""
                    }`}
                  {...register("office_address", {
                    required: true,
                  })}
                />
                {errors.office_address && (
                  <small className="text-danger">
                    Please enter a office address
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
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactSetting;
