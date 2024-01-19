import DataTable from "datatables.net-dt";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductFileForm from "./ProductFileForm";
import axios from "axios";
import { toast } from "react-toastify";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const ProductFile = ({ data123, type }) => {
  useEffect(() => {
    ProductFiledata();
  }, []);

  const [ProductFiledata1, setProductFiledata] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activedata, setactivedata] = useState([]);
  console.log("activedata", activedata);
  const [data, setdata] = useState(!data123 ? {} : data123);
  const ProductFiledata = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/getproductfile/${data123._id}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    console.log('response', response);
    setProductFiledata(response.data.data);
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  console.log('ProductFiledata1', ProductFiledata1);
  return (
    <>
      {showForm ? (
        <ProductFileForm
          data123={ProductFiledata1}
          showForm={showForm}
          activedata={activedata}
          type={type}
          setShowForm={setShowForm} />
      ) : (
        <div className="card-box mb-30">
          <div className="pd-20">
            <Button
              className="text-white h4 btn btn-outline-primary"
              onClick={toggleForm}
            >
              <i className="icon-copy fi-plus mx-2" />
              Add New Product
            </Button>
          </div>
          <div className="pb-20 pd-20 table-responsive">
            <table
              className="data-table table stripe hover nowrap"
              id="myTable"
            >
              <thead>
                <tr>
                  <th> Sort Order</th>
                  <th>Title</th>
                  <th>Is Active</th>
                  <th className="datatable-nosort">Action</th>
                </tr>
              </thead>
              <tbody>
                {ProductFiledata1?.map((e, i) => {
                  // if (data123._id === e.products_id) {
                  console.log('data123', e);
                  return (
                    <tr key={i}>
                      <td>{e.sortOrder}</td>
                      <td>{e.title}</td>
                      <td>
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          checked={e.isActive}
                          onChange={async () => {
                            let bodyContent = {
                              isActive: !e.isActive,
                            };
                            console.log(e.isActive);
                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/ProductFile/changeStatus/${e._id}`,
                              method: "POST",
                              data: bodyContent,
                            };

                            let response = await axios.request(reqOptions);
                            toast.success(response.data.message);
                            ProductFiledata();
                          }}
                        />
                        {/* <div className="custom-control custom-switch">
                            <label class="switch">
                              <input
                                type="checkbox"
                                checked={e.isActive}
                                onChange={async () => {
                                  let bodyContent = {
                                    isActive: !e.isActive,
                                  };
                                  console.log(e.isActive);
                                  let reqOptions = {
                                    url: `${process.env.REACT_APP_API_BASE_URL}api/ProductFile/changeStatus/${e._id}`,
                                    method: "POST",
                                    data: bodyContent,
                                  };

                                  let response = await axios.request(
                                    reqOptions
                                  );
                                  toast.success(response.data.message);
                                  ProductFiledata();
                                }}
                              />
                              <span class="slider"></span>
                            </label>
                          </div> */}
                      </td>
                      <td>
                        <div
                          className="dropdown-item"
                          type="button"
                          onClick={async () => {
                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/ProductFile/productfileremove/${e._id}`,
                              method: "GET",
                            };

                            let response = await axios.request(reqOptions);
                            toast.success(response.data.message);
                            ProductFiledata();
                          }}
                        >
                          <i className="dw dw-delete-3" /> Delete
                        </div>
                        <div
                          className="dropdown-item "
                          // onClick={toggleForm}
                          style={{ width: 120 }}
                          onClick={() => {
                            toggleForm();
                            console.log(e);
                            setactivedata(e);
                          }}

                        // onClick={() => {
                        //   navigate("/categorymastermanage", {
                        //     state: {
                        //       data: { ...e, id: e._id },
                        //       type: "Edit",
                        //     },
                        //   });
                        // }}


                        >
                          <i className="dw dw-edit2 mx-2" />
                          Edit
                        </div>
                      </td>
                    </tr>
                  );
                  // }
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFile;
