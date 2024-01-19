import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Subcategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subcatData = location.state?.item?.category
  const categoryId = subcatData?._id
  console.log('subcatData', subcatData, categoryId);
  const [category, setcategory] = useState([]);
  // const categoryId = location.pathname.split("/")[2]
  console.log('categoryId', categoryId);
  useEffect(() => {
    getcatagarydata();
  }, []);
  const getcatagarydata = async () => {
    try {

      let reqOptions = {
        method: "POST",
        url: `${process.env.REACT_APP_API_BASE_URL}api/getcategory`,
        data: { categoryId }, // Use data to pass parameters in a POST request
      };

      let response = await axios.request(reqOptions);
      console.log('response', response.data.data
      );

      let data = response.data.data.filter((e) => {
        return e.category === location.pathname.split("/")[2];
      });
      setcategory(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('category', category);

  const addSubcat = () => {
    navigate(`/subcategorymastermanage/${categoryId}`, { state: category });
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Category List : Sub Category</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 text-right">
              <span
                onClick={addSubcat}

              >
                <Button className="text-white h4 btn btn-outline-primary">
                  <i className="icon-copy fi-plus mx-2" />
                  Add New Category
                </Button>
              </span>
            </div>
            <div className="pb-20 pd-20 table-responsive">
              <table
                className="data-table table stripe hover nowrap"
                id="myTable"
              >
                <thead className="bg-light">
                  <tr>
                    <th>Sort Order</th>
                    <th>Name</th>
                    <th>Subcategory</th>
                    <th>Products </th>
                    <th>Is Active</th>
                    <th className="datatable-nosort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((e, i) => {
                    console.log('Subcategory', e);
                    return (
                      <tr key={i}>
                        <td>{e.category?.sortOrder}</td>
                        <td>{e.category?.category}</td>
                        <td>
                          <span
                            className="text-danger"
                          // onClick={() => {
                          //   navigate("/subproductmasterlist", {
                          //     state: {
                          //       data: { ...e, id: e._id },
                          //       type: "View",
                          //     },
                          //   });
                          // }}
                          >
                            <span className="badge badge-pill badge-primary w-25">
                              {e.subcategoryCount}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span
                            className="text-danger"
                            onClick={() => {
                              navigate("/subproductmasterlist", {
                                state: {
                                  data: { ...e, id: e.categories?._id },
                                  type: "View",
                                },
                              });
                            }}
                          >
                            <span className="badge badge-pill badge-primary w-25">
                              {e.productCount}
                            </span>
                          </span>
                        </td>
                        <td>
                            <Switch
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                              checked={e.isActive}
                              onChange={async () => {
                                let headersList = {
                                  Accept: "*/*",
                                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                  "Content-Type": "application/json",
                                };
                                let bodyContent = {
                                  isActive: !e.isActive,
                                  id: e.category?._id,
                                };
                                console.log(e.isActive);
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
                                let headersList = {
                                  Accept: "*/*",
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "accessToken"
                                  )}`,
                                };
                                let reqOptions = {
                                  url: `${process.env.REACT_APP_API_BASE_URL}api/category/${e.categories?._id}`,
                                  method: "DELETE",
                                  headers: headersList,
                                };

                                let response = await axios.request(reqOptions);
                                if (response.data.status === 1) {
                                  toast.success(response.data.message);
                                  getcatagarydata();
                                }
                              } catch (error) {
                                toast.error(error?.response?.data?.error);
                              }
                            }}
                          >
                            <i className="dw dw-delete-3 fa-lg text-danger" />
                          </span>
                          <span
                            className=""
                            type="button"
                            onClick={() => {
                              navigate(`/subcategorymastermanage/${e.categories?._id}`, {
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

export default Subcategory;
