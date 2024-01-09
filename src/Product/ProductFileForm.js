import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductFileForm = ({ data123, type }) => {
  const [data, setdata] = useState({ isActive: true });
  const navigate = useNavigate();
  const handalchange = (e) => {
    console.log(e.target);
    const { name, value, checked, files } = e.target;
    if (name !== "products_img1") {
      if (name === "isActive") {
        setdata({ ...data, [name]: checked });
      } else {
        setdata({ ...data, [name]: value });
      }
    } else {
      setdata({ ...data, [name]: files[0] });
    }
  };
  console.log("datadatadata", data);
  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 mb-30">
          <div className="pd-20 card-box height-100-p">
            <div className="pd-20  ">
              <form>
                <div className="form-group row">
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Title
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="Title"
                      value={data?.Title}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Sort Order
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="number"
                      name="sortOrder"
                      value={data?.sortOrder}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    File<span className="text-danger">*</span>{" "}
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="file"
                      name="products_img1"
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Content Text
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="ContentText"
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                </div>

                <div className="custom-control custom-checkbox mb-5">
                  <label className="col-sm-12 col-md-4 col-form-label"></label>
                  <input
                    type="checkbox"
                    className="custom-control-input my-5"
                    name="isActive"
                    checked={data.isActive}
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
                        let formdata = new FormData();
                        formdata.append("ContentText", data.ContentText);
                        formdata.append("isActive", data.isActive);
                        formdata.append("products_id", data123?._id);
                        formdata.append("UploadType", data.UploadType);
                        formdata.append("Title", data.Title);
                        formdata.append("sortOrder", data.sortOrder);
                        formdata.append("products_img1", data.products_img1);
                        let bodyContent = formdata;
                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/ProductFile/addProductFile`,
                          method: "POST",
                          data: bodyContent,
                        };
                        let response = await axios.request(reqOptions);
                        if (response.data.status === 1) {
                          toast.success(response.data.message);
                          navigate("/categorymasterlist");
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
              <h4 className="text-dark h4">Preview Image</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFileForm;
