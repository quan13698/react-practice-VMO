// import { Field, Form, Formik, useFormik } from "formik"
// import * as Yup from 'yup'

// function Register() {
//   // const formik = useFormik({
//   //   initalValues: {
//   //     firstName: '',
//   //     lastName: '',
//   //     sex: '',
//   //     birthday: '',
//   //     phone: '',
//   //     mail: '',
//   //   }
//   // } as any)
//   const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, 'Mininum 2 characters')
//       .max(30, 'Maximum 30 characters')
//       .required('Required'),
//     lastName: Yup.string()
//       .min(2, 'Mininum 2 characters')
//       .max(30, 'Maximum 30 characters')
//       .required('Required'),
//     sex: Yup.string()
//       .min(2, 'Mininum 2 characters')
//       .max(30, 'Maximum 30 characters')
//       .required('Required'),
//     birthday: Yup.date()
//       .required('Required'),
//   })


//   return (
//     <div className="register-container">
//       {/* <div className="register-form">
//         <div className="regiter-title">
//           <h3>Signup Information</h3>
//         </div>
//         <div className="first-name-field">
//           <div className="first-name-label">
//             <h6>First Name</h6>
//           </div>
//           <div className="first-name-input">
//             <input
//               type="text"
//               name="first-name"
//               // value={formik.values.firstName}
//               // onChange={formik.handleChange}
//             />
//           </div>
//         </div>
//         <div className="last-name-field">
//           <div className="last-name-label">
//             <h6>Last Name</h6>
//           </div>
//           <div className="last-name-input">
//             <input type="text" />
//           </div>
//         </div>
//         <div className="sex-field">
//           <div className="sex-input">
//             <h6>Sex</h6>
//           </div>
//           <div className="sex-dropdown">
//             <select name="sex-dropdown">
//               <option value="male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>
//         </div>
//         <div className="birthday-field">
//           <div className="birth-day-label">
//             <h6>Birthday:</h6>
//           </div>
//           <div className="birthday-picking">
//             <input type="date" name="birthday" />
//           </div>
//         </div>
//         <div className="phone-field">
//           <div className="phone-label">
//             <h6>Phone</h6>
//           </div>
//           <div className="phone-input">
//             <input type="text" />
//           </div>
//         </div>
//         <div className="mail-field">
//           <div className="mail-label">
//             <h6>Mail</h6>
//           </div>
//           <div className="mail-input">
//             <input type="text" />
//           </div>
//         </div>
//         <div className="signup-field">
//           <button>Sign up!</button>
//         </div>
//       </div> */}

//       <Formik
//         initalValues={{
//           firstName: '',
//           lastName: '',
//           sex: '',
//           birthday: '',
//           phone: '',
//           mail: '',
//         }}
//         validationSchema={SignupSchema}
//         onSubmit={(values) => {
//           console.log(values);
//           alert('asdasdas')
//         }}

//       >
//         {({ errors, touched }) => (
//          <Form>
//            <Field name="firstName" />
//            {errors.firstName && touched.firstName ? (
//              <div>{errors.firstName}</div>
//            ) : null}
//            {/* <Field name="lastName" />
//            {errors.lastName && touched.lastName ? (
//              <div>{errors.lastName}</div>
//            ) : null}
//            <Field name="email" type="email" />
//            {errors.email && touched.email ? <div>{errors.email}</div> : null}
//            <button type="submit">Submit</button> */}
//          </Form>
//        )}
//       </Formik>
//     </div>
//   )
// }


import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export function Register() {
  const DropdownTest = (props) => {
    return (
      <Dropdown options={sexOption} value={sexOption[0]} {...props} />
    )
  }
  
  const regexString = new RegExp(/^([a-zA-Z\s])+$/)
  const PHONE_REGEX = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
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
    // sex: Yup.string()
    //   .required('sex is required'),
    birthday: Yup.date()
      .required('birthday is required'),
    phone: Yup.string()
      .matches(PHONE_REGEX, 'not valid')
      .required('phone is required'),
    mail: Yup.string()
      .email('Invalid')
      .required('mail is required')
  });
  
  const initial = {
    firstName: '',
    lastName: '',
    sex: '',
    birthday: '',
    phone: '',
    mail: '',
  }
  const sexOption = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ]
  const context = useContext(UserContext)
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login')
    // alert('Signup successfully!')
  }
  const submitSignupHandler = (e) => {
    e.preventDefault()
    context.onSignedUp()
  }
  return (
    // <UserContext.Consumer>
      <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={initial}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              console.log(values);
              alert("Form is validated! Submitting the form...");
            }}
          >
            {({ touched, errors, isSubmitting, values }) =>
              !isSubmitting ? (
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

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                      // onClick={navigateToLogin}
                      onSubmit={submitSignupHandler}
                    >
                      Sign up!
                    </button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h1 className="p-3 mt-5">Form Submitted</h1>

                  <div className="alert alert-success mt-3">
                    Thank for your connecting with us. Here's what we got from
                    you !
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">firstName: {values.firstName}</li>
                    <li className="list-group-item">
                      lastName: {values.lastName}
                    </li>
                    <li className="list-group-item">sex: {values.sex}</li>
                    <li className="list-group-item">birthday: {values.birthday}</li>
                    <li className="list-group-item">phone: {values.phone}</li>
                    <li className="list-group-item">mail: {values.mail}</li>
                  </ul>
                </div>
              )
            }
          </Formik>
        </div>
      </div>
    </div>
    // </UserContext.Consumer>
  );
}
// class Register extends React.Component {

//   render() {


//   }
// }
export default Register
