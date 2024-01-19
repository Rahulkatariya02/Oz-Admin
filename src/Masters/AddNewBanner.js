import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewBanner = ({ data12 }) => {
  const location = useLocation();
  console.log(location.state.data);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [menuNameId, setmenuNameId] = useState("");
  const [menudata1, setmenudata] = useState([]);
  const [editerdata, setediterdata] = useState(EditorState.createEmpty());
  const [data, setdata] = useState(
    !location.state
      ? { BannerType:'', sortOrder: location.state.sortOrder }
      : {
        id: location.state._id,
        sortOrder: location.state.sortOrder,
        BannerType: location.state.bannerType,
        menuName: "",
        BannerTitle: location.state.title,
        BannerDescription: location.state.description,
        ClickUrl: location.state.click_url,
        MobileBannerImage: location.state.banner_mobile_image,
        BannerImage: location.state.banner_image,
      }
  );
  console.log('menuNameId', menuNameId,);
  const [formErrors, setFormErrors] = useState({});
const [isActive, setIsActive] = useState(false)
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  useEffect(() => {
    setdata({ ...data, menuName: menuNameId });
  }, [menuNameId]);

  useEffect(() => {
    menudata();
    // if (!data1222) {
    //   setdata({ ...data, menuName: data1222?._id });
    // }
  }, []);
  const [previewImage, setPreviewImage] = useState("");
  const [previewImage1, setPreviewImage1] = useState("");
  const [selectedBannerType, setSelectedBannerType] = useState("1"); 
  
  const handleFileChange = (event, setImagePreview) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    
  };

  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name === "SortOrder") {
      if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
        setFormErrors({
          ...formErrors,
          [name]: "Sort Order must be a positive integer.",
        });
      } else {
        setFormErrors({ ...formErrors, [name]: "" });
      }
    } else {
      setFormErrors({ ...formErrors, [name]: "" });
    }

    if (name !== "MobileBannerImage") {
      if (name !== "BannerImage") {
        if (name === "isActive") {
          setdata({ ...data, [name]: checked });
        } else {
          setdata({ ...data, [name]: value });
        }
      } else {
        setdata({ ...data, [name]: files[0] });
      }
    } else {
      setdata({ ...data, [name]: files[0] });
    }
    if (name === "MenuName") {
      setmenuNameId(value); // Update menuNameId with the selected menu id
    }
    if (name === "BannerType" ) {
      setSelectedBannerType(value); // Update selectedBannerType with the selected BannerType value
      setdata({ ...data, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!/^\d+$/.test(data.sortOrder) || parseInt(data.sortOrder) <= 0) {
      errors.sortOrder = "Sort Order must be a positive integer.";
    }

    if (!data.MenuName && !menuNameId) {
      errors.MenuName = "Menu Name is required.";
    }

    if (!data.BannerType  && !selectedBannerType ) {
      errors.BannerType = "Banner Type is required.";
    }

    if (!data.BannerTitle) {
      errors.BannerTitle = "Banner Title is required.";
    }

    if (!data.ClickUrl) {
      errors.ClickUrl = "Click URL is required.";
    }

    if (!data.BannerDescription) {
      errors.BannerDescription = "Banner Description is required.";
    }

    if (!data.BannerImage) {
      errors.BannerImage = "Banner Image is required.";
    }

    if (!data.MobileBannerImage) {
      errors.MobileBannerImage = "Mobile Banner Image is required.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const menudata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/menu`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      setmenudata(response.data);
      const data1222 = response.data.document?.find((e) => {
        return e.name === location.state.menuName;
      });
      setmenuNameId(data1222?._id);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('data', selectedBannerType);
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Banner Master Manage</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 ">
              <div className="row">
                <div className="col-md-8 col-sm-12 mb-30">
                  <div className="pd-20 card-box height-100-p">
                    <div className="pd-20  ">
                      <form>
                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            SortOrder <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <input
                              className={`form-control ${formErrors.sortOrder ? "is-invalid" : ""
                                }`}
                              name="sortOrder"
                              value={data.sortOrder}
                              type="number"
                              onChange={(e) => handalchange(e)}
                            />
                            {formErrors.sortOrder && (
                              <div className="invalid-feedback">
                                {formErrors.sortOrder}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Menu Name <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <select
                              name="MenuName"
                              className={`form-control ${formErrors.MenuName ? "is-invalid" : ""
                                }`}
                              value={data.menuName}
                              onChange={(e) => handalchange(e)}
                            >
                              <option disabled value="">
                                --Menu Name--
                              </option>
                              {menudata1.document &&
                                menudata1.document?.map((el, i) => {
                                  return (
                                    <option key={i} value={el._id}>
                                      {el.name}
                                    </option>
                                  );
                                })}
                            </select>
                            {formErrors.MenuName && (
                              <div className="invalid-feedback">
                                {formErrors.MenuName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Banner Type <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <select
                              className={`form-control ${formErrors.BannerType ? "is-invalid" : ""
                                }`}
                              value={data.BannerType}
                              onChange={(e) => setSelectedBannerType(e.target.value)}
                            >
                               <option value="">--- Select type ---</option>
                              <option value="1">Home Slider</option>
                              <option value="2">Box Image</option>
                            </select>
                            {formErrors.BannerType && (
                              <div className="invalid-feedback">
                                {formErrors.BannerType}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Banner Title <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <input
                              className={`form-control ${formErrors.BannerTitle ? "is-invalid" : ""
                                }`}
                              value={data.BannerTitle}
                              name="BannerTitle"
                              type="text"
                              onChange={(e) => handalchange(e)}
                            />
                            {formErrors.BannerTitle && (
                              <div className="invalid-feedback">
                                {formErrors.BannerTitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Click Url <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <input
                              className={`form-control ${formErrors.ClickUrl ? "is-invalid" : ""
                                }`}
                              value={data.ClickUrl}
                              name="ClickUrl"
                              onChange={(e) => handalchange(e)}
                            />
                            {formErrors.ClickUrl && (
                              <div className="invalid-feedback">
                                {formErrors.ClickUrl}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Banner Description
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <div>
                              <textarea
                                name="BannerDescription"
                                value={data.BannerDescription}
                                className={`form-control ${formErrors.BannerDescription
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                onChange={(e) => handalchange(e)}
                              />
                              {formErrors.BannerDescription && (
                                <div className="invalid-feedback">
                                  {formErrors.BannerDescription}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Banner Image <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <input
                              className={`form-control-file ${formErrors.BannerImage ? "is-invalid" : ""
                                }`}
                              type="file"
                              name="BannerImage"
                              onChange={(event) => {
                                handalchange(event);
                                handleFileChange(event, setPreviewImage);
                              }}
                            />
                            <small className="form-text text-muted">
                              Image Size Must Be : 1920 X 940 & Format Must Be
                              .jpeg, .jpg
                            </small>
                            {formErrors.BannerImage && (
                              <div className="invalid-feedback">
                                {formErrors.BannerImage}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <label className="col-sm-12 col-md-3 col-form-label">
                            Mobile Banner Image{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="col-sm-12 col-md-9">
                            <input
                              className={`form-control-file ${formErrors.MobileBannerImage ? "is-invalid" : ""
                                }`}
                              type="file"
                              name="MobileBannerImage"
                              onChange={(event) => {
                                handalchange(event);
                                handleFileChange(event, setPreviewImage1);
                              }}
                            />
                            <small className="form-text text-muted">
                              Image Size Must Be : 700 X 500 & Format Must Be
                              .jpeg, .jpg
                            </small>
                            {formErrors.MobileBannerImage && (
                              <div className="invalid-feedback">
                                {formErrors.MobileBannerImage}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="custom-control custom-checkbox mb-5">
                          <label className="col-sm-12 col-md-3 col-form-label"></label>
                          <input
                            type="checkbox"
                            className="custom-control-input my-5"
                            id="customCheck3"
                            name="isActive"
                            checked={data.isActive === true || isActive}
                            onChange={(e)=> setIsActive(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck3"
                          >
                            Is Active
                          </label>
                        </div>

                        <div className="modal-footer">
                          <Link to="/bannermasterlist">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Go to list
                            </button>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                              if (validateForm()) {
                                try {
                                  let headersList = {
                                    Accept: "*/*",
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "accessToken"
                                    )}`,
                                  };
                                  let formdata = new FormData();
                                  formdata.append("sortOrder", data.sortOrder);
                                  formdata.append("id", location.state._id ? location.state._id : '');
                                  formdata.append("menuName", data.menuName ? data.menuName :data.MenuName);
                                  formdata.append(
                                    "bannerType",
                                  selectedBannerType
                                  );
                                  formdata.append("title", data.BannerTitle);
                                  formdata.append("click_url", data.ClickUrl);
                                  formdata.append("description", data.BannerDescription);
                                  formdata.append("isActive", isActive);
                                  // formdata.append("banner_image", data.BannerImage );
                                  // formdata.append( "banner_mobile_image", data.MobileBannerImage);
                                  if (data.BannerImage instanceof File) {
                                    formdata.append("banner_image", data.BannerImage);
                                  } else if (previewImage) {
                                    const blob = await fetch(previewImage).then((res) => res.blob());
                                    formdata.append("banner_image", blob, "previewImage.jpg");
                                  }

                                  // formdata.append("banner_mobile_image", data.MobileBannerImage);
                                  if (data.BannerImage instanceof File) {
                                    formdata.append("banner_mobile_image", data.BannerImage);
                                  } else if (previewImage1) {
                                    const blob = await fetch(previewImage1).then((res) => res.blob());
                                    formdata.append("banner_mobile_image", blob, "previewImage1.jpg");
                                  }


                                  let bodyContent = formdata;
                                  console.log('formdata', formdata);
                                  let reqOptions = {
                                    url: `${process.env.REACT_APP_API_BASE_URL}api/admin/banner`,
                                    method: "POST",
                                    headers: headersList,
                                    data: bodyContent,
                                  };

                                  let response = await axios.request(
                                    reqOptions
                                  );
                                  if (response.data.status === 1) {
                                    toast.success(response.data.message);
                                    navigate("/bannermasterlist");
                                  }
                                } catch (error) {
                                  toast.error(
                                    error?.response?.data?.originalError
                                  );
                                }
                              }
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 mb-30">
                  <div className="pd-20 card-box h-25">
                    <div className="modal-header ">
                      <h4 className="text-dark h4">Preview Image</h4>
                    </div>
                    <div className="mt-2">
                      <h6 className="image-preview">Banner Preview Image</h6>
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : process.env.REACT_APP_API_BASE_URL +
                            data.BannerImage
                        }
                        alt="Preview"
                        className="preview-image"
                      />

                      <h6 className="image-preview mt-3">
                        Mobile Preview Image
                      </h6>
                      <img
                        src={
                          previewImage1
                            ? previewImage1
                            : process.env.REACT_APP_API_BASE_URL +
                            data.MobileBannerImage
                        }
                        alt="Preview"
                        className="preview-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewBanner;
