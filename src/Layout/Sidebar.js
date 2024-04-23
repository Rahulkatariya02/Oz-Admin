import React from "react";
import { Link, useLocation } from "react-router-dom";
import AdminsidebarSetting from "./AdminsidebarSetting";

const Sidebar = () => {
  const location = useLocation().pathname;
  return (
    <>
      <header
        className={
          location === "/login" || location === "/forgot-password"
            ? "d-none"
            : ""
        }
      >
        <div className="header">
          <AdminsidebarSetting />
        </div>
        <div className="left-side-bar">
          <div className="brand-logo">
            <img
              src="assets/images/logo.png"
              alt="Logo"
              width={120}
              height={100}
            />
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
                      <Link to="/cms-master-list">CMS</Link>
                    </li>
                    <li>
                      <Link to="/menu-master-list">Menu</Link>
                    </li>
                    <li>
                      <Link to="/banner-master-list">Banners</Link>
                    </li>
                    <li>
                      <Link to="/special-master-list">Specials</Link>
                    </li>
                    <li>
                      <Link to="/brand-master-list">Brands</Link>
                    </li>
                    <li>
                      <Link to="/testimonial-master-list">Testimonials</Link>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon fa fa-image" />
                    <span className="mtext">Gallery</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/gallery-type-list">Gallery Type</Link>
                    </li>
                    <li>
                      <Link to="/gallery-master-list">Gallery Image</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    to="/email-template"
                    className="dropdown-toggle no-arrow"
                  >
                    <span className="micon dw dw-email" />
                    <span className="mtext">Email Template</span>
                  </Link>
                </li>

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-x-diamond-fill" />
                    <span className="mtext">Products</span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/category-master-list">Category</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    to="/package-master-manage"
                    className="dropdown-toggle no-arrow"
                  >
                    <span className="micon ti-package" />
                    <span className="mtext">Packages</span>
                  </Link>
                </li>

                <li className="dropdown">
                  <Link to="#" className="dropdown-toggle">
                    <span className="micon bi bi-gear-fill" />
                    <span className="mtext"> Settings </span>
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link to="/seo-settings">SEO Settings</Link>
                    </li>
                    <li>
                      <Link to="/back-office-config">Back Office Settings</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    to="/email-settings"
                    className="dropdown-toggle no-arrow"
                  >
                    <span className="micon ion-ios-cog" />
                    {/* <i class="icon-copy ion-ios-cog"></i> */}
                    <span className="mtext">Email Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="dropdown-toggle no-arrow">
                    <span className="micon dw dw-diagram" />
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
                      <Link to="/inquiry-master-list">
                        Contact Inquiry List
                      </Link>
                    </li>
                    <li>
                      <Link to="/package-inquiery-list">
                        Package Inquiry List
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    to="/change-password"
                    className="dropdown-toggle no-arrow"
                  >
                    <span className="micon dw dw-user" />
                    <span className="mtext">Change Password</span>
                  </Link>
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
