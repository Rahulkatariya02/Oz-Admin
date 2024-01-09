import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Subcategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setcategory] = useState([]);
  useEffect(() => {
    getcatagarydata();
  }, []);
  const getcatagarydata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/subcategory/getsubcategories`,
        method: "GET",
      };

      let response = await axios.request(reqOptions);
      console.log(response.data.data);
      let data = response.data.data.filter((e) => {
        return e.category === location.pathname.split("/")[2];
      });
      setcategory(data);
    } catch (error) {}
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
              <Link
                to={`/subcategorymastermanage/${
                  location.pathname.split("/")[2]
                }`}
              >
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
                <thead className="bg-light"> 
                  <tr>
                    <th>Sort Order</th>
                    <th>Name</th>
                    <th>Products </th>
                    <th>Is Active</th>
                    <th className="datatable-nosort">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.sortOrder}</td>
                        <td>{e.description}</td>
                        <td>
                          <span 
                          className="text-danger"
                            onClick={() => {
                              navigate("/subproductmasterlist", {
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
                          </span>
                        </td>
                        <td>
                          <div className="custom-control custom-switch">
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
                          </div>
                        </td>
                        <td>
                          <div
                            className="dropdown-item"
                            onClick={async () => {
                              try {
                                let headersList = {
                                  Accept: "*/*",
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "accessToken"
                                  )}`,
                                };
                                let reqOptions = {
                                  url: `${process.env.REACT_APP_API_BASE_URL}api/subcategory/removeSubCategory/${e._id}`,
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

export default Subcategory;
