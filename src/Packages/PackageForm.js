import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";
import CommonEditor from "../component/CommonEditor";

const PackageForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [data, setdata] = useState(
    !location?.state?.data ? { isActive: true } : location?.state?.data
  );

  const addpackage = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        sortOrder: data.sortOrder,
        packageName: !location?.state?.type ? data.packageName : data.package,
        title: data.title,
        kwText: data.kwText,
        saving_upto_text: data.saving_upto_text,
        savings_upto_amount: data.savings_upto_amount,
        amount: data.amount,
        amount_text: data.amount_text,
        description: data.description,
        isActive: isActive,
        id: data._id,
      });

      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/package`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      if (response.data.status === 1) {
        toast.success(response.data.message);
      }
    } catch (error) {
      handleTokenErrors(error);
      toast.error(error?.response?.data?.error);
    }
  };
  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name !== "products_img1") {
      if (name === "isActive") {
        setdata({ ...data, [name]: checked });
      } else {
        setdata({ ...data, [name]: value });
      }
    } else {
      setdata({ ...data, [name]: files[0] });
    }
  };
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Manage Package</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 ">
              <form className="">
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        Package Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        name="packageName"
                        disabled={location?.state?.type === "View"}
                        onChange={(e) => handalchange(e)}
                      >
                        <option value="">--- Select type ---</option>
                        <option selected={data.package === "Residential"}>
                          Residential
                        </option>
                        <option selected={data.package === "Commercial"}>
                          Commercial{" "}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        Sort Order <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="sortOrder"
                        disabled={location?.state?.type === "View"}
                        value={data?.sortOrder}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        title (Installation Type)
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        disabled={location?.state?.type === "View"}
                        value={data?.title}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        KW Text (eg. 5KW) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="kwText"
                        disabled={location?.state?.type === "View"}
                        value={data?.kwText}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        Savings Upto Amount ($){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="savings_upto_amount"
                        disabled={location?.state?.type === "View"}
                        value={data?.savings_upto_amount}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>Savings Upto Text</label>
                      <input
                        type="text"
                        className="form-control"
                        name="saving_upto_text"
                        disabled={location?.state?.type === "View"}
                        value={data?.saving_upto_text}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        Amount ($) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={data?.amount}
                        disabled={location?.state?.type === "View"}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group">
                      <label>
                        Amount Text <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="amount_text"
                        value={data?.amount_text}
                        disabled={location?.state?.type === "View"}
                        onChange={(e) => handalchange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>
                        Description (Add HTML){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <CommonEditor value={data?.description}
                        onChange={(value) => {
                          setdata({ ...data, description: value });
                        }} />
                      {/* <ReactQuill
                        theme="snow"
                        modules={modules}
                        // className={`${formErrors.description ? "is-invalid" : ""}`}
                        name="description"
                        value={data?.description}
                        onChange={(value) => {
                          setdata({ ...data, description: value });
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-4 mx-3">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      name="isActive"
                      disabled={location?.state?.type === "View"}
                      // value={data?.isActive}
                      // id="flexCheckDefault"
                      defaultChecked={data.isActive ?? isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label
                      // className="form-check-label mx-2"
                      htmlFor="flexCheckDefault"
                    >
                      Is Active
                    </label>
                  </div>
                </div>

                <div className="modal-footer mt-4">
                  <Button
                    className=" btn-outline-secondary btn-light mx-2"
                    onClick={() => {
                      navigate("/package-master-manage");
                    }}
                  >
                    Go To List
                  </Button>
                  <Button
                    className=""
                    onClick={() => {
                      addpackage();
                      navigate("/package-master-manage");
                    }}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageForm;
