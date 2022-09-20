import { useContext } from 'react'
import * as Yup from "yup";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { IRegisterPayload, UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';

function EditUser() {
    const DropdownTest = (props: any) => {
        return (
            <Dropdown options={sexOption} value={sexOption[0]} {...props} />
        )
    }

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

    const initial = {
        firstName: '',
        lastName: '',
        sex: '',
        birthday: '',
        phone: '',
        mail: '',
        password: ''
    }
    const sexOption = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ]
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
        userData.map((e: any) => {
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Formik
                        initialValues={initial}
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
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field
                                            type="firstName"
                                            name="firstName"
                                            placeholder={`${getValue('firstName')}`}

                                            // autocomplete="off"
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
                                            placeholder={`${getValue('lastName')}`}
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
                                        <Field

                                            type="select"
                                            name="sex"
                                            placeholder={`${getValue('sex')}`}
                                            className={`mt-2 
              ${touched.sex && errors.sex
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                            component={DropdownTest}
                                        />
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
                                            placeholder={`${getValue('birthday')}`}
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
                                            placeholder={`${getValue('phone')}`}
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
                                            placeholder={`${getValue('mail')}`}
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
                                            placeholder={`${getValue('password')}`}
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