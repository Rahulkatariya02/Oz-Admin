import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EmailConfiguration = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    var data1 = data;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/admin/emailconfiguration`,
        {
          website_name: data1.WebsiteName,
          domain_name: data1.DomainName,
          support_email: data1.SupportEmail,
          support_contactNo: data1.SupportContactNo,
          email_from: data1.EmailFrom,
          bcc_email: data1.BCCEmail,
          multiple_bcc_email: data1.MultipleBCCEmail,
          smtp_server: data1.SMTPServer,
          smtp_auth_email: data1.SMTPAuthEmail,
          smtp_auth_password: data1.SMTPAuthPassword,
          smtp_port: data1.SMTPPort,
          smtp_enabale_ssl: data1.SMTPEnableSSL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.status === 1) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.originalError);
    }
  };

  return (
    <>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Website Name</label>
                <input
                  type="text"
                  name="WebsiteName"
                  className={`form-control ${
                    errors.WebsiteName ? "is-invalid" : ""
                  }`}
                  {...register("WebsiteName", {
                    required: true,
                  })}
                />
                {errors.WebsiteName && (
                  <small className="text-danger">
                    Please enter a websitename
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Domain Name</label>
                <input
                  type="text"
                  name="DomainName"
                  className={`form-control ${
                    errors.DomainName ? "is-invalid" : ""
                  }`}
                  {...register("DomainName", {
                    required: true,
                  })}
                />
                {errors.DomainName && (
                  <small className="text-danger">
                    Please enter a domainname
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Support Email<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="SupportEmail"
                  className={`form-control ${
                    errors.SupportEmail ? "is-invalid" : ""
                  }`}
                  {...register("SupportEmail", {
                    required: true,
                  })}
                />
                {errors.SupportEmail && (
                  <small className="text-danger">
                    Please enter a supportemail
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Support Contact No<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="SupportContactNo"
                  className={`form-control ${
                    errors.SupportContactNo ? "is-invalid" : ""
                  }`}
                  {...register("SupportContactNo", {
                    required: true,
                  })}
                />
                {errors.SupportContactNo && (
                  <small className="text-danger">
                    Please enter a supportcontactno
                  </small>
                )}
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Email From</label>
                <input
                  type="text"
                  name="EmailFrom"
                  className={`form-control ${
                    errors.EmailFrom ? "is-invalid" : ""
                  }`}
                  {...register("EmailFrom", {
                    required: true,
                  })}
                />{" "}
                {errors.EmailFrom && (
                  <small className="text-danger">Please enter a email</small>
                )}
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                {/* <label>Email From</label>
                                <input type="text" className="form-control" /> */}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>BCC Email</label>
                <input
                  type="text"
                  name="BCCEmail"
                  className={`form-control ${
                    errors.BCCEmail ? "is-invalid" : ""
                  }`}
                  {...register("BCCEmail", {
                    required: true,
                  })}
                />{" "}
                {errors.BCCEmail && (
                  <small className="text-danger">
                    Please enter a bcc email
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Multiple BCC Email</label>
                <input
                  type="text"
                  name="MultipleBCCEmail"
                  className={`form-control ${
                    errors.MultipleBCCEmail ? "is-invalid" : ""
                  }`}
                  {...register("MultipleBCCEmail", {
                    required: true,
                  })}
                />
                {errors.MultipleBCCEmail && (
                  <small className="text-danger">
                    Please enter a multiplebccemail
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>SMTP Server</label>
                <input
                  type="text"
                  name="SMTPServer"
                  className={`form-control ${
                    errors.SMTPServer ? "is-invalid" : ""
                  }`}
                  {...register("SMTPServer", {
                    required: true,
                  })}
                />{" "}
                {errors.SMTPServer && (
                  <small className="text-danger">
                    Please enter a SMTPServer
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>SMTP Auth Email</label>
                <input
                  type="text"
                  name="SMTPAuthEmail"
                  className={`form-control ${
                    errors.SMTPAuthEmail ? "is-invalid" : ""
                  }`}
                  {...register("SMTPAuthEmail", {
                    required: true,
                  })}
                />
                {errors.SMTPAuthEmail && (
                  <small className="text-danger">
                    Please enter a SMTPAuthEmail
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>SMTP Auth Password</label>
                <input
                  type="text"
                  name="SMTPAuthPassword"
                  className={`form-control ${
                    errors.SMTPAuthPassword ? "is-invalid" : ""
                  }`}
                  {...register("SMTPAuthPassword", {
                    required: true,
                  })}
                />
                {errors.SMTPAuthPassword && (
                  <small className="text-danger">
                    Please enter a SMTPAuthPassword
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>SMTP Port</label>
                <input
                  type="text"
                  name="SMTPPort"
                  className={`form-control ${
                    errors.SMTPPort ? "is-invalid" : ""
                  }`}
                  {...register("SMTPPort", {
                    required: true,
                  })}
                />
                {errors.SMTPPort && (
                  <small className="text-danger">Please enter a SMTPPort</small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>SMTP Enable SSL</label>
                <input
                  type="text"
                  name="SMTPEnableSSL"
                  className={`form-control ${
                    errors.SMTPEnableSSL ? "is-invalid" : ""
                  }`}
                  {...register("SMTPEnableSSL", {
                    required: true,
                  })}
                />
                {errors.SMTPEnableSSL && (
                  <small className="text-danger">
                    Please enter a SMTPEnableSSL
                  </small>
                )}
              </div>
            </div>
            <div className="modal-footer col-md-12 mt-4">
              <Button className=" btn-outline-secondary btn-light mx-2">
                Back
              </Button>
              <Button className="" type="submit">
                Save Changes{" "}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailConfiguration;
