import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import axios from "axios";
import DataTable from "datatables.net-dt";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Category = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState([]);
  const [categoryId, setcategoryId] = useState([]);
  useEffect(() => {
    getcatagarydata();
  }, []);
  const getcatagarydata = async () => {
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/getcategory`,
      method: "POST",
    };

    let response = await axios.request(reqOptions);
    setcategory(response.data.data);
  };

  const handleSubcat = (item) => {
    navigate(`/subcategory/${item.category?._id}`, {
      state: { item, _id: item._id },
    });
  };

  const handleOpen = (item) => {
    navigate(`/productmasterlist`, { state: { item, _id: item._id } });
  };

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Category</h2>
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
                className="table stripe hover nowrap text-center"
                id="myTable"
              >
                <thead className="bg-light">
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
                        <td>{e.category.sortOrder}</td>
                        <td>{e.category.category}</td>
                        <td>
                          <span onClick={() => handleSubcat(e)}>
                            <span className="badge badge-pill badge-primary w-25">
                              {e.subcategoryCount}
                            </span>
                          </span>
                        </td>

                        <td>
                          <div onClick={() => handleOpen(e.category._id)}>
                            <span className="badge badge-pill badge-primary w-25">
                              {e.productCount}
                            </span>
                          </div>
                        </td>
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
                                id: e.category._id,
                              };
                              let reqOptions = {
                                url: `${process.env.REACT_APP_API_BASE_URL}api/category/changeStatus`,
                                method: "PUT",
                                headers: headersList,
                                data: bodyContent,
                              };

                              let response = await axios.request(reqOptions);
                              toast.success(response.data.message);
                              getcatagarydata();
                            }}
                          />
                        </td>
                        <td>
                          <span
                            className="mx-2"
                            type="button"
                            onClick={async () => {
                              try {
                                // if (e.products === 0)
                                {
                                  let headersList = {
                                    Accept: "*/*",
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "accessToken"
                                    )}`,
                                  };
                                  let reqOptions = {
                                    url: `${process.env.REACT_APP_API_BASE_URL}api/category/${e.category._id}`,
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
                                }
                                //  else {
                                //   toast.warning("Please delete all products");
                                // }
                              } catch (error) {
                                handleTokenErrors(error);
                                toast.error(error?.response?.data?.error);
                              }
                            }}
                          >
                            <i className="dw dw-delete-3 text-danger fa-lg" />
                          </span>
                          <span
                            className=""
                            type="button"
                            onClick={() => {
                              navigate("/categorymastermanage", {
                                state: {
                                  data: { ...e, id: e._id },
                                  type: "Edit",
                                },
                              });
                            }}
                          >
                            <i className="dw dw-edit2 fa-lg" />
                          </span>
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
