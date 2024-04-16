import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ProductForm from "./ProductForm";
import ProductContent from "./ProductContent";
import ProductContentForm from "./ProductContentForm";
import ProductFile from "./ProductFile";
import ProductImage from "./ProductImage";
import {useLocation} from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const [data, setdata] = useState(
    !location?.state?.data ? {} : location?.state?.data
  );

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20 col-md-12">
          <div className="row">
            <div className="col-md-12 col-sm-12 mb-30">
              <div className="pd-20 card-box height-100-p">
                <div className="form-group row"></div>
                <Tabs
                  defaultActiveKey="product"
                  transition={false}
                  id="noanim-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="product" title="Manage Product">
                    <ProductForm data123={data} type={location?.state?.type} />
                  </Tab>
                  <Tab eventKey="content " title="Product Content">
                    <ProductContent
                      data123={data}
                      type={location?.state?.type}
                    />
                  </Tab>
                  <Tab eventKey="File" title="Product File / Url">
                    <ProductFile data123={data} type={location?.state?.type} />
                  </Tab>
                  {/* <Tab eventKey="image" title="Product Image">
                  <ProductImage />
                </Tab> */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
