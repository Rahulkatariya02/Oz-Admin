import axios from "axios";
import DataTable from "datatables.net-dt";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

const PackageInquiryList = () => {
  const [PackageInquiryListdata1, setPackageInquiryListdata] = useState([]);
  useEffect(() => {
    PackageInquiryListdata();
  }, []);
  const PackageInquiryListdata = async () => {
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/packagesinquary`,
      method: "GET",
    };

    let response = await axios.request(reqOptions);
    setPackageInquiryListdata(response.data.document);
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Package Inquiry List</h2>
          </div>
          <div className="card-box mb-30 col-md-12">
            <div className="pd-20">
              <div className="row">
                <div className="pb-20 pd-20 table-responsive">
                  <table
                    className="data-table table stripe hover nowrap"
                    id="myTable"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>System Size</th>
                        <th>Person Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Postal Code</th>
                        <th className="datatable-nosort">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PackageInquiryListdata1.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{e.createdAt}</td>
                            <td>{e.SystemSize}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.mobile_no}</td>
                            <td>{e.postalCode}</td>
                            <td>
                              <Link
                                className="dropdown-item"
                                type="button"
                                onClick={async () => {
                                  try {
                                    let headersList = {
                                      Accept: "*/*",
                                      Authorization: `Bearer ${localStorage.getItem(
                                        "accessToken"
                                      )}`,
                                      "Content-Type": "application/json",
                                    };
                                    let reqOptions = {
                                      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/packagesinquary/${e._id}`,
                                      method: "DELETE",
                                      headers: headersList,
                                    };

                                    let response = await axios.request(
                                      reqOptions
                                    );
                                    if (response.data.status === 1) {
                                      toast.success(response.data.message);
                                      PackageInquiryListdata();
                                    }
                                  } catch (error) {
                                    handleTokenErrors(error);
                                    toast.success(error);
                                  }
                                }}
                              >
                                <i className="dw dw-delete-3" />
                              </Link>
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
        </div>
      </div>
    </>
  );
};

export default PackageInquiryList;
