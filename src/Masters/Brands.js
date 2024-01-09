import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Spin, Switch, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Brands = () => {
  const [data, setdata] = useState({});
  const [Brandsdata1, setBrandsdata1] = useState([]);
  useEffect(() => {
    Brandsdata();
  }, []);
  const Brandsdata = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/brandall`,
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setBrandsdata1(response.data);
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };
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
  const columns = [
    {
      title: "sortOrder",
      dataIndex: "sortOrder",
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: "title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Image",
      dataIndex: "Image",
      sorter: (a, b) => a.brand_image.localeCompare(b.brand_image),
      render: (text, object, index) => (
        <>
          <img src={object.brand_image} alt="slider-img" width={150} />
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
              let headersList = {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              };
              let bodyContent = JSON.stringify({
                isActive: !object.isActive,
                id: object._id,
              });
              let reqOptions = {
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/brandstatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
              Brandsdata();
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
            to="#"
            onClick={async () => {
              try {
                let headersList = {
                  Accept: "*/*",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                };
                let reqOptions = {
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/brand/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };

                let response = await axios.request(reqOptions);
                toast.success(response.data.message);
                Brandsdata();
              } catch (error) {
                toast.error(error.response.data.originalError);
              }
            }}
          >
            <i className="dw dw-delete-3" /> Delete
          </div>
        </>
      ),
    },
  ];
  let data12 = Brandsdata1.document?.sort((a, b) => b.sortOrder - a.sortOrder);
  console.log(data12?.length > 0 ? data12[0].sortOrder : 0);
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0"> Brand Master</h2>
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
                  Brand Master
                  <i className="icon-copy bi bi-plus-circle mx-2" />
                </Button>
              </div>
            </div>
          </div>
          <Table columns={columns} dataSource={Brandsdata1.document} />
        </div>
      </div>
      {/* modal */}
      <div div className="col-md-4 col-sm-12 mb-30">
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
                    Brand Manage
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
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Sort Order <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            value={
                              data.sortOrder
                                ? data.sortOrder
                                : data12?.length > 0
                                ? data12[0].sortOrder + 1
                                : 0
                            }
                            className="form-control"
                            name="SortOrder"
                            onChange={(e) => handalchange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Title"
                            onChange={(e) => handalchange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Special Image<span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="BannerImage"
                            onChange={(e) => handalchange(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="custom-control custom-checkbox mb-5">
                            <input
                              type="checkbox"
                              className="custom-control-input my-5"
                              id="customCheck3"
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
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={async () => {
                      try {
                        let headersList = {
                          Accept: "*/*",
                          "User-Agent":
                            "Thunder Client (https://www.thunderclient.com)",
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        };
                        let formdata = new FormData();
                        formdata.append(
                          "sortOrder",
                            data.sortOrder
                              ? data.sortOrder
                              : data12?.length > 0
                              ? data12[0].sortOrder + 1
                              : 0
                        );
                        formdata.append("title", data?.Title);
                        formdata.append("isActive", data?.isActive);
                        formdata.append("brand_image", data?.BannerImage);

                        let bodyContent = formdata;
                        console.log(data);
                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/admin/brand`,
                          method: "POST",
                          headers: headersList,
                          data: bodyContent,
                        };

                        let response = await axios.request(reqOptions);
                        if (response.data.status === 1) {
                          Brandsdata();
                          toast.success(response.data.message);
                        }
                      } catch (error) {
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

export default Brands;
