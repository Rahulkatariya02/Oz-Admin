import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const ProductFileForm = ({
  data123,
  showForm,
  activedata,
  setShowForm,
  type,
}) => {
  const [data, setdata] = useState(activedata ? activedata : {});
  const [isActive, setIsActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Added state for tracking selected file

  const navigate = useNavigate();
  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name !== "file") {
      if (name === "isActive") {
        setdata({ ...data, [name]: checked });
      } else {
        setdata({ ...data, [name]: value });
      }
    } else {
      if (files.length > 0) {
        setSelectedFile(files[0]); // Set selected file
        setdata({ ...data, [name]: files[0].name }); // Set file name in the data state
      }
    }
  };

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
                      name="title"
                      value={data?.title}
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
                      name="file"
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
                      value={data?.contentText}
                      name="contentText"
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                </div>

                <div className="custom-control custom-checkbox mb-5">
                  <label className="col-sm-12 col-md-4 col-form-label"></label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={data.isActive ?? isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label className="" htmlFor="customCheck3">
                    Is Active
                  </label>
                </div>
                <div className="modal-footer">
                  <Link to="/category-master-list">
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
                        let headersList = {
                          Accept: "*/*",
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                          "Content-Type": "multipart/form-data", // Updated Content-Type
                        };
                        let formdata = new FormData();
                        console.log(data, "data");
                        console.log(data123, "data123");
                        formdata.append("contentText", data.contentText);
                        formdata.append("isActive", isActive);
                        formdata.append("product_id", data123[0].product_id);
                        formdata.append("id", data123[0]._id);
                        formdata.append("title", data.title);
                        formdata.append("sortOrder", data.sortOrder);
                        if (selectedFile instanceof File) {
                          formdata.append("file", selectedFile);
                        } else if (activedata.file) {
                          const blob = await fetch(activedata.file).then(
                            (res) => res.blob()
                          );
                          formdata.append("file", blob, `${activedata.file}`);
                        }
                        let bodyContent = formdata;
                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/productfile`,
                          method: "POST",
                          headers: headersList,
                          data: bodyContent,
                        };
                        let response = await axios.request(reqOptions);
                        if (response.data.status === 1) {
                          toast.success(response.data.message);
                          navigate("/category-master-list");
                        }
                      } catch (error) {}
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <div className="col-md-4 col-sm-12 mb-30">
          <div className="pd-20 card-box h-25">
            <div className="modal-header ">
              <h4 className="text-dark h4">Preview Image</h4>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ProductFileForm;
