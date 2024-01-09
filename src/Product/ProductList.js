import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import axios from "axios";
import DataTable from "datatables.net-dt";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState(
    !location?.state?.data ? {} : location?.state?.data
  );
  const [category, setcategory] = useState([]);
  useEffect(() => {
    // new DataTable("#myTable");
    getcatagarydata();
  }, []);
  const getcatagarydata = async () => {
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/subcategoryproduct/fetchAllProducts`,
      method: "GET",
    };

    let response = await axios.request(reqOptions);
    setcategory(response.data.data);
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0"> Product List</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 d-flex justify-content-between">
              <Button
                className="text-white h4 btn btn-outline-primary"
                onClick={() =>
                  navigate("/productmanage", {
                    state: {
                      data: { ...data, id: data?._id },
                      type: "View",
                    },
                  })
                }
              >
                <i className="icon-copy fi-plus mx-2" />
                Add New Product
              </Button>

              <Button
                className=" btn-outline-secondary btn-light h4 mx-2"
                onClick={() => navigate("/categorymasterlist")}
              >
                <i
                  className="icon-copy fa fa-arrow-left mx-2"
                  aria-hidden="true"
                />
                Go To Category List
              </Button>
            </div>
            <div className="pb-20 pd-20 table-responsive">
              <table
                className="data-table table stripe hover nowrap"
                id="myTable"
              >
                <thead>
                  <tr>
                    <th>#r</th>
                    <th>Product Name</th>
                    <th>Product Code</th>
                    <th>Is Active</th>
                    <th className="datatable-nosort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((e, i) => {
                    if (e.category_id === data._id) {
                      return (
                        <tr key={i}>
                          <td>{e.sortOrder}</td>
                          <td>{e.productName}</td>
                          <td>{e.ProductCode}</td>
                          <td>
                            <Switch
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                              checked={e.isActive}
                            />
                            {/* <div className="custom-control custom-switch">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customSwitch1"
                                checked={e.isActive}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customSwitch1"
                              ></label>
                            </div> */}
                          </td>
                          <td>
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
                                  className="dropdown-item"
                                  onClick={() => {
                                    navigate("/editproduct", {
                                      state: {
                                        data: { ...e, id: e._id },
                                        type: "View",
                                      },
                                    });
                                  }}
                                >
                                  <i className="dw dw-eye" /> View
                                </div>
                                <div
                                  className="dropdown-item"
                                  onClick={() => {
                                    navigate("/editproduct", {
                                      state: {
                                        data: { ...e, id: e._id },
                                        type: "Edit",
                                      },
                                    });
                                  }}
                                >
                                  <i className="dw dw-edit2" /> Edit
                                </div>
                                <div className="dropdown-item">
                                  <i className="dw dw-delete-3" /> Delete
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
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

export default ProductList;
