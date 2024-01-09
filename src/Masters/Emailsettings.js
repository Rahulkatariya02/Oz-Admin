import React from 'react'
// import { json, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
const url = process.env.REACT_APP_API_BASE_URL;

const EmailSettings = (props) => {


    const [selectedSection, setSelectedSection] = useState('packageinquiry');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const [mailReceiverData, setMailReceiverData] = useState([]);

    useEffect(() => {
        const getMailReceiver = async () => {
            let accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`${url}api/admin/emailreceiver`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    // body: JSON.stringify({
                    //     // Include any necessary parameters
                    // }),
                });

                const data = await response.json();
                // Handle the response data as needed
                setMailReceiverData(data.document);
            } catch (error) {
                console.error("Error fetching mail receiver data:", error);
            }
        }

        getMailReceiver();
    }, []);



    //BCC
    const [bccFields, setBccFields] = useState([]);
    const [bccFields1, setBccFields1] = useState([]);
    const [bccFields2, setBccFields2] = useState([]);

    const addNewBccField = (section) => {
        if (section === 'packageinquiry') {
            setBccFields([...bccFields, { id: bccFields.length + 1, value: '' }]);
        } else if (section === 'contactinquiry') {
            setBccFields1([...bccFields1, { id: bccFields1.length + 1, value: '' }]);
        } else if (section === 'bookappointment') {
            setBccFields2([...bccFields2, { id: bccFields2.length + 1, value: '' }]);
        }
    };

    const handleBccChange = (id, value) => {
        const updatedBccFields = bccFields.map((field) =>
            field.id === id ? { ...field, value } : field
        );
        setBccFields(updatedBccFields);
    };


    //CC
    const [ccFields, setCcFields] = useState([]);
    const [ccFields1, setCcFields1] = useState([]);
    const [ccFields2, setCcFields2] = useState([]);

    const addNewCcField = (section) => {
        if (section === 'packageinquiry') {
            setCcFields((prevFields) => [...prevFields, { id: prevFields.length + 1, value: '' }]);
        } else if (section === 'contactinquiry') {
            setCcFields1((prevFields) => [...prevFields, { id: prevFields.length + 1, value: '' }]);
        } else if (section === 'bookappointment') {
            setCcFields2((prevFields) => [...prevFields, { id: prevFields.length + 1, value: '' }]);
        }
    };

    const handleCcChange = (id, value, section) => {
        if (section === 'packageinquiry') {
            const updatedCcFields = ccFields.map((field) =>
                field.id === id ? { ...field, value } : field
            );
            setCcFields(updatedCcFields);
        } else if (section === 'contactinquiry') {
            const updatedCcFields = ccFields1.map((field) =>
                field.id === id ? { ...field, value } : field
            );
            setCcFields1(updatedCcFields);
        } else if (section === 'bookappointment') {
            const updatedCcFields = ccFields2.map((field) =>
                field.id === id ? { ...field, value } : field
            );
            setCcFields2(updatedCcFields);
        }
    };
    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };
    const filteredMailData = mailReceiverData?.filter((mail) => mail.name === selectedSection);
    const emailId = filteredMailData?.[0]?._id
    const emailName = filteredMailData?.[0]?.name



    const onSubmit = async (formData) => {
        let accessToken = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/admin/emailreceiver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    id: emailId,
                    name: emailName,
                    to: emailName === "bookappointment" ? formData.to2.filter(email => email.trim() !== '') : emailName === "contactinquiry" ? formData.to1.filter(email => email.trim() !== '') : emailName === "packageinquiry" ? formData.to.filter(email => email.trim() !== '') : '',
                    cc: emailName === "bookappointment" ? formData.cc2.filter(email => email.trim() !== '') : emailName === "contactinquiry" ? formData.cc1.filter(email => email.trim() !== '') : emailName === "packageinquiry" ? formData.cc.filter(email => email.trim() !== '') : '',
                    bcc: emailName === "bookappointment" ? formData.bcc2.filter(email => email.trim() !== '') : emailName === "contactinquiry" ? formData.bcc1.filter(email => email.trim() !== '') : emailName === "packageinquiry" ? formData.bcc.filter(email => email.trim() !== '') : '',
                }),
            });

            // Handle the API response
            const data = await response.json();
            data.message.code ? toast.error(data.message.code) : toast.success(data.message);

        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div>
            <div className="mt-4">
                <div className="card">
                    <div className="card-body">
                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <h4 className='title'>Email receiving Ids:</h4>
                            <div className="row">
                                <div className="col-lg-6 mt-4">
                                    <div className='subtitle'>
                                        <h6>Package Inquiry</h6>
                                    </div>
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "packageinquiry" ?
                                                <div className="form-group">
                                                    <label className="form-control-label">To</label>
                                                    {mail?.to?.map((data, i) =>
                                                        <input type="email"
                                                            placeholder="email"
                                                            formcontrolname="email"
                                                            name="email"
                                                            className="form-control border"
                                                            defaultValue={data}
                                                            required
                                                            // {...register('to')}
                                                            {...register(`to[${i}]`)}
                                                        />
                                                    )}

                                                </div> : ''
                                        )
                                    }
                                    )}
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "packageinquiry" ?
                                                <div className="form-group" key={i}>
                                                    <label className="form-control-label">CC</label>
                                                    {mail?.cc?.map((ccData, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="email"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={ccData}
                                                                onChange={(e) => handleCcChange(index, e.target.value)}
                                                                {...register(`cc[${index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    {ccFields.map((field, index) => (
                                                        <div key={field.id} className="input-group mb-2">
                                                            <input
                                                                type="email"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={field.value}
                                                                onChange={(e) => handleCcChange(index + mail?.cc?.length, e.target.value)}
                                                                {...register(`cc[${mail?.cc?.length + index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className="form-group d-flex justify-content-end">
                                                        <span type="button" onClick={() => addNewCcField('packageinquiry')} className="">
                                                            +Add
                                                        </span>
                                                    </div>
                                                </div> : ''
                                        );
                                    })}
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "packageinquiry" ? (
                                                <div className="form-group" key={i}>
                                                    <label className="form-control-label">BCC</label>

                                                    {/* Existing BCC data */}
                                                    {mail?.bcc?.map((bccData, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="email"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={bccData}
                                                                onChange={(e) => handleBccChange(index, e.target.value)}
                                                                {...register(`bcc[${index}]`)}
                                                            />
                                                        </div>
                                                    ))}

                                                    {/* Dynamically added BCC fields */}
                                                    {bccFields.map((field, index) => (
                                                        <div key={field.id} className="input-group mb-2">
                                                            <input
                                                                type="email"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={field.value}
                                                                onChange={(e) => handleBccChange(mail?.bcc?.length + index, e.target.value)}
                                                                {...register(`bcc[${mail?.bcc?.length + index}]`)}
                                                            />
                                                        </div>
                                                    ))}

                                                    <div className="form-group d-flex justify-content-end">
                                                        <span type="button" onClick={() => addNewBccField('packageinquiry')} className="">
                                                            +Add
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : null
                                        );
                                    })}

                                    <div className="form-group d-flex justify-content-end">
                                        <input type="submit" value="Save" className="btn btn-primary" onClick={() => handleSectionChange('packageinquiry')} />
                                    </div>
                                </div>

                                <div className="col-lg-6 mt-4">
                                    <div className='subtitle'>
                                        <h6>Contact Inquiry</h6>
                                    </div>
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "contactinquiry" ? <div className="form-group">
                                                <label className="form-control-label">To</label>
                                                {mail?.to?.map((data, i) =>
                                                    <input type="text" placeholder="email" formcontrolname="email" name="email" className="form-control border" defaultValue={data}
                                                        required
                                                        // {...register('to1')}
                                                        {...register(`to1[${i}]`)}
                                                    />)}

                                            </div> : ''
                                        )
                                    }
                                    )}
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "contactinquiry" ?
                                                <div className="form-group" key={i}>
                                                    <label className="form-control-label">CC</label>
                                                    {mail?.cc?.map((bccData, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={bccData}
                                                                onChange={(e) => handleBccChange(index, e.target.value)}
                                                                {...register(`cc1[${index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    {ccFields1.map((field, index) => (
                                                        <div key={field.id} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={field.value}
                                                                onChange={(e) => handleBccChange(index + mail?.bcc?.length, e.target.value)}
                                                                {...register(`cc1[${mail?.cc?.length + index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className="form-group d-flex justify-content-end">
                                                        <span type="button" onClick={() => addNewCcField('contactinquiry')} className="">
                                                            +Add
                                                        </span>
                                                    </div>
                                                </div> : ''
                                        );
                                    })}
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "contactinquiry" ?
                                                <div className="form-group" key={i}>
                                                    <label className="form-control-label">BCC</label>
                                                    {mail?.bcc?.map((bccData, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={bccData}
                                                                onChange={(e) => handleBccChange(index, e.target.value)}
                                                                {...register(`bcc1[${index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    {bccFields1.map((field, index) => (
                                                        <div key={field.id} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={field.value}
                                                                onChange={(e) => handleBccChange(index + mail?.bcc?.length, e.target.value)}
                                                                {...register(`bcc1[${mail?.bcc?.length + index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className="form-group d-flex justify-content-end">
                                                        <span type="button" onClick={() => addNewBccField('contactinquiry')} className="">
                                                            +Add
                                                        </span>
                                                    </div>
                                                </div> : ''
                                        );
                                    })}
                                    <div className="form-group d-flex justify-content-end">
                                        <input type="submit" value="Save" className="btn btn-primary" onClick={() => handleSectionChange('contactinquiry')} />
                                    </div>
                                </div>

                                {/* <div className="col-lg-4 mt-4">
                                    <div className='subtitle'>
                                        <h6>Book Appointment</h6>
                                    </div>
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "bookappointment" ? <div className="form-group">
                                                <label className="form-control-label">To</label>
                                                {mail?.to?.map((data, i) =>
                                                    <input type="text" placeholder="email" formcontrolname="email" name="email" className="form-control border"
                                                        defaultValue={data}
                                                        required
                                                        // {...register('to2')}
                                                        {...register(`to2[${i}]`)}
                                                    />)}

                                            </div> : ''
                                        )
                                    }
                                    )}
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "bookappointment" ?
                                                <div className="form-group" key={i}>
                                                    <label className="form-control-label">CC</label>
                                                    {mail?.cc?.map((bccData, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={bccData}
                                                                onChange={(e) => handleBccChange(index, e.target.value)}
                                                                {...register(`cc2[${index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    {ccFields2.map((field, index) => (
                                                        <div key={field.id} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={field.value}
                                                                onChange={(e) => handleBccChange(index + mail?.bcc?.length, e.target.value)}
                                                                {...register(`cc2[${mail?.cc?.length + index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className="form-group d-flex justify-content-end">
                                                        <span type="button" onClick={() => addNewCcField('bookappointment')} className="">
                                                            +Add
                                                        </span>
                                                    </div>
                                                </div> : ''
                                        );
                                    })}
                                    {mailReceiverData?.map((mail, i) => {
                                        return (
                                            mail.name === "bookappointment" ?
                                                <div className="form-group" key={i}>
                                                    <label className="form-control-label">BCC</label>
                                                    {mail?.bcc?.map((bccData, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={bccData}
                                                                onChange={(e) => handleBccChange(index, e.target.value)}
                                                                {...register(`bcc2[${index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    {bccFields2.map((field, index) => (
                                                        <div key={field.id} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                placeholder="email"
                                                                formcontrolname="email"
                                                                name="email"
                                                                className="form-control border"
                                                                defaultValue={field.value}
                                                                onChange={(e) => handleBccChange(index + mail?.bcc?.length, e.target.value)}
                                                                {...register(`bcc2[${mail?.bcc?.length + index}]`)}
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className="form-group d-flex justify-content-end">
                                                        <span type="button" onClick={() => addNewBccField('bookappointment')} className="">
                                                            +Add
                                                        </span>
                                                    </div>
                                                </div> : ''
                                        );
                                    })}
                                    <div className="form-group d-flex justify-content-end">
                                        <input type="submit" value="Save" className="btn btn-primary" onClick={() => handleSectionChange('bookappointment')} />
                                    </div>
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailSettings