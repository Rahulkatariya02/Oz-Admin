import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Switch, Table } from "antd";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const GalleryType = () => {
  const [data, setdata] = useState({});
  const [AllGalleryType, setAllGalleryType] = useState([]);
  const [ACTIVEDATA, setACTIVEDATA] = useState({});
  const [type, settype] = useState("ADD");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    GalleryType();
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

  const handalchange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "isActive") {
      setdata({ ...data, [name]: checked });
    } else {
      setdata({ ...data, [name]: value });
    }
  };

  const columns = [
    {
      align: "center",
      title: "Sort Order",
      dataIndex: "sortOrder",
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      align: "center",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a?.title.localeCompare(b?.title),
    },
    {
      align: "center",
      title: "Is Active	",
      dataIndex: "isActive",
      render: (object, index) => (
        <React.Fragment key={index}>
          <Switch
            key={index}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={object?.isActive}
            onChange={async () => {
              let headersList = {
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              };
              let bodyContent = JSON.stringify({
                isActive: !object?.isActive,
                id: object._id,
              });
              let reqOptions = {
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/gallerystatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
              GalleryType();
            }}
          />
        </React.Fragment>
      ),
    },
    {
      align: "center",
      title: "Action",
      dataIndex: "Action",
      render: (object, index) => (
        <React.Fragment key={index}>
          <span
            className="mx-2"
            data-toggle="modal"
            data-target="#bd-example-modal-lg"
            type="button"
            onClick={() => {
              settype("Edit");
              setACTIVEDATA(object);
            }}
          >
            <i className="dw dw-edit2" />
          </span>
          <span
            className=""
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
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/gallery/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };

                let response = await axios.request(reqOptions);
                toast.success(response.data.message);
                GalleryType();
              } catch (error) {
                handleTokenErrors(error);
                toast.error(error.response.data.originalError);
              }
            }}
          >
            <i className="dw dw-delete-3 fa-lg text-danger" />
          </span>
        </React.Fragment>
      ),
    },
  ];
  // let data12 = AllGalleryType.sort((a, b) => b.sortOrder - a.sortOrder);
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0"> Gallery Type</h2>
          </div>
          <div className="pb-4">
            <div className="">
              <Button
                className="mb-3"
                data-toggle="modal"
                data-target="#bd-example-modal-lg"
                type="primary"
                style={{ float: "inline-end" }}
                size="large"
                onClick={() => {
                  setACTIVEDATA("");
                }}
              >
                <i className="icon-copy fi-plus mx-2" />
                Add Gallery Type
              </Button>
            </div>
          </div>
          <Table columns={columns} dataSource={AllGalleryType} />
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
                    Gallery Type Manage
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
                            defaultValue={
                              ACTIVEDATA
                                ? ACTIVEDATA.sortOrder
                                : AllGalleryType.length + 1
                            }
                            className="form-control"
                            name="sortOrder"
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
                            name="Title"
                            className="form-control"
                            defaultValue={ACTIVEDATA?.title}
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
                              defaultChecked={
                                isActive || ACTIVEDATA?.isActive === true
                              }
                              onChange={(e) => setIsActive(e.target.checked)}
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
                          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        };
                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/admin/gallery`,
                          method: "POST",
                          headers: headersList,
                          data: {
                            id: ACTIVEDATA._id,
                            isActive: isActive,
                            sortOrder: data.sortOrder,
                            title: ACTIVEDATA?.title ? ACTIVEDATA?.title : data?.title,
                          },
                        };

                        let response = await axios.request(reqOptions);
                        if (response.data.status === 1) {
                          toast.success(response.data.message);
                          GalleryType();
                        }
                      } catch (error) {
                        handleTokenErrors(error);
                        toast.error(error?.response?.data?.originalError);
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

export default GalleryType;
