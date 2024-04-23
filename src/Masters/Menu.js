import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Switch, Table } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { handleTokenErrors } from "../component/handleTokenErrors";
import CommonEditor from "../component/CommonEditor";

const Menu = () => {
  useEffect(() => {
    cmsdata();
    menudata();
  }, []);

  const [data, setdata] = useState([]);
  const [cmsData, setcmsdata] = useState([]);
  const navigate = useNavigate();
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCmsList, setShowCmsList] = useState(false);
  const [ACTIVEDATA, setACTIVEDATA] = useState({});
  const [menuType, setMenuType] = useState("");
  const [cms_id, setcms_id] = useState("");
  const [parentId, setparentId] = useState(null);
  const [categoryName, setcategoryName] = useState(null);
  const [cmsDataa, setCmsData] = useState(null);
  const [sortOrder, setsortOrder] = useState("");
  const [MenuName, setMenuName] = useState("");
  const [Description, setDescription] = useState(ACTIVEDATA.Description);
  const [menu_URL_unique_key, setmenu_URL_unique_key] = useState("");
  const [showInHeader, setshowInHeader] = useState(false);
  const [showInFooter, setshowInFooter] = useState(false);
  const [Active, setActive] = useState(false);
  const [type, settype] = useState("ADD");
  const [slug, setslug] = useState("");

  // Custom form validation errors
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (type !== "ADD") {
      setsortOrder(ACTIVEDATA.sortOrder);
      setFormErrors({});
      setMenuType(
        ACTIVEDATA.menuType
        // ACTIVEDATA.menuType == 1
        //   ? "CMS"
        //   : ACTIVEDATA.menuType == 2
        //     ? "Product"
        //     : ACTIVEDATA.menuType == 3 "Other"
      );
      setMenuName(ACTIVEDATA.name);
      setshowInHeader(ACTIVEDATA.showInHeader);
      setshowInFooter(ACTIVEDATA.showInFooter);
      setActive(ACTIVEDATA.isActive);
      setmenu_URL_unique_key(ACTIVEDATA.menu_URL_unique_key);
      setslug(ACTIVEDATA.slug);
      setDescription(ACTIVEDATA.Description);
      // if (ACTIVEDATA.Description !== "") {
      // }
    }
  }, [ACTIVEDATA]);

  const [category, setcategory] = useState([]);
  useEffect(() => {
    getcatagarydata();
  }, []);
  const getcatagarydata = async () => {
    let reqOptions = {
      url: `${process.env.REACT_APP_API_BASE_URL}api/getcategory`,
      method: "POST",
    };

    let response = await axios.request(reqOptions);
    setcategory(response.data.data);
  };
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const Description1 = ACTIVEDATA.Description;
  // const handleMenuTypeChange = (e) => {
  //   const selectedMenuType = e.target.value;
  //   setMenuType(selectedMenuType);

  //   if (selectedMenuType === "CMS") {
  //     setShowCategoryList(false);
  //     setShowCmsList(true);
  //   } else if (selectedMenuType === "Product") {
  //     setShowCategoryList(true);
  //     setShowCmsList(false);
  //   } else {
  //     setShowCategoryList(false);
  //     setShowCmsList(false);
  //   }
  // };

  const handleMenuTypeChange = (e) => {
    const selectedMenuType = e.target.value;
    setMenuType(selectedMenuType);

    if (selectedMenuType === "1") {
      setShowCategoryList(false);
      setShowCmsList(true);
    } else if (selectedMenuType === "2") {
      setShowCategoryList(true);
      setShowCmsList(false);
    } else {
      setShowCategoryList(false);
      setShowCmsList(false);
    }
  };

  const cmsdata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/cmsall1`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      // Handle the successful response here
      setcmsdata(response?.data?.document);
    } catch (error) {
      // Handle any errors here
      handleTokenErrors(error);
      console.error(error);
    }
  };

  const menudata = async () => {
    try {
      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/menu`,
        method: "GET",
      };
      const response = await axios.request(reqOptions);
      // Handle the successful response here
      setdata(response.data);
    } catch (error) {
      handleTokenErrors(error);
      // Handle any errors here
      console.error(error);
    }
  };
  let data12 = data?.document?.sort((a, b) => b.sortOrder - a.sortOrder);

  const columns = [
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: "Menu Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Is Active	",
      dataIndex: "isActive",
      render: (text, object, index) => (
        <>
          <Switch
            key={index}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={object.isActive}
            onChange={async () => {
              let headersList = {
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              };
              let bodyContent = JSON.stringify({
                isActive: !object.isActive,
                id: object._id,
              });
              let reqOptions = {
                url: `${process.env.REACT_APP_API_BASE_URL}api/admin/menustatus`,
                method: "POST",
                headers: headersList,
                data: bodyContent,
              };
              let response = await axios.request(reqOptions);
              toast.success(response.data.message);
            }}
          />
        </>
        // <>
        //   <div className="custom-control custom-switch" key={index}>
        //     <input
        //       type="checkbox"
        //       className="custom-control-input"
        //       id={`customSwitch${index + 1}`}
        //       defaultChecked={object.isActive}
        //       onChange={async () => {
        //         let headersList = {
        //           Accept: "*/*",
        //           Authorization: `Bearer ${localStorage.getItem(
        //             "accessToken"
        //           )}`,
        //           "Content-Type": "application/json",
        //         };
        //         let bodyContent = JSON.stringify({
        //           isActive: !object.isActive,
        //           id: object._id,
        //         });
        //         let reqOptions = {
        //           url: `${process.env.REACT_APP_API_BASE_URL}api/admin/menustatus`,
        //           method: "POST",
        //           headers: headersList,
        //           data: bodyContent,
        //         };
        //         let response = await axios.request(reqOptions);
        //         toast.success(response.data.message);
        //       }}
        //     />
        //     <label
        //       className="custom-control-label"
        //       htmlFor={`customSwitch${index + 1}`}
        //     ></label>
        //   </div>
        // </>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, object, index) => (
        <>
          <div className="dropdown">
            <div
              className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
              to="#"
              role="button"
              data-toggle="dropdown"
            >
              <i className="dw dw-more" />
            </div>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <div
                className="dropdown-item"
                data-toggle="modal"
                data-target="#bd-example-modal-lg"
                type="button"
                onClick={() => {
                  settype("View");
                  setACTIVEDATA(object);
                }}
              >
                <i className="dw dw-eye" /> View
              </div>
              <div
                className="dropdown-item"
                data-toggle="modal"
                data-target="#bd-example-modal-lg"
                type="button"
                onClick={() => {
                  settype("Edit");
                  setACTIVEDATA(object);
                }}
              >
                <i className="dw dw-edit2" /> Edit
              </div>
              <div
                className="dropdown-item"
                type="button"
                onClick={async () => {
                  try {
                    let headersList = {
                      Accept: "*/*",
                      Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                      )}`,
                    };
                    let reqOptions = {
                      url: `${process.env.REACT_APP_API_BASE_URL}api/admin/menu/${object._id}`,
                      method: "DELETE",
                      headers: headersList,
                    };

                    let response = await axios.request(reqOptions);
                    toast.success(response.data.message);
                    menudata();
                  } catch (error) {
                    handleTokenErrors(error);
                    toast.error(error.response.data.originalError);
                  }
                }}
              >
                <i className="dw dw-delete-3" /> Delete
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  // Validation function for the form
  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Add custom validation rules here
    // if (
    //   sortOrder ? sortOrder : data12?.length > 0 ? data12[0].sortOrder + 1 : 0
    // ) {
    //   valid = false;
    //   errors.sortOrder = "Sort Order is required.";
    // }

    if (MenuName === "") {
      valid = false;
      errors.MenuName = "Menu Name is required.";
    }
    if (showCategoryList && !parentId) {
      valid = false;
      errors.parentId = "base Menu is required.";
    }
    if (MenuName === "") {
      valid = false;
      errors.MenuName = "Menu Name is required.";
    }

    if (menuType === "") {
      valid = false;
      errors.menuType = "Menu Type is required.";
    }

    if (showCategoryList && cms_id === "") {
      valid = false;
      errors.cms_id = "CMS is required.";
    }

    if (!showCategoryList && !showCmsList && menu_URL_unique_key === "") {
      valid = false;
      errors.menu_URL_unique_key = "Menu URL unique key is required.";
    }

    if (!showCategoryList && !showCmsList && slug === "") {
      valid = false;
      errors.slug = "Menu Slug is required.";
    }

    // if (Description === "") {
    //   valid = false;
    //   errors.Description = "Description is required.";
    // }

    setFormErrors(errors);
    return valid;
  };

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Menu</h2>
          </div>
          <div className="pb-4">
            <div className="row ">
              <div className="col-md-12 col-sm-12 ">
                <Button
                  data-toggle="modal"
                  type="primary"
                  size="large"
                  data-target="#bd-example-modal-lg"
                  onClick={() => {
                    settype("ADD");
                    setsortOrder("");
                    setMenuType("");
                    setcms_id("");
                    setsortOrder("");
                    setMenuName("");
                    setmenu_URL_unique_key("");
                    setslug("");
                    setDescription("");
                    setshowInHeader(false);
                    setshowInFooter(false);
                    setActive(false);
                  }}
                  style={{ float: "inline-end" }}
                >
                  <i className="icon-copy bi bi-plus-circle mr-3" />
                  Add Menu
                </Button>
              </div>
            </div>
          </div>
          <Table columns={columns} dataSource={data.document} />
        </div>
      </div>
      {/* modal */}
      <div className="col-md-4 col-sm-12 mb-30">
        <div className="pd-20 height-100-p">
          <div
            className="modal fade bs-example-modal-lg"
            id="bd-example-modal-lg"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myLargeModalLabel">
                    Menu Master
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <form className="">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Base Menu</label>
                          <select
                            className={`form-control ${
                              formErrors.parentId ? "is-invalid" : ""
                            }`}
                            disabled={type === "View"}
                            // defaultValue={data?.parentId}
                            onChange={(E) => {
                              setparentId(E.target.value);
                            }}
                          >
                            <option selected>--Base Menu--</option>
                            {data.document &&
                              data.document?.map((el, i) => {
                                return (
                                  <option key={i} value={el._id}>
                                    {el.name}
                                  </option>
                                );
                              })}
                          </select>
                          {formErrors.parentId && (
                            <div className="invalid-feedback">
                              {formErrors.parentId}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Menu Type</label>
                          <select
                            className={`form-control ${
                              formErrors.menuType ? "is-invalid" : ""
                            }`}
                            defaultValue={menuType}
                            disabled={type === "View"}
                            onChange={handleMenuTypeChange}
                          >
                            <option value="">
                              {ACTIVEDATA.menuType
                                ? menuType === 1
                                  ? "CMS"
                                  : menuType === 2
                                  ? "Product"
                                  : menuType === 3
                                  ? "Others"
                                  : ""
                                : "--- Select menu type ---"}
                            </option>
                            <option value="1">CMS</option>
                            <option value="2">Product</option>
                            <option value="3">Others</option>
                          </select>
                          {/* {formErrors.menuType && (
                            <div className="invalid-feedback d-block">
                              {formErrors.menuType}
                            </div>
                          )} */}
                        </div>
                      </div>
                      {showCategoryList && (
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Category List</label>
                            <select
                              className={`form-control ${
                                formErrors.cms_id ? "is-invalid" : ""
                              }`}
                              disabled={type === "View"}
                              onChange={(e) => {
                                setcategoryName(e.target.value);
                              }}
                            >
                              <option value="">-- Select Category --</option>
                              {category &&
                                category?.map((el, i) => {
                                  return (
                                    <option key={i} value={el.category._id}>
                                      {el.category.category}
                                    </option>
                                  );
                                })}
                            </select>
                            {formErrors.cms_id && (
                              <div className="invalid-feedback">
                                {formErrors.cms_id}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {showCmsList && (
                        // { (
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>CMS List</label>
                            <select
                              className={`form-control ${
                                formErrors.cms_id ? "is-invalid" : ""
                              }`}
                              disabled={type === "View"}
                              // onChange={handleMenuTypeChange}
                              onChange={(e) => {
                                setCmsData(e.target.value);
                              }}
                            >
                              <option value="">-- Select CMS --</option>
                              {cmsData?.map((el, i) => {
                                return (
                                  <option key={i} value={el._id}>
                                    {el.title}
                                  </option>
                                );
                              })}
                            </select>
                            {formErrors.cms_id && (
                              <div className="invalid-feedback">
                                {formErrors.cms_id}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Sort Order <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={
                              sortOrder
                                ? sortOrder
                                : data12?.length > 0
                                ? data12[0].sortOrder + 1
                                : 0
                            }
                            className={`form-control ${
                              formErrors.sortOrder ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                              setsortOrder(e.target.value);
                            }}
                          />
                          {formErrors.sortOrder && (
                            <div className="invalid-feedback">
                              {formErrors.sortOrder}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Menu Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            disabled={type === "View"}
                            value={MenuName}
                            className={`form-control ${
                              formErrors.MenuName ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                              setMenuName(e.target.value);
                            }}
                          />
                          {formErrors.MenuName && (
                            <div className="invalid-feedback">
                              {formErrors.MenuName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Menu URL unique key
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={menu_URL_unique_key}
                            disabled={type === "View"}
                            className={`form-control ${
                              formErrors.menu_URL_unique_key ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                              setmenu_URL_unique_key(e.target.value);
                            }}
                          />
                          {formErrors.menu_URL_unique_key && (
                            <div className="invalid-feedback">
                              {formErrors.menu_URL_unique_key}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Menu Slug <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={slug}
                            disabled={type === "View"}
                            className={`form-control ${
                              formErrors.slug ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                              setslug(e.target.value);
                            }}
                          />
                          {formErrors.slug && (
                            <div className="invalid-feedback">
                              {formErrors.slug}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            Description <span className="text-danger">*</span>
                          </label>
                          {/* <CommonEditor value={Description}
                            onChange={(value) => {
                              setdata({ ...data, Description: value });
                            }}
                          /> */}
                          <CommonEditor
                            value={Description}
                            onChange={(value) => {
                              setDescription(value);
                            }}
                          />
                          {/* <ReactQuill
                            value={Description}
                            onChange={(value) => setDescription(value)}
                            modules={{
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
                            }}
                            theme="snow"
                          /> */}
                          <div className="invalid-feedback d-block">
                            {formErrors.Description}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="custom-control custom-checkbox mb-5">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                              checked={showInHeader}
                              onChange={(e) => {
                                const { checked } = e.target;
                                setshowInHeader(checked);
                              }}
                            />
                            <label
                              className="custom-control-label "
                              htmlFor="customCheck1"
                            >
                              Show In Header
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-5">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                              checked={showInFooter}
                              onChange={(e) => {
                                const { checked } = e.target;
                                setshowInFooter(checked);
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              Show In Footer
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-5">
                            <input
                              type="checkbox"
                              className="custom-control-input my-5"
                              id="customCheck3"
                              checked={Active}
                              onChange={(e) => {
                                const { checked } = e.target;
                                setActive(checked);
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck3"
                            >
                              Is Active
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={async () => {
                      if (type !== "View" && validateForm()) {
                        try {
                          let headersList = {
                            Accept: "*/*",
                            Authorization: `Bearer ${localStorage.getItem(
                              "accessToken"
                            )}`,
                          };
                          let bodyContent = {
                            // parentId: parentId,
                            sortOrder: sortOrder
                              ? sortOrder
                              : data12?.length > 0
                              ? data12[0].sortOrder + 1
                              : 0,
                            // cms: cms_id,
                            menuName: MenuName,
                            menuType: menuType,
                            category: categoryName,
                            // menuType === "CMS"
                            //   ? 1
                            //   : menuType === "Product"
                            //     ? 2
                            //     : 3
                            showInHeader: showInHeader,
                            showInFooter: showInFooter,
                            id: ACTIVEDATA._id,
                            isActive: Active,
                            Description: Description,
                          };

                          if (parentId !== null && parentId !== "--Base Menu--")
                            bodyContent.parentId = parentId;
                          let reqOptions = {
                            url: `${process.env.REACT_APP_API_BASE_URL}api/admin/menu`,
                            method: "POST",
                            headers: headersList,
                            // data: type === "CMS" ? bodyContent : bodyContent1,
                            data: bodyContent,
                          };
                          let response = await axios.request(reqOptions);
                          toast.success(response.data.message);
                          menudata();
                        } catch (error) {
                          handleTokenErrors(error);
                          toast.error(error.response.data.originalError);
                        }
                      }
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
