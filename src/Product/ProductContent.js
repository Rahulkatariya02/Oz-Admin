import DataTable from "datatables.net-dt";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductContentForm from "./ProductContentForm";
import axios from "axios";
import { toast } from "react-toastify";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const ProductContent = ({ data123, type }) => {
const navigate =useNavigate()
  const [productcontent, setproductcontent] = useState([]);
  const [activedata, setactivedata] = useState([]);
   const [data, setdata] = useState(!data123 ? {} : data123);

  useEffect(() => {
    getproductcontent();
  }, []);

  const getproductcontent = async () => {
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/getproductcontent/${data._id}`,
      method: "GET",
    };
    let response = await axios.request(reqOptions);
    setproductcontent(response.data.data);
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {showForm ? (
        <ProductContentForm
          data123={data}
          showForm={showForm}
          activedata={activedata}
          type={type}
          setShowForm={setShowForm}
        />
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
            <table className="data-table table stripe hover nowrap">
              <thead>
                <tr>
                  <th> Sort Order</th>
                  <th>Is Active</th>
                  <th>Image</th>
                  <th className="datatable-nosort">Action</th>
                </tr>
              </thead>
              <tbody>
                {productcontent?.map((e, i) => {
                  if (data123._id === e.product_id) {
                    return (
                      <tr key={i}>
                        <td>{e.sortOrder}</td>
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
                                id:e._id
                              };                            
                              let reqOptions = {
                                url: `${process.env.REACT_APP_API_BASE_URL}api/productcontentstatus`,
                                method: "POST",
                                headers: headersList,
                                data: bodyContent,
                              };

                              let response = await axios.request(reqOptions);
                              toast.success(response.data.message);
                              getproductcontent();
                            }}
                          />                         
                        </td>
                        <td>
                          <img
                            src={
                              process.env.REACT_APP_API_BASE_URL +
                              e.product_img
                            }
                            className="img-fluid"
                            width={100}
                          />
                        </td>
                        <td className="d-flex">
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
                                  url: `${process.env.REACT_APP_API_BASE_URL}api/subcategoryproduct/removeProduct/${e._id}`,
                                  method: "DELETE",
                                  headers: headersList,
                                };

                                let response = await axios.request(reqOptions);
                                toast.success(response.data.message);
                                getproductcontent();
                              } catch (error) {
                                toast.error(error.response.data.originalError);
                              }
                            }}
                          >
                            <i className="dw dw-delete-3" /> 
                          </span>
                          <span
                            className=""
                            type="button"
                            onClick={() => {
                              toggleForm();                           
                              setactivedata(e);
                            }}                         
                           
                          >
                            <i className="dw dw-edit2 mx-2" />
                           
                          </span>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductContent;
