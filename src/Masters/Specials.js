import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Spin, Switch, Table } from "antd";
import { toast } from "react-toastify";

const Specials = () => {
  const [data, setdata] = useState({
    sortOrder: "",
    Title: "",
    SpecialImage: null,
    isActive: false,
  });
  const [Allspecia, setAllspecia] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    specialall();
  }, []);
  const specialall = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/specialall`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setAllspecia(response?.data?.document);
  };
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
  const validateForm = () => {
    const errors = {};

    // Validate Sort Order (must be a positive integer)
    if (!/^\d+$/.test(data.sortOrder)) {
      errors.sortOrder = "Sort Order must be a positive integer.";
    }

    // Validate Title (must not be empty)
    if (!data.Title.trim()) {
      errors.Title = "Title is required.";
    }
    if (!data.SpecialImage) {
      errors.SpecialImage = "SpecialImage is required.";
    }

    // Add more custom validation here for other fields if needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      sorter: (a, b) => a.special_image.localeCompare(b.special_image),
      render: (text, object, index) => (
        <>
          <img src={object.special_image} alt="slider-img" width={150} />
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
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              };
              let bodyContent = JSON.stringify({
                isActive: !object.isActive,
                id: object._id,
              });
              let reqOptions = {
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/specialstatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
              specialall();
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
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/special/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };

                let response = await axios.request(reqOptions);
                toast.success(response.data.message);
                specialall();
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
 
  let data12 = Allspecia?.sort((a, b) => b.sortOrder - a.sortOrder);
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0"> Special Master</h2>
          </div>

          <div className="pb-4">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <Button
                  data-toggle="modal"
                  data-target="#bd-example-modal-lg"
                  type="primary"
                  size="large"
                  style={{'float': 'inline-end'}}
                >
                  Special Master
                  <i className="icon-copy bi bi-plus-circle mx-2" />
                </Button>
              </div>
            </div>
          </div>
          <Table columns={columns} dataSource={Allspecia} />
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
                    Manage Special
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
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>
                          Sort Order <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors.sortOrder ? "is-invalid" : ""
                          }`}
                          name="sortOrder"
                          value={
                            data.sortOrder
                              ? data.sortOrder
                              : data12?.length > 0
                              ? data12[0].sortOrder + 1
                              : 0
                          }
                          onChange={(e) => handalchange(e)}
                        />
                        {formErrors.sortOrder && (
                          <div className="invalid-feedback">
                            {formErrors.sortOrder}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>
                          Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="Title"
                          className={`form-control ${
                            formErrors.Title ? "is-invalid" : ""
                          }`}
                          value={data.Title}
                          onChange={(e) => handalchange(e)}
                        />
                        {formErrors.Title && (
                          <div className="invalid-feedback">
                            {formErrors.Title}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>
                          Special Image<span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          name="SpecialImage"
                          className={`form-control ${
                            formErrors.SpecialImage ? "is-invalid" : ""
                          }`}
                          onChange={(e) => handalchange(e)}
                        />
                        {formErrors.SpecialImage && (
                          <div className="invalid-feedback">
                            {formErrors.SpecialImage}
                          </div>
                        )}
                      </div>
                    </div>
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
                    onClick={async () => {
                      try {
                        const data12 = validateForm();
                        if (data12 === true) {
                          let headersList = {
                            Accept: "*/*",
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                          };
                          let formdata = new FormData();
                          // formdata.append("id", data?.id);
                          formdata.append("sortOrder", data?.sortOrder);
                          formdata.append("isActive", data?.isActive);
                          formdata.append("title", data?.Title);
                          formdata.append("special_image", data?.SpecialImage);

                          let bodyContent = formdata;
                          let reqOptions = {
                            url: `${process.env.REACT_APP_API_BASE_URL}api/admin/special`,
                            method: "POST",
                            headers: headersList,
                            data: bodyContent,
                          };

                          let response = await axios.request(reqOptions);
                          if (response.data.status === 1) {
                            toast.success(response.data.message);
                          }
                        }
                      } catch (error) {
                        toast.error(error?.response?.data?.error);
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

export default Specials;
