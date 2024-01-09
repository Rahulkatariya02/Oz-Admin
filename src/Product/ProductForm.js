import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = ({ data123, type }) => {
  const [data, setdata] = useState(!data123 ? {} : data123);
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();
  console.log(data123);
  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name !== "subCat_product") {
      if (name !== "logoimg") {
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
  };
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}api/category/getAllCategoriesall`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.text();
    let data1 = await JSON.parse(data);
    setcategory(data1.data);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 mb-30">
          <div className="pd-20 card-box height-100-p">
            <div className="pd-20  ">
              <form>
                <div className="form-group row">
                  <label className="col-sm-12 col-md-4 col-form-label mb-4">
                    Product Name{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="productName"
                      disabled={type === "View"}
                      value={data?.productName}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Product Code
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="ProductCode"
                      value={data?.ProductCode}
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Sort Order{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="number"
                      name="sortOrder"
                      value={data?.sortOrder}
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Banner Image<span className="text-danger">*</span>{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="file"
                      name="subCat_product"
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    logo img<span className="text-danger">*</span>{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="file"
                      name="logoimg"
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    description
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="Description"
                      disabled={type === "View"}
                      value={data?.Description}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Meta Title
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="metaTitle"
                      disabled={type === "View"}
                      value={data?.metaTitle}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Meta KeyWord
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="metaKeyword"
                      disabled={type === "View"}
                      value={data?.metaKeyword}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Meta Description <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="metaDescription"
                      value={data?.metaDescription}
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                </div>

                <div className="custom-control custom-checkbox mb-5">
                  <label className="col-sm-12 col-md-4 col-form-label"></label>
                  <input
                    type="checkbox"
                    className="custom-control-input my-5"
                    id="customCheck3"
                    disabled={type === "View"}
                    checked={data?.isActive}
                    name="isActive"
                    onChange={(e) => handalchange(e)}
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
                      try {
                        if (type !== "View") {
                          if (data?._id !== undefined) {
                            let formdata = new FormData();
                            formdata.append("sortOrder", data.sortOrder);
                            formdata.append("productName", data.productName);
                            formdata.append("metaTitle", data.metaTitle);
                            formdata.append("Description", data.Description);
                            formdata.append("ProductCode", data.ProductCode);
                            formdata.append("metaKeyword", data.metaKeyword);
                            formdata.append("logoimg", data.logoimg);
                            formdata.append("id", data._id);
                            formdata.append(
                              "metaDescription",
                              data.metaDescription
                            );
                            formdata.append("slug", data.productName);
                            formdata.append("category_id", data123?._id);
                            formdata.append(
                              "subCat_product",
                              data.subCat_product
                            );

                            let bodyContent = formdata;

                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/subcategoryproduct/addProduct`,
                              method: "POST",
                              data: bodyContent,
                            };

                            let response = await axios.request(reqOptions);
                            if (response.data.status === 1) {
                              toast.success(response.data.message);
                              navigate("/categorymasterlist");
                            }
                          } else {
                            let formdata = new FormData();
                            formdata.append("sortOrder", data.sortOrder);
                            formdata.append("productName", data.productName);
                            formdata.append("metaTitle", data.metaTitle);
                            formdata.append("Description", data.Description);
                            formdata.append("ProductCode", data.ProductCode);
                            formdata.append("metaKeyword", data.metaKeyword);
                            formdata.append(
                              "metaDescription",
                              data.metaDescription
                            );
                            formdata.append("slug", data.productName);
                            formdata.append("logoimg", data.logoimg);
                            formdata.append("category_id", data123?._id);
                            formdata.append(
                              "subCat_product",
                              data.subCat_product
                            );

                            let bodyContent = formdata;

                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/subcategoryproduct/addProduct`,
                              method: "POST",
                              data: bodyContent,
                            };

                            let response = await axios.request(reqOptions);
                            if (response.data.status === 1) {
                              toast.success(response.data.message);
                              navigate("/categorymasterlist");
                            }
                          }
                        }
                      } catch (error) {
                        toast.error(error?.response?.data?.error);
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
              <h4 className="text-dark h4">PRODUCT CATEGORIES</h4>
            </div>
            {category?.map((e, i) => {
              return (
                <div
                  className="custom-control custom-checkbox mb-5 mt-3"
                  key={i}
                >
                  <label className="col-sm-12 col-md-2 col-form-label "></label>
                  <input
                    type="checkbox"
                    className="custom-control-input my-5"
                    id="customCheck1"
                    checked={e?._id === data123?._id}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    {e.category}
                  </label>
                  {e.subcategories.map((e, i) => {
                    return (
                      <div className="custom-control custom-checkbox mb-5 mt-3">
                        <label className="col-sm-12 col-md-2 col-form-label "></label>
                        <input
                          type="checkbox"
                          className="custom-control-input my-5"
                          id="customCheck1"
                          checked={e?._id === data123?._id}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          {e.productName}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
