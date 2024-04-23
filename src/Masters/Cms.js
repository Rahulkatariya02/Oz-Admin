import React, { useEffect, useRef, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Spin, Switch, Table } from "antd";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Cms = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cmsdata();
  }, []);

  const cmsdata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/cmsall1`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      // Handle the successful response here
      setdata(response.data);
    } catch (error) {
      // Handle any errors here
      handleTokenErrors(error);
      console.error(error);
    }
  };
  const columns = [
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
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
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/cmsstatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
              cmsdata();
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
          <div className="dropdown">
            <div
              className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
              to="#"
              role="button"
              data-toggle="dropdown"
            >
              <i className="dw dw-more" />
            </div>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <div
                type="button"
                className="dropdown-item"
                onClick={async () => {
                  navigate("/cms-master-manage", {
                    state: { data: object, type: "View" },
                  });
                }}
              >
                <i className="dw dw-eye" /> View
              </div>
              <div
                className="dropdown-item"
                type="button"
                onClick={async () => {
                  navigate("/cms-master-manage", {
                    state: {
                      data: { ...object, id: object._id },
                      type: "Edit",
                    },
                  });
                }}
              >
                <i className="dw dw-edit2" /> Edit
              </div>
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
                      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/cms/${object._id}`,
                      method: "DELETE",
                      headers: headersList,
                    };

                    let response = await axios.request(reqOptions);
                    toast.success(response.data.message);
                    cmsdata();
                  } catch (error) {
                    handleTokenErrors(error);
                    toast.error(error.response.data.originalError);
                  }
                }}
              >
                <i className="dw dw-delete-3" /> Delete
              </div>
            </div>
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
            <h2 className="h3 mb-0">CMS</h2>
          </div>
          <div className="pb-4">
            <div
              onClick={() => {
                navigate("/cms-master-manage", {
                  state: {
                    type: "ADD",
                  },
                });
              }}
            >
              <Button
                className="mb-3"
                type="primary"
                size="large"
                style={{ float: "inline-end" }}
              >
                <i className="icon-copy bi bi-plus-circle mx-2" />
                Add CMS
              </Button>
            </div>
          </div>
          <Table columns={columns} dataSource={data.document} />
        </div>
      </div>
    </>
  );
};

export default Cms;
