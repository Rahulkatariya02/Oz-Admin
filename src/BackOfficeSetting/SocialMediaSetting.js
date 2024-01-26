import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SocialMediaSetting = () => {
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
        `${process.env.REACT_APP_API_BASE_URL}api/admin/socialmedia`,
        data1,
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

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      let accessToken = localStorage.getItem('accessToken');
      let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${accessToken}`
      }
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/admin/socialmedia`, {
        headers: headersList,
      });
      setSocialMediaData(response.data.document);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (socialMediaData[0]) {
      reset(socialMediaData[0]);
    }
  }, [socialMediaData[0]]);

  return (
    <>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Facebook</label>
                <input
                  type="text"
                  name="Facebook"
                  className={`form-control ${errors.Facebook ? "is-invalid" : ""
                    }`}
                  {...register("Facebook", {
                    required: true,
                  })}
                />
                {errors.Facebook && (
                  <small className="text-danger">
                    Please enter a facebook link
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="LinkedIn"
                  className={`form-control ${errors.LinkedIn ? "is-invalid" : ""
                    }`}
                  {...register("LinkedIn", {
                    required: true,
                  })}
                />
                {errors.LinkedIn && (
                  <small className="text-danger">
                    Please enter a linkedIn link
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Twitter</label>
                <input
                  type="text"
                  name="Twitter"
                  className={`form-control ${errors.Twitter ? "is-invalid" : ""
                    }`}
                  {...register("Twitter", {
                    required: true,
                  })}
                />
                {errors.Twitter && (
                  <small className="text-danger">
                    Please enter a twitter link
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Pintrest</label>
                <input
                  type="text"
                  name="Pintrest"
                  className={`form-control ${errors.Pintrest ? "is-invalid" : ""
                    }`}
                  {...register("Pintrest", {
                    required: true,
                  })}
                />
                {errors.Pintrest && (
                  <small className="text-danger">
                    Please enter a pintrest link
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Instagram</label>
                <input
                  type="text"
                  name="Instagram"
                  className={`form-control ${errors.Instagram ? "is-invalid" : ""
                    }`}
                  {...register("Instagram", {
                    required: true,
                  })}
                />
                {errors.Instagram && (
                  <small className="text-danger">
                    Please enter a instagram link
                  </small>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>YouTube</label>
                <input
                  type="text"
                  name="YouTube"
                  className={`form-control ${errors.YouTube ? "is-invalid" : ""
                    }`}
                  {...register("YouTube", {
                    required: true,
                  })}
                />
                {errors.YouTube && (
                  <small className="text-danger">
                    Please enter a youtube link
                  </small>
                )}
              </div>
            </div>
            <div className="modal-footer col-md-12 mt-4">
              <Button className=" btn-outline-secondary btn-light mx-2">
                Back
              </Button>
              <Button className="" type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SocialMediaSetting;
