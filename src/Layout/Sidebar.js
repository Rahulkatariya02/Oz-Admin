import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Dashboard", "/Dashboard", <span className="micon bi bi-house" />),
  getItem("Master", "sub1", <span className="micon bi bi-textarea-resize" />, [
    getItem("CMS", "/cmsmasterlist"),
    getItem("Menu", "/menumasterlist"),
    getItem("Banners", "/bannermasterlist"),
    getItem("Specials", "/specialmasterlist"),
    getItem("Brands", "/brandmasterlist"),
    getItem("Testimonial Master", "/testimonialmasterlist"),
  ]),
  getItem("Gallery", "sub2", <span className="micon bi bi-textarea-resize" />, [
    getItem("Gallery Type", "/gallerytypelist"),
    getItem("Gallery Image", "/gallerymasterlist"),
  ]),
  getItem(
    "Email Template",
    "/emailtemplate",
    <span className="micon bi bi-house" />
  ),
  getItem("Product", "sub3", <span className="micon bi bi-table" />, [
    getItem("Category ", "/categorymasterlist"),
  ]),
  getItem(
    "Package",
    "/packagemastermanage",
    <span className="micon bi bi-calendar4-week" />
  ),
  getItem(
    "SCO Setting",
    "/SecoSetting",
    <span className="micon bi bi-calendar4-week" />
  ),
  getItem(
    "Sitemap",
    "/sitemap",
    <span className="micon bi bi-calendar4-week" />
  ),
  getItem(
    "Email Settings",
    "/email-settings",
    <span className="micon bi bi-calendar4-week" />
  ),
  getItem(
    "Back Office Settings",
    "/backofficeconfig",
    <span className="micon bi bi-calendar4-week" />
  ),
  getItem(
    "Extra",
    "grp",
    null,
    [
      getItem(
        "Reports",
        "sub4",
        <span className="micon bi bi-textarea-resize" />,
        [
          getItem("Contact Inquiry List ", "/inquirymasterlist"),
          getItem("Package Inquiry List ", "/packageinquierylist"),
        ]
      ),
    ],
    "group"
  ),
  getItem(
    "Extra",
    "grp",
    null,
    [
      getItem(
        "admin",
        "sub4",
        <span className="micon bi bi-textarea-resize" />,
        [
          getItem("Change Password ", "/changepassword"),
          getItem("Logout ", "/"),
        ]
      ),
    ],
    "group"
  ),
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    checktoken();
  }, [location]);
  const checktoken = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      let reqOptions = {
        url: `${process.env.REACT_APP_API_BASE_URL}api/admin/tokenvarify`,
        method: "POST",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      if (response.data.status !== 1) {
        navigate("/");
        window.location.reload(true);
      }
    } catch (error) {
      navigate("/");
      window.location.reload(true);
    }
  };
  const onClick = (e) => {
    console.log("click ", e);
    if (e.key !== "/") {
      navigate(e.key);
    } else {
      navigate(e.key);
      setTimeout(() => {
        window.location.reload(true);
      }, 100);
    }
  };
  return (
    <>
      <div
        className="left-side-bar"
        style={{
          overflowY: "scroll",
          padding: "0px",
          width: "300px",
        }}
      >
        <div className="brand-logo">
          <Link to="/">
            <img
              src="vendors/images/favicon.png"
              alt=""
              className="dark-logo"
            />
          </Link>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <i className="ion-close-round" />
          </div>
        </div>
        {/*   <div className="menu-block customscroll">
          <div className="sidebar-menu">
            <ul id="accordion-menu">
              <li>
                <Link to="/Dashboard" className="dropdown-toggle no-arrow">
                  <span className="micon bi bi-house" />
                  <span className="mtext">Dashboard</span>
                </Link>
              </li>
              <li className="dropdown">
                <Link to="javascr#pt:;" className="dropdown-toggle">
                  <span className="micon bi bi-textarea-resize" />
                  <span className="mtext">Master</span>
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/cmsmasterlist">CMS</Link>
                  </li>
                  <li>
                    <Link to="/menumasterlist">Menu</Link>
                  </li>
                  <li>
                    <Link to="/bannermasterlist">Banners</Link>
                  </li>
                  <li>
                    <Link to="/clientmasterlist">Clients</Link>
                  </li>
                  <li>
                    <Link to="/specialmasterlist">Specials</Link>
                  </li>
                  <li>
                    <Link to="/brandmasterlist">Brands</Link>
                  </li>
                  <li>
                    <Link to="/testimonialmasterlist">Testimonial Master</Link>
                  </li>
                  <li className="dropdown dropdown-toggle">
                    <Link to="#" className="">
                      <span className="mtext">Gallery</span>
                    </Link>
                    <ul className="submenu child">
                      <li>
                        <Link to="/gallerytypelist">Gallery Type</Link>
                      </li>
                      <li>
                        <Link to="/gallerymasterlist">Gallery Image</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/emailtemplate">Email Template</Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle">
                  <span className="micon bi bi-table" />
                  <span className="mtext">Product</span>
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/categorymasterlist">Category</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to="/packagemastermanage"
                  className="dropdown-toggle no-arrow"
                >
                  <span className="micon bi bi-calendar4-week" />
                  <span className="mtext">Package</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/backofficeconfig"
                  className="dropdown-toggle no-arrow"
                >
                  <span className="micon bi bi-calendar4-week" />
                  <span className="mtext">Back Office Settings</span>
                </Link>
              </li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle">
                  <span className="micon bi bi-archive" />
                  <span className="mtext"> Reports </span>
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/inquirymasterlist">Contact Inquiry List</Link>
                  </li>
                  <li>
                    <Link to="/packageinquierylist">Package Inquiry List</Link>
                  </li>
                </ul>
              </li>
              <li>
                <div className="dropdown-divider" />
              </li>
              <li>
                <div className="sidebar-small-cap">Extra</div>
              </li>
              <li>
                <Link to="#" className="dropdown-toggle">
                  <span className="micon bi bi-archive" />
                  <span className="mtext">admin</span>
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/changepassword">Change Password</Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        setTimeout(() => {
                          window.location.reload(true);
                        }, 100);
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div> */}
        <Menu
          onClick={onClick}
          style={{
            width: "100%",
          }}
          defaultSelectedKeys={["/Dashboard"]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="mobile-menu-overlay" />
    </>
  );
};

export default Sidebar;
