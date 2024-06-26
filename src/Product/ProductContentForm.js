import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { toast } from "react-toastify";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { handleTokenErrors } from "../component/handleTokenErrors";
import CommonEditor from "../component/CommonEditor";

Quill.register("modules/imageResize", ImageResize);

const ProductContentForm = ({
  data123,
  showForm,
  activedata,
  setShowForm,
  type,
}) => {
  const navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ align: [] }],
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ table: [{ header: "table" }] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const [data, setdata] = useState(activedata ? activedata : {});
  const [isActive, setIsActive] = useState(data?.isActive || false);
  const [productImg, setProductImg] = useState(
    activedata ? activedata.product_img : ""
  );

  const handalchange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name !== "productImg") {
      if (name === "isActive") {
        setdata({ ...data, [name]: checked });
      } else {
        setdata({ ...data, [name]: value });
      }
    } else {
      setProductImg(files[0]);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 col-sm-12 mb-30">
        <div className="pd-20 card-box height-100-p">
          <div className="pd-20  ">
            <form>
              <div className="form-group row">
                <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                  Sort Order
                  <span className="text-danger">*</span>{" "}
                </label>
                <div className="col-md-8 mb-4">
                  <input
                    className="form-control"
                    name="sortOrder"
                    type="number"
                    value={data?.sortOrder}
                    disabled={type === "View"}
                    onChange={(e) => handalchange(e)}
                  />
                </div>
                <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                  Content Image<span className="text-danger">*</span>{" "}
                </label>
                <div className="col-md-8 mb-4">
                  <input
                    className="form-control"
                    type="file"
                    // value={data?.product_img}
                    name="productImg"
                    disabled={type === "View"}
                    onChange={(e) => handalchange(e)}
                  />
                  {data.product_img ? (
                    <img
                      src={
                        process.env.REACT_APP_API_BASE_URL + data.product_img
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>

                <label className="col-sm-12 col-md-12 mb-4 col-form-label">
                  Content Text (Add HTML)
                </label>
                <div className="col-md-12 mb-4">
                  <CommonEditor
                    value={data.contentText}
                    onChange={(value) => {
                      setdata({ ...data, contentText: value });
                    }}
                  />
                  {/* <ReactQuill
                    theme="snow"
                    modules={modules}
                    name="contentText"
                    value={data.contentText} // Use 'value' instead of 'content'
                    onChange={(content, delta, source, editor) => {
                      // Check if the change is from the user (not programmatic)
                      if (source === 'user') {
                        // Update your component state without causing an infinite loop
                        setdata((prevData) => ({ ...prevData, contentText: content }));
                      }
                    }}

                  /> */}
                </div>
              </div>

              <div className="custom-control custom-checkbox mb-5">
                <input
                  className="form-check-input "
                  type="checkbox"
                  name="isActive"
                  // disabled={location?.state?.type === "View"}
                  // value={data?.isActive}
                  // id="flexCheckDefault"
                  defaultChecked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label
                  // className="form-check-label mx-2"
                  htmlFor="flexCheckDefault"
                >
                  Is Active
                </label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(!showForm);
                  }}
                >
                  Go to list
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    try {
                      let headersList = {
                        Accept: "*/*",
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
                        "Content-Type": "multipart/form-data", // Updated Content-Type
                      };

                      let formdata = new FormData();
                      formdata.append("sortOrder", data.sortOrder);
                      formdata.append("contentText", data.contentText);
                      formdata.append("isActive", isActive);
                      formdata.append("product_id", data123._id);
                      formdata.append("product_img", productImg);

                      let formdata1 = new FormData();
                      formdata1.append("sortOrder", data.sortOrder);
                      formdata1.append("contentText", data.contentText);
                      formdata1.append("isActive", isActive);
                      formdata1.append("product_id", data123._id);
                      formdata1.append("product_img", productImg);
                      formdata1.append("id", data._id);
                      let bodyContent = !data._id ? formdata : formdata1;

                      let reqOptions = {
                        url: `${process.env.REACT_APP_API_BASE_URL}api/productcontent`,
                        method: "POST",
                        headers: headersList,
                        data: bodyContent,
                      };

                      let response = await axios.request(reqOptions);

                      if (response.data.status === 1) {
                        toast.success(response.data.message);
                        navigate("/category-master-list");
                      }
                    } catch (error) {
                      handleTokenErrors(error);
                      toast.error(error?.response?.data?.originalError);
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-4 col-sm-12 mb-30">
        <div className="pd-20 card-box h-25">
          <div className="modal-header">
            <h4 className="text-dark h4">Preview Image</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContentForm;
