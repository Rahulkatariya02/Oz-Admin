import React from "react";
import { Link, useLocation } from "react-router-dom";
import AdminsidebarSetting from "./AdminsidebarSetting";

const Sidebar = () => {
  const location = useLocation().pathname;
  return (
    <>
      <header className={
        (location === "/login" ||
          location === "/forgotpassword"
          ? "d-none"
          : "")
      }>
        <div className="header" >
          <AdminsidebarSetting />
        </div>
        <div className="left-side-bar">
          <div className="brand-logo">
            <Link to="https://ozsolarneeds.com.au/">
              <img src="vendors/images/favicon.png" alt="" className="dark-logo" width={50} />
            </Link>

            <div className="close-sidebar" data-toggle="left-sidebar-close">
              <i className="ion-close-round" />
            </div>
          </div>
          <div className="menu-block customscroll">
            <div className="sidebar-menu">
              <ul id="accordion-menu">
                <li>
                  <Link to="/" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-speedometer2" />
                    <span className="mtext">Dashboard</span>
                  </Link>
                </li>
                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-file-earmark-fill" />
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
                      <Link to="/specialmasterlist">Specials</Link>
                    </li>
                    <li>
                      <Link to="/brandmasterlist">Brands</Link>
                    </li>
                    <li>
                      <Link to="/testimonialmasterlist">Testimonial Master</Link>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-command" />
                    <span className="mtext">Gallery</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/gallerytypelist">Gallery Type</Link>
                    </li>
                    <li>
                      <Link to="/gallerymasterlist">Gallery Image</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/emailtemplate" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext">Email Template</span>
                  </Link>
                </li>

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-x-diamond-fill" />
                    <span className="mtext">Product</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/categorymasterlist">Category</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/packagemastermanage" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext">Package</span>
                  </Link>
                </li>

                {/* <li>
                  <Link to="/SecoSetting" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext">SEO Setting</span>
                  </Link>
                </li>

                <li>
                  <Link to="/emailtemplate" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext">Email Template</span>
                  </Link>
                </li> */}

                {/* <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-command" />
                    <span className="mtext"> Manage Brand</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/managebrands">Manage brands</Link>
                    </li>
                  </ul>
                </li> */}

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext"> Settings </span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/SecoSetting">SEO Setting</Link>
                    </li>
                    <li>
                      <Link to="/backofficeconfig">Back Office Setting</Link>
                    </li>
                  </ul>
                </li>


                <li>
                  <Link to="/email-settings" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext">Email Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="dropdown-toggle no-arrow">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext">Sitemap</span>
                  </Link>
                </li>

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle ">
                    <span className="micon bi bi-card-list" />
                    <span className="mtext">Reports</span>
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
                    <span className="micon bi bi-person-circle" />
                    <span className="mtext">admin</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/changepassword">Change Password</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile-menu-overlay" />
      </header>
    </>
  );
};

export default Sidebar;
