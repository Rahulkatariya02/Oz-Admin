import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductForm from "./ProductForm";

const ProductManage = () => {
  const location = useLocation();
  const [data, setdata] = useState(location.state.data);
  
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20 col-md-12">
          <div className="title pb-20">
            <h2 className="h3 mb-0">Category Manage</h2>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 mb-30">
              <div className="pd-20 card-box height-100-p">
                <div className="form-group row">
                  <label className="col-sm-12 col-md-2 col-form-label mb-4">
                    Manage Product
                  </label>
                  <div className="col-md-10 mb-4">
                    <input className="form-control" type="text" readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductForm data123={data} />
        </div>
      </div>
    </>
  );
};

export default ProductManage;
