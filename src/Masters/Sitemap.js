import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { handleTokenErrors } from "../component/handleTokenErrors";

const Sitemap = () => {
  const url = process.env.REACT_APP_API_BASE_URL;

  const { handleSubmit } = useForm({});

  const onSubmit = async () => {
    try {
      let reqOptions = {
        url: `${url}api/admin/sitemap`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      toast.success(response.data.message);
    } catch (error) {
      handleTokenErrors(error);
      console.error(error);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Sitemap Generator</h2>
          </div>
          <div className="row pb-10">
            <div className=" col-md-12 mb-20">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-box height-100-p widget-style3 p-4">
                  <div className="">
                    <button type="submit" className="btn btn-primary">
                      Generate Sitemap
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

export default Sitemap;
