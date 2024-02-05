import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { ImageResize } from "quill-image-resize-module-react";
import { handleTokenErrors } from "../component/handleTokenErrors";


// Quill.register("modules/imageResize", ImageResize);

const CmsMaster = () => {
  const [cmsData, setCmsData]= useState();
  useEffect(() => {
    cmsdata();
  }, []);

  const cmsdata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/cmsall1`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      // Handle the successful response here
      setCmsData(response.data.document);
    } catch (error) {
      // Handle any errors here
      handleTokenErrors(error);
      console.error(error);
    }
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    // imageResize: {
    //   parchment: Quill.import("parchment"),
    //   modules: ["Resize", "DisplaySize"],
    // },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setdata] = useState(
    !location?.state?.data
      ? {
        sortOrder: "",
        title: "",
        description: "",
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
      }
      : location?.state?.data
  );

  const [formErrors, setFormErrors] = useState({});

  const handalchange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isActive") {
      setdata({ ...data, [name]: checked });
    } else {
      setdata({ ...data, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate Sort Order (custom validation: must be a positive integer)
    if (!/^\d+$/.test(data.sortOrder) || data.sortOrder <= 0) {
      errors.sortOrder = "Sort Order must be a positive integer.";
    }

    // Validate Title (must not be empty)
    if (!data.title) {
      errors.title = "Title is required.";
    }

    // Validate Description (must not be empty)
    if (!data.description.trim()) {
      errors.description = "Description is required.";
    }

    // Validate Meta Title (must not be empty)
    if (!data.metaTitle.trim()) {
      errors.metaTitle = "Meta Title is required.";
    }
    if (!data.metaKeyword.trim()) {
      errors.metaKeyword = "meta Keyword is required.";
    }
    if (!data.metaDescription.trim()) {
      errors.metaDescription = "meta Description is required.";
    }

    // You can add more custom validations for other fields here

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">CMS Master Manage</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 ">
              <form className="">
                <div className="row mb-4">
                  <div className="col-md-2 ">
                    <label htmlFor="validationCustom01" className="form-label">
                      Title{" "}
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="title"
                      value={data?.title}
                      className={`form-control ${formErrors.title ? "is-invalid" : ""
                        }`}
                      id="validationCustom01"
                      required
                      disabled={location?.state?.type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                    {formErrors.title && (
                      <div className="invalid-feedback">{formErrors.title}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-2">
                    <label htmlFor="validationCustom01" className="form-label">
                      Sort Order<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="number"
                      name="sortOrder"
                      // value={data?.sortOrder}
                      value={data && data.sortOrder ? data && data.sortOrder : cmsData?.length + 1}  
                      className={`form-control ${formErrors.sortOrder ? "is-invalid" : ""
                        }`}
                      id="validationCustom01"
                      required
                      disabled={location?.state?.type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                    {formErrors.sortOrder && (
                      <div className="invalid-feedback">
                        {formErrors.sortOrder}
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="row mb-4">
                  <div className="col-md-2">
                    <label htmlFor="validationCustom01" className="form-label">
                      Description<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <textarea
                      type="text"
                      name="description"
                      value={data?.description}
                      className={`form-control ${
                        formErrors.description ? "is-invalid" : ""
                      }`}
                      id="validationCustom01"
                      required
                      disabled={location?.state?.type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                    {formErrors.description && (
                      <div className="invalid-feedback">
                        {formErrors.description}
                      </div>
                    )}
                  </div>
                </div> */}

                <div className="row mb-4">
                  <div className="col-md-2">
                    <label htmlFor="validationCustom01" className="form-label">
                      Description<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      className={`${formErrors.description ? "is-invalid" : ""}`}
                      name="description"
                      value={data?.description}
                      onChange={(value) => {
                        setdata({ ...data, description: value });
                        setFormErrors({ ...formErrors, description: "" }); // Clear the description error when the user starts typing
                      }}
                    />
                    {formErrors.description && (
                      <div className="invalid-feedback">
                        {formErrors.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-2">
                    <label htmlFor="validationCustom01" className="form-label">
                      Meta Title<span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      name="metaTitle"
                      value={data?.metaTitle}
                      className={`form-control ${formErrors.metaTitle ? "is-invalid" : ""
                        }`}
                      id="validationCustom01"
                      required
                      disabled={location?.state?.type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                    {formErrors.metaTitle && (
                      <div className="invalid-feedback">
                        {formErrors.metaTitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-2">
                    <label htmlFor="validationCustom01" className="form-label">
                      Meta KeyWord
                    </label>
                  </div>
                  <div className="col-md-4">
                    <textarea
                      type="text"
                      name="metaKeyword"
                      value={data?.metaKeyword}
                      className={`form-control ${formErrors.metaKeyword ? "is-invalid" : ""
                        }`}
                      id="validationCustom01"
                      disabled={location?.state?.type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                    {formErrors.metaKeyword && (
                      <div className="invalid-feedback">
                        {formErrors.metaKeyword}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-2">
                    <label htmlFor="validationCustom01" className="form-label">
                      Meta Description
                    </label>
                  </div>
                  <div className="col-md-4">
                    <textarea
                      type="text"
                      name="metaDescription"
                      value={data?.metaDescription}
                      className={`form-control ${formErrors.metaDescription ? "is-invalid" : ""
                        }`}
                      id="validationCustom01"
                      disabled={location?.state?.type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                    {formErrors.metaDescription && (
                      <div className="invalid-feedback">
                        {formErrors.metaDescription}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-md-2">
                    <label></label>
                  </div>
                  <div className="col-md-4">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      name="isActive"
                      checked={data?.isActive}
                      disabled={location?.state?.type === "View"}
                      id="flexCheckDefault"
                      onChange={(e) => handalchange(e)}
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
                  <Button
                    className="btn-outline-secondary btn-light mx-2"
                    onClick={() => {
                      navigate("/cmsmasterlist");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=""
                    onClick={async () => {
                      if (location?.state?.type === "View") {
                        // Handle the View mode, if needed
                      } else {
                        if (validateForm()) {
                          try {
                            let headersList = {
                              Accept: "*/*",
                              Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                              )}`,
                              "Content-Type": "application/json",
                            };

                            let bodyContent = JSON.stringify({
                              title: data.title,
                              sortOrder: data.sortOrder,
                              description: data.description,
                              metaTitle: data.metaTitle,
                              metaKeyword: data.metaKeyword,
                              metaDescription: data.metaDescription,
                              isActive: data.isActive,
                              isExternalPageURL: false,
                              id: data._id,
                            });

                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/admin/cms`,
                              method: "POST",
                              headers: headersList,
                              data: bodyContent,
                            };

                            let response = await axios.request(reqOptions);
                            if (response.data.status === 1) {
                              toast.success(response.data.message);
                              navigate("/cmsmasterlist");
                            }
                          } catch (error) {
                            handleTokenErrors(error);
                            toast.error(error.response.data.originalError);
                          }
                        }
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsMaster;