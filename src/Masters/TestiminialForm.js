import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const TestiminialForm = () => {
  const location = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [data, setdata] = useState(
    !location?.state?.data ? {} : location?.state?.data
  );
  const [isActive, setIsActive] = useState(
    location?.state?.data?.isActive || false
  );
  const navigate = useNavigate();
  const handalchange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isActive") {
      setdata({ ...data, [name]: checked });
    } else {
      setdata({ ...data, [name]: value });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!data.name) {
      valid = false;
      errors.name = "Testimonial Name is required";
    }

    if (!data.text) {
      valid = false;
      errors.text = "Testimonial Text is required";
    }
    setFormErrors(errors);
    return valid;
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Testimonial Manage</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 ">
              <div className="row mb-4">
                <div className="col-md-2 ">
                  <label htmlFor="validationCustom01" className="form-label">
                    Testimonial Name{" "}
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
                    id="validationCustom01"
                    value={data?.name}
                    disabled={location?.state?.type === "View"}
                    name="name"
                    onChange={(e) => handalchange(e)}
                    required
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-2">
                  <label htmlFor="validationCustom01" className="form-label">
                    Testimonial Text<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-sm-4">
                  <textarea
                    type="text"
                    className={`form-control ${
                      formErrors.text ? "is-invalid" : ""
                    }`}
                    name="text"
                    value={data?.text}
                    disabled={location?.state?.type === "View"}
                    id="validationCustom01"
                    onChange={(e) => handalchange(e)}
                    required
                  />
                  {formErrors.text && (
                    <div className="invalid-feedback">{formErrors.text}</div>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-2">
                  <label></label>
                </div>
                <div className="col-md-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    name="isActive"
                    defaultChecked={isActive || data.isActive}
                    id="flexCheckDefault"
                    onChange={(e) => setIsActive(e.target.checked)}
                  />

                  <label
                    className="form-check-label mx-2"
                    htmlFor="flexCheckDefault"
                  >
                    Is Active
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <Link to="/testimonial-master-list">
                  <Button className=" btn-outline-secondary btn-light mx-2">
                    Go To List
                  </Button>
                </Link>
                <Button
                  className=""
                  onClick={async () => {
                    if (location?.state?.type !== "View") {
                      if (validateForm()) {
                        try {
                          let headersList = {
                            Accept: "*/*",
                            Authorization: `Bearer ${localStorage.getItem(
                              "accessToken"
                            )}`,
                          };
                          let reqOptions = {
                            url: `${process.env.REACT_APP_API_BASE_URL}api/admin/testimonial`,
                            method: "POST",
                            headers: headersList,
                            data: {
                              id: data.id,
                              isActive: isActive,
                              name: data.name,
                              text: data.text,
                            },
                          };

                          let response = await axios.request(reqOptions);
                          if (response.data.status === 1) {
                            toast.success(response.data.message);
                            navigate("/testimonial-master-list");
                          }
                        } catch (error) {
                          handleTokenErrors(error);
                          toast.error(error?.response?.data?.originalError);
                        }
                      }
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestiminialForm;
