import DataTable from "datatables.net-dt";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Package = () => {
  const [allPackage, setAllPackage] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // new DataTable("#myTable");
    AllPackage();
  }, []);
  const AllPackage = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/packageall`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setAllPackage(response.data.document);
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Packages</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 text-right">
              <Link to="/package-form">
                <Button className="text-white h4 btn btn-outline-primary">
                  <i className="icon-copy fi-plus mx-2" />
                  Add Package
                </Button>
              </Link>
            </div>
            <div className="pb-20 pd-20 table-responsive">
              <table
                className="data-table table stripe hover nowrap text-center"
                id="myTable"
              >
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: "25%" }}>Title</th>
                    <th>Type</th>
                    <th>Is Active</th>
                    <th className="datatable-nosort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allPackage.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.title}</td>
                        <td>
                          <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={e.isActive}
                            onChange={async () => {
                              let headersList = {
                                Accept: "*/*",
                                Authorization: `Bearer ${localStorage.getItem(
                                  "accessToken"
                                )}`,
                                "Content-Type": "application/json",
                              };
                              let bodyContent = {
                                isActive: !e.isActive,
                                id: e._id,
                              };

                              let reqOptions = {
                                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/packagestatus`,
                                method: "POST",
                                headers: headersList,
                                data: bodyContent,
                              };

                              let response = await axios.request(reqOptions);
                              toast.success(response.data.message);
                              AllPackage();
                            }}
                          />
                        </td>
                        <td>
                          <div className="dropdown">
                            <Link
                              className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
                              to="#"
                              role="button"
                              data-toggle="dropdown"
                            >
                              <i className="dw dw-more" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                              <div
                                className="dropdown-item"
                                type="button"
                                onClick={async () => {
                                  navigate("/package-form", {
                                    state: { data: e, type: "View" },
                                  });
                                }}
                              >
                                <i className="dw dw-eye" /> View
                              </div>
                              <div
                                className="dropdown-item"
                                type="button"
                                onClick={async () => {
                                  navigate("/package-form", {
                                    state: {
                                      data: { ...e, id: e._id },
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
                                      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/package/${e._id}`,
                                      method: "DELETE",
                                      headers: headersList,
                                    };

                                    let response = await axios.request(
                                      reqOptions
                                    );
                                    toast.success(response.data.message);
                                    AllPackage();
                                  } catch (error) {
                                    handleTokenErrors(error);
                                    toast.error(
                                      error.response.data.originalError
                                    );
                                  }
                                }}
                              >
                                <i className="dw dw-delete-3" /> Delete
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Package;
