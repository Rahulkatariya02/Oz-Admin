import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import axios from "axios";
import DataTable from "datatables.net-dt";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Category = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState([]);
  useEffect(() => {
    getcatagarydata();
  }, []);
  const getcatagarydata = async () => {
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/category/getAllCategories`,
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
            <h2 className="h3 mb-0">Category List : Root Category</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 text-right">
              <Link to="/categorymastermanage">
                <Button className="text-white h4 btn btn-outline-primary">
                  <i className="icon-copy fi-plus mx-2" />
                  Add New Category
                </Button>
              </Link>
            </div>
            <div className="pb-20 pd-20 table-responsive">
              <table
                className="data-table table stripe hover nowrap"
                id="myTable"
              >
                <thead>
                  <tr>
                    <th>Sort Order</th>
                    <th>Category Name</th>
                    <th>Sub Category</th>
                    <th>Products</th>
                    <th>Is Active</th>
                    <th className="datatable-nosort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.sortOrder}</td>
                        <td>{e.category}</td>
                        <td>
                          <Link to={`/subcategory/${e._id}`}>
                            <span className="badge badge-pill badge-primary w-25">
                              {e.result12}
                            </span>
                          </Link>
                        </td>
                        <td>
                          <div
                            onClick={() => {
                              navigate("/productmasterlist", {
                                state: {
                                  data: { ...e, id: e._id },
                                  type: "View",
                                },
                              });
                            }}
                          >
                            <span className="badge badge-pill badge-primary w-25">
                              {e.products}
                            </span>
                          </div>
                        </td>

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
                          <div
                            className="dropdown-item"
                            onClick={async () => {
                              try {
                                if (e.products === 0) {
                                  let headersList = {
                                    Accept: "*/*",
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "accessToken"
                                    )}`,
                                  };
                                  let reqOptions = {
                                    url: `${process.env.REACT_APP_API_BASE_URL}api/category/removeCategory/${e._id}`,
                                    method: "DELETE",
                                    headers: headersList,
                                  };

                                  let response = await axios.request(
                                    reqOptions
                                  );
                                  if (response.data.status === 1) {
                                    toast.success(response.data.message);
                                    getcatagarydata();
                                  }
                                } else {
                                  toast.warning("please delete all products");
                                }
                              } catch (error) {
                                toast.error(error?.response?.data?.error);
                              }
                            }}
                          >
                            <i className="dw dw-delete-3" /> Delete
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

export default Category;
