import axios from "axios";
import DataTable from "datatables.net-dt";
import React, { useEffect } from "react";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Spin, Switch, Table } from "antd";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Clients = () => {
  useEffect(() => {
    // new DataTable("#myTable");
  }, []);

  const [data, setdata] = useState({});
  const [Allclints, setAllclints] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;

    if (name !== "BannerImage") {
      if (name === "isActive") {
        setdata({ ...data, [name]: checked });
      } else {
        setdata({ ...data, [name]: value });
      }
    } else {
      setdata({ ...data, [name]: files[0] });
    }
  };
  useEffect(() => {
    allclints();
  }, []);
  const allclints = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/clientall`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setAllclints(response?.data?.document);
  };
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
  const columns = [
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: "Image",
      dataIndex: "Image",
      sorter: (a, b) => a.menuName.localeCompare(b.menuName),
      render: (text, object, index) => (
        <>
          <img src={object.client_image} alt="slider-img" width={100} />
        </>
      ),
    },
    {
      title: "Is Active	",
      dataIndex: "isActive",
      render: (text, object, index) => (
        <>
          <Switch
            key={index}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={object.isActive}
            onChange={async () => {
              try {
                let headersList = {
                  Accept: "*/*",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                  "Content-Type": "application/json",
                };
                let bodyContent = JSON.stringify({
                  isActive: !object.isActive,
                  id: object._id,
                });
                let reqOptions = {
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/clientstatus`,
                  method: "POST",
                  headers: headersList,
                  data: bodyContent,
                };
                let response = await axios.request(reqOptions);
                if (response.data.status === 1) {
                  allclints();
                  toast.success(response.data.message);
                }
              } catch (error) {
                handleTokenErrors(error);
                toast.error(error?.response?.data?.originalError);
              }
            }}
          />
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, object, index) => (
        <>
          <div
            className="dropdown-item"
            type="button"
            onClick={async () => {
              try {
                let headersList = {
                  Accept: "*/*",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                };
                let reqOptions = {
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/client/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };
                let response = await axios.request(reqOptions);
                if (response.data.status === 1) {
                  toast.success(response.data.message);
                  allclints();
                }
              } catch (error) {
                handleTokenErrors(error);
                // toast.error(
                //   error.response.data.originalError || error.response.data.error
                // );
              }
            }}
          >
            <i className="dw dw-delete-3" /> Delete
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0"> Client Master</h2>
          </div>
          <div className="pb-4">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <Button
                  data-toggle="modal"
                  data-target="#bd-example-modal-lg"
                  type="primary"
                >
                  {" "}
                  Add New Client
                  <i className="icon-copy bi bi-plus-circle mx-2" />
                </Button>
              </div>
            </div>
          </div>

          <Table columns={columns} dataSource={Allclints} />
        </div>
      </div>

      <div className="col-md-4 col-sm-12 mb-30">
        <div className="pd-20 height-100-p">
          <div
            className="modal fade bs-example-modal-lg"
            id="bd-example-modal-lg"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myLargeModalLabel">
                    Client Manage
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <form className="">
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>
                          Sort Order <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="sortOrder"
                          className="form-control"
                          onChange={(e) => handalchange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>
                          Client Image<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
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
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="custom-control custom-checkbox mb-5">
                            <input
                              type="checkbox"
                              name="isActive"
                              className="custom-control-input my-5"
                              id="customCheck3"
                              onChange={(e) => handalchange(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck3"
                            >
                              Is Active
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    className="btn btn-primary"
                    onClick={async () => {
                      try {
                        let headersList = {
                          Accept: "*/*",
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        };
                        let formdata = new FormData();
                        formdata.append(
                          "sortOrder",
                          data?.sortOrder ? data?.sortOrder : ""
                        );
                        formdata.append("isActive", data?.isActive);
                        formdata.append("client_image", data?.BannerImage);

                        let bodyContent = formdata;

                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/admin/client`,
                          method: "POST",
                          headers: headersList,
                          data: bodyContent,
                        };
                        let response = await axios.request(reqOptions);
                        toast.success(response.data.message);
                      } catch (error) {
                        handleTokenErrors(error);
                        toast.error(
                          error?.response?.data?.originalError ||
                            error?.response?.data?.error
                        );
                      }
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
