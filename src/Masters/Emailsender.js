import React from 'react'
import { json, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EmailSettings from './Emailsettings';
const url = process.env.REACT_APP_API_BASE_URL;


const Emailsender = (props) => {

    const editParams = useParams();
    const navigator = useNavigate();
    const [authenticationData, setAuthenticationData] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const authentication = async (newFormData) => {
        let accessToken = localStorage.getItem('accessToken');
        const formData = new FormData();
        if (props.edit) {
            formData.append("authentication_id", editParams.id);
        }
        formData.append("authentication_id", 1);
        formData.append("email", newFormData.email);
        formData.append("password", newFormData.password);
        formData.append("host", newFormData.host);
        formData.append("port", newFormData.port);

        const response = await fetch(`${url}api/admin/authentication`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        const data = await response.json();
        data.message.code ? toast.error(data.message.code) : toast.success(data.message);
        // navigator("/admin/testimonials");
    }
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getRecordTestimonial = async () => {
            let accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${url}api/admin/authentication`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                // body: JSON.stringify({
                //     authentication_id: 1
                // }),
            });

            const data = await response.json();
            setAuthenticationData(data.document[0]);
            reset({ ...data.document[0] });
        }

        getRecordTestimonial();
    }, []);

    return (
        <div>
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="title pb-20">
                        <h2 className="h3 mb-0">Email Setting</h2>
                    </div>
                    <div className="container-fluid mt--6">
                        <div className="row">
                            <div className="col-xl-12 order-xl-1">
                                <div className="card">
                                    <div className="card-body">
                                        <form noValidate onSubmit={handleSubmit((data) => authentication(data))}>
                                            <div className="pl-lg-4">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label">Gmail/workspace id:</label>
                                                            <input type="text" placeholder="email" formcontrolname="email" name="email" className={`form-control ${errors.email ? "border border-danger" : ""}`}  {...register('email', { required: true })} />

                                                            {errors.email && <p className='text-danger'>Email is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group " >
                                                            <label className="form-control-label">Password</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    placeholder="password"
                                                                    formcontrolname="password"
                                                                    name='password'
                                                                    className={`form-control ${errors.password ? "border border-danger" : ""}`}
                                                                    {...register('password', { required: true })}
                                                                />
                                                                <div className="input-group-append">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                    >
                                                                        {showPassword ? 'Hide' : 'Show'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {errors.password && <p className='text-danger'>Password is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group " >
                                                            <label className="form-control-label">Host</label>
                                                            <input type="text" placeholder="" formcontrolname="host" name='host' className={`form-control ${errors.host ? "border border-danger" : ""}`}  {...register('host', { required: true })} />

                                                            {errors.host && <p className='text-danger'>Host is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group " >
                                                            <label className="form-control-label">Port</label>
                                                            <input type="number" placeholder="" formcontrolname="port" name='port' className={`form-control ${errors.port ? "border border-danger" : ""}`}  {...register('port', { required: true })} />

                                                            {errors.port && <p className='text-danger'>Port is required.</p>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <input type="submit" value="Save" className="btn btn-primary" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EmailSettings />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Emailsender