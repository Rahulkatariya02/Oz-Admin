import React from 'react'
import { Link } from 'react-router-dom'

const AdminsidebarSetting = () => {
   
    const logout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const token = localStorage.getItem("token");

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/admin/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: token }),
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            const data = await response.json();
            console.log(data); // handle success, if needed
        } catch (error) {
            console.log('error', error);
            console.error('Logout failed:', error.message);
            // handle error, if needed
        }
    };

    const handleLogout = () => {
        (logout()).then((res) => {
            localStorage.clear();
            window.location.href = "/login";
        })

    };
    return (
        <div>
            <div className="header" >
                <div className="header-left">
                    <div className="menu-icon bi bi-list" />
                    <div
                        className="search-toggle-icon bi bi-search"
                        data-toggle="header_search"
                    />

                </div>
                <div className="user-info-dropdown">
                    <div className="dropdown">
                        <Link
                            className="dropdown-toggle"
                            to="#"
                            role="button"
                            data-toggle="dropdown">
                            <span className="user-icon">
                                <img
                                    src="vendors/images/favicon.png"
                                    alt=""
                                    className="dark-logo"
                                    width={50}
                                />
                            </span>
                            <span className="user-name">Oz solar</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                            <Link className="dropdown-item" to="#" data-toggle="right-sidebar">
                                <i className="dw dw-settings2" /> Setting
                            </Link>

                            <Link className="dropdown-item"
                                onClick={handleLogout}
                            >
                                <i className="dw dw-logout" /> Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-sidebar">
                <div className="sidebar-title">
                    <h3 className="weight-600 font-16 text-blue">
                        Layout Settings
                        <span className="btn-block font-weight-400 font-12">
                            User Interface Settings
                        </span>
                    </h3>
                    <div className="close-sidebar" data-toggle="right-sidebar-close">
                        <i className="icon-copy ion-close-round" />
                    </div>
                </div>
                <div className="right-sidebar-body customscroll">
                    <div className="right-sidebar-body-content">
                        <h4 className="weight-600 font-18 pb-10">Header Background</h4>
                        <div className="sidebar-btn-group pb-30 mb-10">
                            <Link
                                to="#"
                                className="btn btn-outline-primary header-white active">
                                White
                            </Link>
                            <Link to="#" className="btn btn-outline-primary header-dark">
                                Dark
                            </Link>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Sidebar Background</h4>
                        <div className="sidebar-btn-group pb-30 mb-10">
                            <Link to="#" className="btn btn-outline-primary sidebar-light">
                                White
                            </Link>
                            <Link
                                to="#"
                                className="btn btn-outline-primary sidebar-dark active">
                                Dark
                            </Link>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
                        <div className="sidebar-radio-group pb-10 mb-10">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebaricon-1"
                                    name="menu-dropdown-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-style-1"
                                    defaultChecked=""
                                />
                                <label className="custom-control-label" htmlFor="sidebaricon-1">
                                    <i className="fa fa-angle-down" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebaricon-2"
                                    name="menu-dropdown-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-style-2"
                                />
                                <label className="custom-control-label" htmlFor="sidebaricon-2">
                                    <i className="ion-plus-round" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebaricon-3"
                                    name="menu-dropdown-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-style-3"
                                />
                                <label className="custom-control-label" htmlFor="sidebaricon-3">
                                    <i className="fa fa-angle-double-right" />
                                </label>
                            </div>
                        </div>
                        <h4 className="weight-600 font-18 pb-10">Menu List Icon</h4>
                        <div className="sidebar-radio-group pb-30 mb-10">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebariconlist-1"
                                    name="menu-list-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-list-style-1"
                                    defaultChecked=""
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="sidebariconlist-1">
                                    <i className="ion-minus-round" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebariconlist-2"
                                    name="menu-list-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-list-style-2"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="sidebariconlist-2">
                                    <i className="fa fa-circle-o" aria-hidden="true" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebariconlist-3"
                                    name="menu-list-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-list-style-3"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="sidebariconlist-3">
                                    <i className="dw dw-check" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebariconlist-4"
                                    name="menu-list-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-list-style-4"
                                    defaultChecked=""
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="sidebariconlist-4">
                                    <i className="icon-copy dw dw-next-2" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebariconlist-5"
                                    name="menu-list-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-list-style-5"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="sidebariconlist-5">
                                    <i className="dw dw-fast-forward-1" />
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="sidebariconlist-6"
                                    name="menu-list-icon"
                                    className="custom-control-input"
                                    defaultValue="icon-list-style-6"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="sidebariconlist-6">
                                    <i className="dw dw-next" />
                                </label>
                            </div>
                        </div>
                        <div className="reset-options pt-30 text-center">
                            <button className="btn btn-danger" id="reset-settings">
                                Reset Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminsidebarSetting
