import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { handleTokenErrors } from "../component/handleTokenErrors";

const SecoSetting = () => {
  const url = process.env.REACT_APP_API_BASE_URL;
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [data, setData] = useState([]);

  const onSubmit = async (data) => {
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      };
      let bodyContent = JSON.stringify({
        google_analytics_code: data.google_analytics_code,
        facebook_pixel_code: data.facebook_pixel_code,
        // isActive: !data.isActive,
        // id: object._id,
      });
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/seo`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      let response = await axios.request(reqOptions);
      toast.success(response.data.message);
    } catch (error) {
      handleTokenErrors(error);
      // Handle any errors here
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/seo`,
        {
          headers: headersList,
        }
      );
      setData(response.data.document);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    reset(data?.[0]);
  }, [data]);

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">SEO Settings</h2>
          </div>
          <div className="row pb-10">
            <div className=" col-md-12 mb-20">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-box height-100-p widget-style3 p-4">
                  <div className="row ">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>
                          Google Analytics Code (Note : Please code only)
                        </label>
                        <input
                          {...register("google_analytics_code")}
                          className="form-control"
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-group">
                        <label>Facebook Pixel.code</label>
                        <input
                          {...register("facebook_pixel_code")}
                          className="form-control"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecoSetting;
