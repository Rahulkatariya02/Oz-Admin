import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Button,
  useAccordionButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ContactSetting from "./ContactSetting";
import SocialMediaSetting from "./SocialMediaSetting";
import EmailConfiguration from "./EmailConfiguration";
import axios from "axios";
import { toast } from "react-toastify";
import { handleTokenErrors } from "../component/handleTokenErrors";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const Grey = "#c8cfd5";
  const White = "#ffffff";
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{
        backgroundColor: isCurrentEventKey ? Grey : White,
        width: "40px",
        height: "40px",
        padding: 0,
      }}
      onClick={decoratedOnClick}
    >
      {isCurrentEventKey ? (
        <i className="icon-copy fa fa-minus" aria-hidden="true"></i>
      ) : (
        <i className="icon-copy fa fa-plus" aria-hidden="true"></i>
      )}
    </button>
  );
}

const BackOffice = () => {
  const [LogoImage, setLogoImage] = useState({});
  const [loading, setLoading] = useState();
  const fetchData = async () => {
    try {
      setLoading(true);
      let accessToken = localStorage.getItem('accessToken');
      let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${accessToken}`
      }
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/admin/logo`, {
        headers: headersList,
      });
      setLogoImage(response.data.document);
            setLoading(false);
    } catch (error) {
      handleTokenErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Back Office Settings</h2>
          </div>
          <div className="card-box mb-30 col-md-10">
            <div className="pd-20">
              <div className="row">
                <div className="col-md-12">
                  <Accordion defaultActiveKey="" className="mb-5 ">
                    <div className="col-sm-12 col-md-12 mb-30">
                      <div className="card card-box mb-5 mt-5 rounded-0">
                        <div className="card-header d-flex justify-content-between">
                          <div>LOGO IMAGE / YOUTUBE VIDEO</div>
                          <ContextAwareToggle eventKey="0" />
                        </div>
                        <Accordion.Collapse eventKey="0">
                          <div className="card-body">
                            <form>
                              <div className="row">
                                <div className="col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label>
                                      Logo Image
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      onChange={(e) => {
                                        const { name, value, checked, files } =
                                          e.target;
                                        setLogoImage(files[0]);
                                      }}
                                    />
                                  </div>

                                  <div className="form-group">
                                    <img src={LogoImage[0]?.logo_image} width={50}/>
                                  </div>
                                </div>
                                <div className="modal-footer col-md-12 mt-4">
                                  <Button className=" btn-outline-secondary btn-light mx-2">
                                    Back
                                  </Button>
                                  <Button
                                    className=""
                                    onClick={async () => {
                                      try {
                                        let headersList = {
                                          Accept: "*/*",
                                          Authorization: `Bearer ${localStorage.getItem(
                                            "accessToken"
                                          )}`,
                                        };

                                        let formdata = new FormData();
                                        formdata.append(
                                          "logo_image",
                                          LogoImage
                                        );

                                        let bodyContent = formdata;

                                        let reqOptions = {
                                          url: `${process.env.REACT_APP_API_BASE_URL}api/admin/logo`,
                                          method: "POST",
                                          headers: headersList,
                                          data: bodyContent,
                                        };

                                        let response = await axios.request(
                                          reqOptions
                                        );
                                        toast.success(response.data.message);
                                      } catch (error) {
                                        toast.error(
                                          error.response.data.originalError
                                            ? error.response.data.originalError
                                            : error.response.data.error
                                        );
                                        handleTokenErrors(error);
                                      }
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Accordion.Collapse>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 mb-30">
                      <div className="card card-box mb-5 mt-5 rounded-0">
                        <div className="card-header d-flex justify-content-between">
                          <div>CONTACT SETTING</div>
                          <ContextAwareToggle eventKey="1">
                            Click me!
                          </ContextAwareToggle>
                        </div>
                        <Accordion.Collapse eventKey="1">
                          <ContactSetting />
                        </Accordion.Collapse>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-12 mb-30">
                      <div className="card card-box mb-5 mt-5 rounded-0">
                        <div className="card-header d-flex justify-content-between">
                          <div>SOCIAL MEDIA SETTING</div>
                          <ContextAwareToggle eventKey="2">
                            Click me!
                          </ContextAwareToggle>
                        </div>
                        <Accordion.Collapse eventKey="2">
                          <SocialMediaSetting />
                        </Accordion.Collapse>
                      </div>
                    </div>

                    {/* <div className="col-sm-12 col-md-12 mb-30">
                      <div className="card card-box mb-5 mt-5 rounded-0">
                        <div className="card-header d-flex justify-content-between">
                          <div>EMAIL CONFIGURATION SETTING</div>
                          <ContextAwareToggle eventKey="3">
                            Click me!
                          </ContextAwareToggle>
                        </div>
                        <Accordion.Collapse eventKey="3">
                          <EmailConfiguration />
                        </Accordion.Collapse>
                      </div>
                    </div> */}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackOffice;
