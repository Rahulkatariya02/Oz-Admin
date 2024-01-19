import axios from "axios";
import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Spin, Switch, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Testimonial = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Testimonialdata();
  }, []);
  const Testimonialdata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/testimonialall`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      // Handle the successful response here
      setdata(response.data.document);
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const columns = [
    {
      align: "center",
      title: "Testimonial Name",
      dataIndex: "name",
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
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/testimonialstatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
              Testimonialdata();
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
            className="mx-2"
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
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/testimonial/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };

                let response = await axios.request(reqOptions);
                toast.success(response.data.message);
                Testimonialdata();
              } catch (error) {
                toast.error(error.response.data.originalError);
              }
            }}
          >
            <i className="dw dw-delete-3 fa-lg text-danger" />
          </span>
          <span
            className=""
            type="button"
            onClick={async () => {
              navigate("/testimonialmastermanage", {
                state: {
                  data: { ...object, id: object._id },
                  type: "Edit",
                },
              });
            }}
          >
            <i className="dw dw-edit2 fa-lg" />
          </span>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Testimonial List</h2>
          </div>
          <div className="pb-4">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <Link to="/testimonialmastermanage">
                  <Button type="primary" size="large"   style={{'float': 'inline-end'}}>
                    Add New Testimonial
                    <i className="icon-copy bi bi-plus-circle mx-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <Table columns={columns} dataSource={data} className="text-center" />
        </div>
      </div>
    </>
  );
};

export default Testimonial;
