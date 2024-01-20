
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailTemplate = () => {
  const modules = {
    toolbar: [
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
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    // imageResize: {
    //   parchment: Quill.import("parchment"),
    //   modules: ["Resize", "DisplaySize"],
    // },
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState("")
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({});
  const [loading, setLoading] = useState(false)


  const fetchData = async () => {
    try {
      setLoading(true);
      let accessToken = localStorage.getItem('accessToken');
      let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${accessToken}`
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/admin/emailtemplate`, {
        headers: headersList,
      }
      );
      setData(response.data.document);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    const temp = {
      subject: selectedItem?.subject || data.subject,
      id: selectedItem?._id,
      name: selectedItem?.name || data.name,
      description: selectedItem?.description,
      isActive: selectedItem?.isActive || data.isActive,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/admin/emailtemplate`,
        temp,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (selectedItem?._id) {
        delete selectedItem.createdAt;
        delete selectedItem.updatedAt;
        delete selectedItem.__v;
      }
      toast.success(response.data?.message || "Changes saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.originalError || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedItem = selectedIndex > 0 ? data[selectedIndex - 1] : null;
    setSelectedItem(selectedItem);
  };

  const handleCheckboxChange = async (_id, newIsActive) => {
    try {
      let accessToken = localStorage.getItem('accessToken');

      let headersList = {
        "Accept": "application/json",

        "Authorization": `Bearer ${accessToken}`
      }

      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}/emailtemplatestatus`,
        method: "POST",
        headers: headersList,
        data: {
          id: _id,
          isActive: newIsActive,
        }
      }

      let response = await axios.request(reqOptions);
      toast.success(response.data?.message);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="main-container">

        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Email Template Manage</h2>
          </div>
          <div className="card-box mb-30">
            <div className="pd-20 ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-4">
                  <div className="col-md-6 mb-4">
                    <label className="form-label">
                      Email Template Name
                    </label>
                    <select
                      className={`form-control ${errors.name ? "is-invalid" : ""
                        }`}
                      name="name"
                      {...register("name", {
                        required: true,
                      })}
                      onChange={handleSelectChange}
                    >
                      <option value="">
                        -- Select --
                      </option>
                      {data && data.map((item, id) => {
                        return (
                          <option key={id} value={item.name}>{item.name}</option>
                        )
                      })}
                    </select>
                    {errors.name && (
                      <small className="text-danger">
                        Please Select Email Template Name
                      </small>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label">
                      Subject<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.subject ? "is-invalid" : ""
                        }`}
                      name="subject"
                      {...register("subject", { required: !selectedItem?.subject })}
                      value={selectedItem?.subject || ""}
                    />

                    {errors.subject && (
                      <small className="text-danger">
                        Please Enter a Testimonial Text
                      </small>
                    )}
                  </div>

                  <div className="col-md-6 mb-4 mx-4">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      {...register("isActive")}
                      checked={selectedItem?.isActive}
                      onChange={() =>
                        handleCheckboxChange(selectedItem._id, !selectedItem.isActive)
                      }
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexCheckDefault">
                      Is Active
                    </label>
                  </div>
                  <div className="col-md-12 mb-4 ">
                    <label className="form-label">
                      Email Template Content
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      className={`form-control templateimg ${errors.description ? "is-invalid" : ""
                        }`}
                      name="description"
                      {...register("description", {
                        required: !selectedItem?.description,
                      })}
                      defaultValue={selectedItem?.description}
                      onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                    />
                    {/* <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={selectedItem?.description || ''}
                      onChange={(e) => setSelectedItem({ ...selectedItem, description: e })}
                    /> */}
                    {errors.description && (
                      <small className="text-danger">
                        Please Enter a Email Template Content
                      </small>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <Button type="submit" className="">
                    {selectedItem?._id ? "Update" : " Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="card-box mb-30">
            <p className="mx-2" dangerouslySetInnerHTML={{ __html: selectedItem?.description }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
