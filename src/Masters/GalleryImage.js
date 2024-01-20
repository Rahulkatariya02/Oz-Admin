import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Spin, Switch, Table } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const GalleryImage = () => {
  const [data, setdata] = useState({ Title: "" });
  const [AllGalleryType, setAllGalleryType] = useState([]);
  const [AllGalleryimges, setAllGalleryimges] = useState([]);
  
  useEffect(() => {
    GalleryType();
    Galleryimges();
  }, []);

  const GalleryType = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/galleryall`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setAllGalleryType(response?.data?.document);
  };

  const Galleryimges = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/galleryImageall`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setAllGalleryimges(response?.data?.document);
  };

  const columns = [
    {
      align: "center",
      title: "sortOrder",
      dataIndex: "sortOrder",
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      align: "center",
      title: "title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      align: "center",
      title: "Image",
      dataIndex: "Image",
      sorter: (a, b) => a.gallery_image.localeCompare(b.gallery_image),
      render: (text, object, index) => (
        <>
          <img src={object.gallery_image} alt="slider-img" width={150} />
        </>
      ),
    },
    {
      align: "center",
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
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              };
              let bodyContent = JSON.stringify({
                isActive: !object.isActive,
                id: object._id,
              });
              let reqOptions = {
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/galleryImagestatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
              Galleryimges();
            }}
          />
        </>
      ),
    },
    {
      align: "center",
      title: "Action",
      dataIndex: "Action",
      render: (text, object, index) => (
        <>
          <span
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
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/galleryImage/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };

                let response = await axios.request(reqOptions);
                toast.success(response.data.message);
                Galleryimges();
              } catch (error) {
                toast.error(error.response.data.originalError);
              }
            }}
          >
            <i className="dw dw-delete-3 text-danger fa-lg" />
          </span>
        </>
      ),
    },
  ];

  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name !== "SpecialImage") {
      if (name === "isActive") {
        setdata({ ...data, [name]: checked });
      } else {
        setdata({ ...data, [name]: value });
      }
    } else {
      setdata({ ...data, [name]: files[0] });
    }
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Gallery Master</h2>
          </div>
          <div className="pb-4">
            <div className="">
              <Button
                className="mb-3"
                data-toggle="modal"
                data-target="#bd-example-modal-lg"
                type="primary"
                size="large"
                style={{ 'float': 'inline-end' }}
              >
                <i className="icon-copy fi-plus mx-2" />
                Add new Gallery Type
              </Button>
            </div>
          </div>
          <Table columns={columns} dataSource={AllGalleryimges} />
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
                    Gallery Manage
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
                            type="text"
                            className="form-control"
                            name="sortOrder"
                            // value={data.sortOrder}
                            value={data && data.sortOrder ? data && data.sortOrder : AllGalleryimges.length + 1} 
                            onChange={(e) => handalchange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Title<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="Title"
                            value={data.Title}
                            onChange={(e) => handalchange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Gallery Type<span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            name="GalleryType"
                            onChange={(e) => handalchange(e)}
                          >
                            <option selected disabled value="">
                              -- Select --
                            </option>
                            {AllGalleryType.map((e, i) => {
                              return (
                                <option key={i} value={e._id}>
                                  {e.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                          <label>
                            Description<span className="text-danger">*</span>
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            name="Description"
                            value={data.Description}
                            onChange={(e) => handalchange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Gallery Image<span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="SpecialImage"
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
                  </button>{" "}
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
                        formdata.append("sortOrder", data?.sortOrder);
                        formdata.append("isActive", data?.isActive);
                        formdata.append("gallery", data?.GalleryType);
                        formdata.append("gallery_image", data?.SpecialImage);
                        formdata.append("description", data?.Description);
                        formdata.append("title", data?.Title);

                        let bodyContent = formdata;

                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/admin/galleryImage`,
                          method: "POST",
                          headers: headersList,
                          data: bodyContent,
                        };
                        let response = await axios.request(reqOptions);
                        toast.success(response.data.message);
                        Galleryimges();
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

export default GalleryImage;
