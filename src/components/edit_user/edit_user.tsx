import { useContext, useState } from 'react'
import * as Yup from "yup";
import { IRegisterPayload, UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';

function EditUser() {

    const regexString = new RegExp(/^([a-zA-Z\s])+$/)
    const PHONE_REGEX = new RegExp(/^\(?([0-9]{3})\)?([\s.-]?)([0-9]{3})\2([0-9]{4})$/)
    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .matches(regexString, 'not valid')
            .min(2, "minium 2 characters")
            .max(20, 'maximun 20 characters'),
        lastName: Yup.string()
            .matches(regexString, 'not valid')
            .min(2, "minium 2 characters"),
        birthday: Yup.date(),
        phone: Yup.string()
            .matches(PHONE_REGEX, 'not valid'),
        mail: Yup.string()
            .email('Invalid'),
        password: Yup.string()
            .min(6, 'password required 6 characters')
    });

    const context = useContext(UserContext)
    const navigate = useNavigate();

    const submitUpdateUserHandler = (value: IRegisterPayload) => {
        context.onEditUser(value, () => {
            navigate('/dashboard')
        })
    }
    const getValue = (value: any) => {
        const checkWhoClicked = JSON.parse(localStorage.getItem('isEditing') as any);
        const userData = JSON.parse(localStorage.getItem('userList') as any);
        let a: any;
        userData.forEach((e: any) => {
            if (checkWhoClicked === e.mail) {
                a = e
            }
        })
        const { firstName, lastName, sex, birthday, phone, mail, password } = a;
        switch (value) {
            case 'firstName':
                return firstName
            case 'lastName':
                return lastName
            case 'sex':
                return sex
            case 'birthday':
                return birthday
            case 'phone':
                return phone
            case 'mail':
                return mail
            case 'password':
                return password
            default:
                break;
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: `${getValue('firstName')}`,
            lastName: `${getValue('lastName')}`,
            sex: `${getValue('sex')}`,
            birthday: `${getValue('birthday')}`,
            phone: `${getValue('phone')}`,
            mail: `${getValue('mail')}`,
            password: `${getValue('password')}`
        },
        onSubmit: values => {
            context.onEditUser(values, () => {
                navigate('/dashboard')
            })
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Formik
                        initialValues={formik.initialValues}
                        validationSchema={RegisterSchema}
                        onSubmit={submitUpdateUserHandler}
                    >
                        {({ touched, errors }) =>
                            <div>
                                <div className="row mb-5">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="mt-5">Edit user information</h1>
                                    </div>
                                </div>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field
                                            type="firstName"
                                            name="firstName"
                                            onChange={formik.handleChange}
                                            value={formik.values.firstName}
                                            className={`mt-2 form-control
              ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                        />

                                        <ErrorMessage
                                            component="div"
                                            name="firstName"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName" className="mt-3">
                                            Last Name
                                        </label>
                                        <Field
                                            type="lastName"
                                            name="lastName"
                                            onChange={formik.handleChange}
                                            value={formik.values.lastName}
                                            className={`mt-2 form-control
              ${touched.lastName && errors.lastName
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="lastName"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lastName" className="mt-3">
                                            Sex
                                        </label>
                                        <Field as="select"
                                            name="sex"
                                            onChange={formik.handleChange}
                                            value={formik.values.sex}
                                            className={`mt-2 border flex w-full px-2 h-9
                ${touched.sex && errors.sex
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                        <ErrorMessage
                                            component="div"
                                            name="sex"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday" className="mt-3">
                                            Birthday
                                        </label>
                                        <Field
                                            type="date"
                                            name="birthday"
                                            onChange={formik.handleChange}
                                            value={formik.values.birthday}
                                            className={`mt-2 form-control
              ${touched.birthday && errors.birthday
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="birthday"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone" className="mt-3">
                                            Phone
                                        </label>
                                        <Field
                                            type="phone"
                                            name="phone"
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            className={`mt-2 form-control
              ${touched.phone && errors.phone
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        />

                                        <ErrorMessage
                                            component="div"
                                            name="phone"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mail" className="mt-3">
                                            Mail
                                        </label>
                                        <Field
                                            type="mail"
                                            name="mail"
                                            onChange={formik.handleChange}
                                            value={formik.values.mail}
                                            className={`mt-2 form-control
              ${touched.mail && errors.mail
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="mail"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="mt-3">
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            className={`mt-2 form-control
              ${touched.password && errors.password
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="password"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    >
                                        Save
                                    </button>
                                </Form>
                            </div>
                        }
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default EditUser