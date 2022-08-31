import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { useNavigate } from "react-router-dom";
import { IRegisterPayload, UserContext } from "../../contexts/UserContext";
import { isMinusToken } from "typescript";

export function Register() {
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
      .max(20, 'maximun 20 characters')
      .required("firstName is required"),
    lastName: Yup.string()
      .matches(regexString, 'not valid')
      .min(2, "minium 2 characters")
      .required("lastName is required"),
    birthday: Yup.date()
      .required('birthday is required'),
    phone: Yup.string()
      .matches(PHONE_REGEX, 'not valid')
      .required('phone is required'),
    mail: Yup.string()
      .email('Invalid')
      .required('mail is required'),
    password: Yup.string()
      .min(6, 'password required 6 characters')
      .required('password is required')
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
  const navigateToLogin = () => {
    navigate('/login')
  }
  const submitSignupHandler = (value: IRegisterPayload) => {
    context.onSignedUp(value, navigateToLogin)
  }
  return (
      <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={initial}
            validationSchema={RegisterSchema}
            onSubmit={submitSignupHandler}
          >
            {({ touched, errors}) =>
              // !isSubmitting ? (
                <div>
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5">Register Form</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field
                        type="firstName"
                        name="firstName"
                        placeholder="Enter firstName"
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
                        placeholder="Enter lastName"
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
                        placeholder="Enter sex"
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
                        placeholder="Enter birthday"
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
                        placeholder="Enter phone"
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
                        placeholder="Enter mail"
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
                        placeholder="Enter password"
                        className={`mt-2 form-control
          ${touched.password && errors.password
                            ? "is-invalid"
                            : ""
                          }`}
                        // onChange={() => {}}
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
                      Sign up!
                    </button>
                  </Form>
                </div>
              // ) : (
              //   <div>
              //     <h1 className="p-3 mt-5">Form Submitted</h1>

              //     <div className="alert alert-success mt-3">
              //       Thank for your connecting with us. Here's what we got from
              //       you !
              //     </div>
              //     <ul className="list-group">
              //       <li className="list-group-item">firstName: {values.firstName}</li>
              //       <li className="list-group-item">
              //         lastName: {values.lastName}
              //       </li>
              //       <li className="list-group-item">sex: {values.sex}</li>
              //       <li className="list-group-item">birthday: {values.birthday}</li>
              //       <li className="list-group-item">phone: {values.phone}</li>
              //       <li className="list-group-item">mail: {values.mail}</li>
              //     </ul>
              //   </div>
              // )
            }
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register
