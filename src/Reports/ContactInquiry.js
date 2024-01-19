import axios from "axios";
import DataTable from "datatables.net-dt";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ContactInquiry = () => {
  const navigate= useNavigate();
  const [Contactinquirydata1, setContactinquirydata] = useState([]);

  useEffect(() => {
    contactinquirydata();
  }, []);

  const contactinquirydata = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/contactinquary`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setContactinquirydata(response.data.document);
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Contact Inquiry List</h2>
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
                        <th>Person Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Postal Code</th>
                        <th className="datatable-nosort">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Contactinquirydata1.map((e, i) => {
                        return (
                          <tr key={i}>
                            {/* <td>{e.createdAt}</td> */}
                            <td>{new Date(e.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit', 
                              day: '2-digit',   
                            })}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.mobile_no}</td>
                            <td>{e.postalCode}</td>
                            <td>
                              <span
                                className="mx-2 fa-lg"
                                onClick={async () => {
                                  try {
                                    let headersList = {
                                      Accept: "*/*",
                                      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                      "Content-Type": "application/json",
                                    };
                                    let reqOptions = {
                                      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/contactinquary/${e._id}`,
                                      method: "DELETE",
                                      headers: headersList,
                                    };

                                    let response = await axios.request(
                                      reqOptions
                                    );
                                    if (response.data.status === 1) {
                                      toast.success(response.data.message);
                                      contactinquirydata();
                                    }
                                  } catch (error) {
                                    toast.success(error);
                                  }
                                }}
                              >
                                <i className="dw dw-delete-3 text-danger" />
                              </span>
                              <span className="fa-lg"  
                               onClick={() => {
                                navigate("/contactdetails", {
                                  state: {
                                    data: { ...e, id: e._id },
                                    type: "Edit",
                                  },
                                });
                              }}><i className="dw dw-edit2" /></span>
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

export default ContactInquiry;
