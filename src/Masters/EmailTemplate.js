import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EmailTemplate = () => {
  const [activetemp, setactivetemp] = useState("");
  const [document, setdocument] = useState([]);
  useEffect(() => {
    getmaildata();
  }, []);
  const getmaildata = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/emailtemplate`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setdocument(response.data.document[0]);
  };
  console.log(document);
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Email Template Manage</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 ">
              <form className="">
                <div className="row mb-4">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="validationCustom01" className="form-label">
                      Email Template Name{" "}
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setactivetemp(e.target.value);
                      }}
                    >
                      <option selected disabled value="">
                        -- Select --
                      </option>
                      <option value="InquiryToUser">InquiryToUser</option>
                      <option value="PackageInquiryToUser">
                        PackageInquiryToUser
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-4 mx-4">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexCheckDefault"
                    >
                      Is Active
                    </label>
                  </div>
                  <div className="col-md-12 mb-4 ">
                    <label htmlFor="validationCustom01" className="form-label">
                      Email Template Content
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      value={document[activetemp]}
                      onChange={(e) => {
                        // document[activetemp] === e.target.value;
                        // console.log(e.target.value);
                        setdocument((data) => {
                          return { ...data, [activetemp]: e.target.value };
                        });
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <Button
                    disabled={!activetemp}
                    className=""
                    onClick={async () => {
                      try {
                        let headersList = {
                          Accept: "*/*",
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        };

                        let reqOptions = {
                          url: `${process.env.REACT_APP_API_BASE_URL}api/admin/emailtemplate`,
                          method: "POST",
                          headers: headersList,
                          data: document,
                        };

                        let response = await axios.request(reqOptions);
                        getmaildata();
                        toast.success(response.data.message);
                      } catch (error) {
                        toast.error(error.response.data.originalError);
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: document[activetemp] }} />
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
