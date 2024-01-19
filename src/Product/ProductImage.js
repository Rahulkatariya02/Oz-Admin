import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductImage = () => {
    return (
        <>
            <div className='row'>
                <div className="col-md-8 col-sm-12 mb-30">
                    <div className="pd-20 card-box height-100-p">
                        <div className="pd-20  ">

                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-12 col-md-3 mb-4 col-form-label">Product Image
                                        <span className='text-danger'>*</span>  </label>
                                    <div className="col-md-7 mb-4">
                                        <input className="form-control" type="file" />
                                        <small className="form-text text-muted">- Image format must be .jpeg, .png, .gif</small>
                                        <small className="form-text text-muted">- Image size must be 950 X 550</small>

                                    </div>
                                    <div className="col-md-2 mb-4">
                                        <Button className="text-white " > Upload</Button>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <Link to="/categorymasterlist"><button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Go to list
                                    </button></Link>
                                    <button type="button" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>


                        </div>

                    </div>
                </div>

                <div className="col-md-12 col-sm-12 mb-30">
                    <div className="pd-20 card-box h-25">
                        <div className="pb-20 pd-20 table-responsive">
                            <table className="data-table table stripe hover nowrap" id='myTable'>
                                <thead>
                                    <tr>

                                        <th>Image</th>
                                        <th>Is Default</th>
                                        <th className="datatable-nosort">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img src="vendors/images/deskapp-logo.svg" alt='slider-img' width={200} /></td>
                                        <td>yes</td>
                                        <td>
                                            <Link className="dropdown-item" type="button">
                                                <i className="dw dw-delete-3" /> Delete
                                            </Link>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductImage
