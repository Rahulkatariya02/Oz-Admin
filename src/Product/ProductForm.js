import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = ({ data123, type }) => {

  const [isActive, setIsActive] = useState(false);
  const [showInHome, setShowInHome] = useState(false);

  let accessToken = localStorage.getItem("accessToken");
  const [data, setdata] = useState(!data123 ? {} : data123);
  const [category, setcategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedChildcategories, setSelectedChildcategories] = useState([]);

  const handleCategoryChange = (categoryIndex) => {
    const updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(categoryIndex)) {
      updatedCategories.splice(updatedCategories.indexOf(categoryIndex), 1);
    } else {
      updatedCategories.push(categoryIndex);
    }

    setSelectedCategories(updatedCategories);
  };

console.log('data', data);
  // Function to handle subcategory checkbox change
  const handleSubcategoryChange = (subcategoryIndex) => {
    const updatedSubcategories = [...selectedSubcategories];
    if (updatedSubcategories.includes(subcategoryIndex)) {
      updatedSubcategories.splice(updatedSubcategories.indexOf(subcategoryIndex), 1);
    } else {
      updatedSubcategories.push(subcategoryIndex);
    }
    setSelectedSubcategories(updatedSubcategories);
  };

  const handleChildcategoryChange = (childcategoryIndex) => {
    const updatedChildcategories = [...selectedChildcategories];
    if (updatedChildcategories.includes(childcategoryIndex)) {
      updatedChildcategories.splice(updatedChildcategories.indexOf(childcategoryIndex), 1);
    } else {
      updatedChildcategories.push(childcategoryIndex);
    }
    setSelectedChildcategories(updatedChildcategories);
  };
  const navigate = useNavigate();
  
  const handalchange = (e) => {
    // e.preventdefault()
    const { name, value, checked, files } = e.target;
    if (name !== "banner_img") {
      if (name !== "logo_img") {
        if (name === "isActive") {
          setdata({ ...data, [name]: checked });
        } else {
          setdata({ ...data, [name]: value });
        }
      } else {
        setdata({ ...data, [name]: files[0] });
      }
    } else {
      setdata({ ...data, [name]: files[0] });
    }
  };
  useEffect(() => {
    getdata();
    setShowInHome(data.showInHome);
  }, []);

  const getdata = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}api/category/getcategories`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.text();
    let data1 = await JSON.parse(data);
    setcategory(data1.data);
  };
 
  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 mb-30">
          <div className="pd-20 card-box height-100-p">
            <div className="pd-20  ">
              <form>
                <div className="form-group row">
                  <label className="col-sm-12 col-md-4 col-form-label mb-4">
                    Product Name
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="productName"
                      disabled={type === "View"}
                      value={data?.productName}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Product Code
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="productCode"
                      value={data?.productCode}
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Sort Order
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="number"
                      name="sortOrder"
                      value={data?.sortOrder}
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Banner Image<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="file"
                      name="banner_img"
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    logo img<span className="text-danger">*</span>
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="file"
                      name="logo_img"
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    description
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="description"
                      disabled={type === "View"}
                      value={data?.description}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>

                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Meta Title
                  </label>
                  <div className="col-md-8 mb-4">
                    <input
                      className="form-control"
                      type="text"
                      name="metaTitle"
                      disabled={type === "View"}
                      value={data?.metaTitle}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Meta KeyWord
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="metaKeyword"
                      disabled={type === "View"}
                      value={data?.metaKeyword}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                  <label className="col-sm-12 col-md-4 mb-4 col-form-label">
                    Meta Description <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-8 mb-4">
                    <textarea
                      className="form-control"
                      type="text"
                      name="metaDescription"
                      value={data?.metaDescription}
                      disabled={type === "View"}
                      onChange={(e) => handalchange(e)}
                    />
                  </div>
                </div>

                <div className="custom-control custom-checkbox mb-5">
                  <label className="col-sm-12 col-md-4 col-form-label"></label>
                  <input
                    type="checkbox"
                    className="custom-control-input my-5"
                    id="customCheck3"
                    disabled={type === "View"}
                    name="isActive"
                    defaultChecked={isActive || data?.isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck3"
                  >
                    Is Active
                  </label>
                </div>
                <div className="custom-control custom-checkbox mb-5">
                  <label className="col-sm-12 col-md-4 col-form-label"></label>
                  <input
                    type="checkbox"
                    className="custom-control-input my-5"
                    id="customCheck1"
                    disabled={type === "View"}
                    name="showInHome"
                    defaultChecked={showInHome || data.showInHome} 
                    onChange={(e) => setShowInHome(e.target)}
                    // onChange={(e) => {
                    //   const { checked } = e.target;
                    //   setShowInHome(checked);
                    // }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                   ShowInHome
                  </label>
                </div>


                <div className="modal-footer">
                  <Link to="/categorymasterlist">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Go to list
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={async () => {
                      try {
                        if (type !== "View") {
                          if (data?._id !== undefined) {
                            let formdata = new FormData();
                            formdata.append("sortOrder", data.sortOrder);
                            formdata.append("productName", data.productName);
                            formdata.append("metaTitle", data.metaTitle);
                            formdata.append("description", data.description);
                            formdata.append("productCode", data.productCode);
                            formdata.append("metaKeyword", data.metaKeyword);
                            formdata.append("logo_img", data.logo_img);
                            // formdata.append("banner_img", data.banner_img);
                            formdata.append("id", data._id);
                            formdata.append(
                              "metaDescription",
                              data.metaDescription
                            );
                            formdata.append("isActive", isActive);
                            formdata.append("showInHome", showInHome);
                            // formdata.append("slug", data.productName);
                            formdata.append("category[]", data?.category);

                            if (data?.category) { setSelectedCategories(data?.category); }

                            formdata.append("banner_img", data.banner_img);

                            let bodyContent = formdata;

                            let headersList = {
                              "Accept": "*/*",
                              "Authorization": `Bearer ${accessToken}`
                            }

                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/product/addProduct`,
                              method: "POST",
                              headers: headersList,
                              data: bodyContent,
                            };

                            let response = await axios.request(reqOptions);
                            if (response.data.status === 1) {
                              toast.success(response.data.message);
                              navigate("/categorymasterlist");
                            }
                          } else {
                            let formdata = new FormData();
                            formdata.append("sortOrder", data.sortOrder);
                            formdata.append("productName", data.productName);
                            formdata.append("metaTitle", data.metaTitle);
                            formdata.append("description", data.description);
                            formdata.append("productCode", data.productCode);
                            formdata.append("metaKeyword", data.metaKeyword);
                            formdata.append("metaDescription", data.metaDescription);
                            formdata.append("isActive", isActive);
                            formdata.append("showInHome", showInHome);
                            // formdata.append("slug", data.productName);
                            formdata.append("logo_img", data.logo_img);
                            for (let i = 0; i < selectedCategories?.length; i++) {
                              formdata.append('category[]', selectedCategories[i]);
                            }
                            formdata.append(
                              "banner_img",
                              data.banner_img
                            );

                            let headersList = {
                              "Accept": "*/*",
                              "Authorization": `Bearer ${accessToken}`
                            }
                            let bodyContent = formdata;

                            let reqOptions = {
                              url: `${process.env.REACT_APP_API_BASE_URL}api/product/addProduct`,
                              method: "POST",
                              data: bodyContent,
                              headers: headersList,
                            };

                            let response = await axios.request(reqOptions);
                            if (response.data.status === 1) {
                              toast.success(response.data.message);
                              navigate("/categorymasterlist");
                            }
                          }
                        }
                      } catch (error) {
                        toast.error(error?.response?.data?.error);
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
            <div className="modal-header ">
              <h4 className="text-dark h4">PRODUCT CATEGORIES</h4>
            </div>
            {category?.map((e, i) => {         
              return (
                <ul className="dd-list" key={i}>
                  <li>
                    <div className="checkbox checkbox-primary inline-block">
                      <input
                        className=""
                        type="checkbox"
                        htmlFor={e._id}
                        id={e._id}
                        // checked={selectedCategories.includes(e._id) || data?.category[0] === e._id}
                        checked={selectedCategories.includes(e._id) || (data?.category?.[0] === e._id ?? false)}

                        // checked={selectedCategories.includes(e._id) || data?.category[0] === e._id}
                        onChange={() => handleCategoryChange(e._id)}
                      />
                      <label className="mx-2" _id={e._id}>
                        {e.category}
                      </label>
                    </div>
                    <ul className="sub-menu mx-4">
                      {e?.subcategories?.map((el, j) => {
                        return (
                          <ul className="dd-list">
                            <li>
                              <div className="checkbox checkbox-primary inline-block">
                                <input
                                  className=""
                                  type="checkbox"
                                  htmlFor={el._id}
                                  id={el._id}
                                  checked={selectedSubcategories.includes(el._id)}
                                  onChange={() => handleSubcategoryChange(el._id)}
                                />
                                <label className="mx-2" _id={el._id}>
                                  {el.category}
                                </label>
                              </div>
                              <ul className="sub-menu mx-4">
                                {el?.ChildCategory?.map((el2, i) => {
                                  if (el2.category == el._id) {
                                    return (
                                      <ul className="dd-list">
                                        <li>
                                          <div className="checkbox checkbox-primary inline-block">
                                            <input
                                              className=""
                                              type="checkbox"
                                              htmlFor={el2._id}
                                              checked={selectedChildcategories.includes(el2._id)}
                                              onChange={() => handleChildcategoryChange(el2._id)}
                                            />
                                            <label
                                              className="mx-2"
                                              _id={el2._id}
                                            >
                                              {el2.name}
                                            </label>
                                          </div>
                                          <ul className="sub-menu mx-4"></ul>
                                        </li>
                                      </ul>
                                    );
                                  }
                                })}
                              </ul>
                            </li>
                          </ul>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
