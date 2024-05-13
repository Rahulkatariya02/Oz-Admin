import axios from "axios";
import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Switch, Table } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Banners = () => {
  const [banner, setbanner] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    cmsdata();
  }, []);

  const cmsdata = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/banner`,
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      setbanner(response.data);
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
      align: "center",
    },
    {
      title: "Banner Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      align: "center",
    },
    {
      title: "Menu Name",
      dataIndex: "menuName",
      sorter: (a, b) => a.menuName.localeCompare(b.menuName),
      render: (object, index) => (
        <>
          <p key={index}>{object?.menuName?.name}</p>
        </>
      ),
      align: "center",
    },
    {
      title: "Banner Type	",
      dataIndex: "bannerType",
      sorter: (a, b) => a.menuName.localeCompare(b.menuName),
      render: (object, index) => (
        <React.Fragment key={index}>
          {object.bannerType === 1
            ? "Home Slider"
            : object.bannerType === 2
              ? "Box Image"
              : "Default"}
        </React.Fragment>
      ),
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "Image",
      sorter: (a, b) => a.banner_image.localeCompare(b.banner_image),
      render: (object, index) => (
        <React.Fragment key={index}>
          <img
            src={process.env.REACT_APP_API_BASE_URL + object.banner_image}
            alt="slider-img"
            width={100}
          />
        </React.Fragment>
      ),
      align: "center",
    },
    {
      title: "Is Active	",
      dataIndex: "isActive",
      render: (object, index) => (
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
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/bannerstatus`,
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
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (object, index) => (
        <React.Fragment key={index}>
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
                  url: `${process.env.REACT_APP_API_BASE_URL}api/admin/banner/${object._id}`,
                  method: "DELETE",
                  headers: headersList,
                };

                let response = await axios.request(reqOptions);
                toast.success(response.data.message);
                cmsdata();
              } catch (error) {
                toast.error(error.response.data.originalError);
                handleTokenErrors(error);
              }
            }}
          >
            <i className="dw dw-delete-3 text-danger fa-lg" />
          </span>
          <span
            className=""
            type="button"
            onClick={async () => {
              navigate("/banner-master-manage", { state: object });
            }}
          >
            <i className="dw dw-edit2 fa-lg" />
          </span>
        </React.Fragment>
      ),
      align: "center",
    },
  ];
  let data12 = banner?.document?.sort((a, b) => b.sortOrder - a.sortOrder);
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Banners</h2>
          </div>
          <div className="pb-4">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div
                  to="/banner-master-manage"
                  onClick={() => {
                    navigate("/banner-master-manage", {
                      state: {
                        sortOrder:
                          data12?.length > 0 ? data12[0].sortOrder + 1 : 0,
                      },
                    });
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    style={{ float: "inline-end" }}
                  >
                    <i className="icon-copy bi bi-plus-circle mx-2" />
                    Add Banner
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={banner.document}
            className="text-center"
          />
        </div>
      </div>
    </>
  );
};

export default Banners;
