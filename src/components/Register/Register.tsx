import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { useNavigate } from "react-router-dom";
import { IRegisterPayload, UserContext } from "../../contexts/UserContext";

export function Register() {
  const [select, setSelect] = useState("");
  const handleChange = (e: any) => {
    setSelect(e.target.value)
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
    <div className="bg-green-200 h-screen justify-center flex flex-col">
      <Formik
        initialValues={initial}
        validationSchema={RegisterSchema}
        onSubmit={submitSignupHandler}
      >
        {({ touched, errors }) =>
          <div className="flex flex-col w-full mx-auto bg-white max-w-[450px] ">
            <div className="">
              <div className="my-3 text-center">
                <h1 className="text-pink-200">Register Form</h1>
              </div>
            </div>
            <Form className="w-full flex flex-col">
              <div className="mx-auto w-80">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="firstName"
                  name="firstName"
                  placeholder="Enter firstName"
                  className={`mt-2 form-control
          ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                />

                <ErrorMessage
                  component="div"
                  name="firstName"
                  className="invalid-feedback"
                />
              </div>

              <div className="mx-auto w-80">
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

              <div className="mx-auto w-80">
                <label htmlFor="sex" className="mt-3 flex">
                  Sex
                </label>
                <Field as="select"
                  // type="drop-down"
                  name="sex"
                  // value={select}
                  // onChange={handleChange}
                  className={`mt-2 border flex w-full px-2 h-9
          ${touched.sex && errors.sex
                      ? "is-invalid"
                      : ""
                    }`}
                // component={DropdownTest}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage
                  component="div"
                  name="sex"
                  className="invalid-feedback"
                />
              </div>
              <div className="mx-auto w-80">
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
              <div className="mx-auto w-80">
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
              <div className="mx-auto w-80">
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
              <div className="mx-auto w-80">
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
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>

              <button
                type="submit"
                className="mx-auto text-white bg-blue-500 w-80 border my-4 py-2"
              >
                Sign up!
              </button>
            </Form>
          </div>
        }
      </Formik>
    </div>
  );
}

export default Register
