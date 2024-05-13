import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";
import CommonEditor from "../component/CommonEditor";

const ContactSetting = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

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
        handleTokenErrors(error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [contactData, setContactData] = useState([]);

  const fetchData = async () => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${accessToken}`
      }
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/admin/contact`, {
        headers: headersList,
      });
      setContactData(response.data.document);
    } catch (error) {
      handleTokenErrors(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const contact = contactData[0];
    const resetFunction = reset;
    if (contact && resetFunction) {
      resetFunction(contact);
    }
  }, [contactData, reset]);


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
                <CommonEditor value={watch('office_address')} />
                {/* <ReactQuill
                  name="office_address"
                  value={watch('office_address')} // Ensure it's controlled by react-hook-form
                  onChange={(value) => {
                    setValue('office_address', value); // Update the form value
                  }}
                /> */}
                {errors.office_address && (
                  <small className="text-danger">
                    Please enter an office address
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
