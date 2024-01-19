import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddnewCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const catData = location.state?.data?.category
  const [data, setData] = useState({
    productName: catData?.category || "",
    SortOrder: catData?.sortOrder || "",
    Description: catData?.description || "",
    CategoryImage: catData?.category_image || null,
    MetaTitle: catData?.metaTitle || "",
    MetaKeyWord: catData?.metaKeyword || "",
    MetaDescription:catData?.metaDescription || "",
    isActive: catData?.isActive || false,
  });
  const [errors, setErrors] = useState({});

  console.log('Category', catData);
  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name !== "CategoryImage") {
      setData({ ...data, [name]: value });
    } else {
      setData({ ...data, [name]: files[0] });
    }
  };

  const handleCustomValidation = () => {
    const newErrors = {};

    if (!data.productName) {
      newErrors.productName = "Category Name is required";
    }

    if (!data.SortOrder) {
      newErrors.SortOrder = "Sort Order is required";
    }
    if (!data.Description) {
      newErrors.Description = "Description is required";
    }
    if (!data.CategoryImage) {
      newErrors.CategoryImage = "Meta Keyword is required";
    }
    if (!data.MetaTitle) {
      newErrors.MetaTitle = "Meta Title is required";
    }
    if (!data.MetaKeyWord) {
      newErrors.MetaKeyWord = "Meta KeyWord is required";
    }
    if (!data.MetaDescription) {
      newErrors.MetaDescription = "Meta description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="main-container">
      <div className="xs-pd-20-10 pd-ltr-20 col-md-12">
        <div className="title pb-20">
          <h2 className="h3 mb-0">Category Manage</h2>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-12 mb-30">
            <div className="pd-20 card-box height-100-p">
              <div className="pd-20">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-12 col-md-4 col-form-label mb-4">
                      Base Category Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8 mb-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Root Category"
                        readOnly
                      />
                    </div>

                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Category Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8 mb-4">
                      <input
                        type="text"
                        name="productName"

                        className={`form-control ${errors.productName ? "is-invalid" : ""
                          }`}
                        value={data.productName }
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.productName && (
                        <div className="invalid-feedback">
                          {errors.productName}
                        </div>
                      )}
                    </div>

                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Sort Order <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-8 mb-4">
                      <input
                        className={`form-control ${errors.SortOrder ? "is-invalid" : ""
                          }`}
                        type="text"
                        name="SortOrder"
                        value={data.SortOrder}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.SortOrder && (
                        <div className="invalid-feedback">
                          {errors.SortOrder}
                        </div>
                      )}
                    </div>

                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Description
                    </label>
                    <div className="col-md-8 mb-4">
                      <textarea
                        className={`form-control ${errors.Description ? "is-invalid" : ""
                          }`}
                        name="Description"
                        value={data.Description}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="invalid-feedback">
                        {errors.Description}
                      </div>
                    </div>
                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Category Image
                    </label>
                    <div className="col-md-8 mb-4">
                      <input
                        className={`form-control ${errors.CategoryImage ? "is-invalid" : ""
                          }`}
                        type="file"
                        name="CategoryImage"
                        onChange={(e) => handleChange(e)}
                      />
                      {catData?.category_image ? <img src={`${process.env.REACT_APP_API_BASE_URL} +
                            ${catData?.category_image}`} alt="category_image" /> : ''}
                      {errors.CategoryImage && (
                        <div className="invalid-feedback">
                          {errors.CategoryImage}
                        </div>
                      )}
                      <small className="form-text text-muted">
                        Image Size Must Be : 300 X 324 & Format Must Be .jpeg,
                        .jpg
                      </small>
                    </div>

                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Meta Title
                    </label>
                    <div className="col-md-8 mb-4">
                      <input
                        className={`form-control ${errors.MetaTitle ? "is-invalid" : ""
                          }`}
                        type="text"
                        name="MetaTitle"
                        value={data.MetaTitle}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.MetaTitle && (
                        <div className="invalid-feedback">
                          {errors.MetaTitle}
                        </div>
                      )}
                    </div>
                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Meta KeyWord
                    </label>
                    <div className="col-md-8 mb-4">
                      <textarea
                        className={`form-control ${errors.MetaKeyWord ? "is-invalid" : ""
                          }`}
                        name="MetaKeyWord"
                        value={data.MetaKeyWord}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.MetaKeyWord && (
                        <div className="invalid-feedback">
                          {errors.MetaKeyWord}
                        </div>
                      )}
                    </div>
                    <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                      Meta Description
                    </label>
                    <div className="col-md-8 mb-4">
                      <textarea
                        className={`form-control ${errors.MetaDescription ? "is-invalid" : ""
                          }`}
                        name="MetaDescription"
                        value={data.MetaDescription}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.MetaDescription && (
                        <div className="invalid-feedback">
                          {errors.MetaDescription}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="custom-control custom-checkbox mb-5">
                    <label className="col-sm-12 col-md-2 col-form-label"></label>
                    <input
                      type="checkbox"
                      className="custom-control-input my-5"
                      id="customCheck3"
                      name="isActive"
                      checked={data.isActive}
                      onChange={(e) => handleChange(e)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck3"
                    >
                      Is Active
                    </label>
                  </div>
                  <div className="modal-footer">
                    <Link to="/categorymasterlist">
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
                        if (handleCustomValidation()) {
                          try {
                            let formdata = new FormData();
                            formdata.append("id", catData?._id ? catData?._id :'');
                            formdata.append("sortOrder", data.SortOrder);
                            formdata.append("category", data.productName);
                            formdata.append("description", data.Description);
                            formdata.append("metaTitle", data.MetaTitle);
                            formdata.append("metaKeyword", data.MetaKeyWord);
                            formdata.append("metaDescription", data.MetaDescription);
                            // formdata.append("category_image",data.CategoryImage);
                            if (data.CategoryImage instanceof File) {
                              formdata.append("category_image", data.CategoryImage);
                            } else if (catData.category_image) {
                              const blob = await fetch(catData.category_image).then((res) => res.blob());
                              formdata.append("category_image", blob, `${catData.category_image}.jpg`);
                            }
                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/category/addCategory`,
                              method: "POST",
                              data: formdata,
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "accessToken"
                                )}`,
                              },
                            };

                            let response = await axios.request(reqOptions);

                            if (response.data.status === 1) {
                              toast.success(response.data.message);
                              navigate("/categorymasterlist");
                            }
                          } catch (error) {
                            toast.error(error?.response?.data?.error);
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
        </div>
      </div>
    </div>
  );
};

export default AddnewCategory;
