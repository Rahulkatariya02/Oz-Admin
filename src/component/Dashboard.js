import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="card-box py-5">
            <div className="row">
              <div className="col-md-12 text-center" style={{ fontSize: 25 }}>
                Welcome <span style={{ fontWeight: "bold" }}>admin</span> !
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
