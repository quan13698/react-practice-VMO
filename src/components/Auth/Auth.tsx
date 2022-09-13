import { ErrorMessage, Field, Form, Formik, setIn } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ILoginPayload } from "../../contexts/AuthContext";
import * as Yup from "yup";
import { render } from "@testing-library/react";
// import { IloginPayload } from "../../contexts/UserContext";



function Auth() {
    const navigate = useNavigate();
    const navigateToDashBoard = () => {
        navigate('/dashboard')
    }
    const navigateToRegister = () => {
        navigate('/register')
    }
    const [info, setInfo] = useState({
        mail: '',
        password: ''
    });
    const { mail, password } = info;
    const [data, setData] = useState([])

    const context = useContext(AuthContext);
    let mailFromLS = localStorage.getItem('userList')



    const initialLoginForm = {
        mail: '',
        password: ''
    }
    const loginSchema = Yup.object().shape({
        mail: Yup.string()
            .email('invalid')
            .required('mail is required'),
        password: Yup.string()
            .required('password is required')
    })
    const submitLoginHandler = () => {

    }



    const getData = (e: any) => {
        const { value, name } = e.target;
        console.log(name);

        setInfo(() => {
            return {
                ...info,
                [name]: value
            }
        })
        
    }
    const submitHandler = (e: ILoginPayload) => {
        const getUserList = localStorage.getItem('userList');
        const userData = JSON.parse(getUserList as any);
        userData.filter((e: any) => {
            if(e.mail === mail && e.password === password) {
                context.onLogin(e, navigateToDashBoard)
            }
            console.log("wrong mail or password");
        })

    }
    return (
        <div className="containerr">
            <div className="auth-form-container">
                <Formik
                    initialValues={initialLoginForm}
                    validationSchema={loginSchema}
                    onSubmit={submitHandler}
                >
                    
                    {({ isSubmitting }) => {
            return (
              <Form>
                <label onChange={getData}>
                  Email: <Field type="mail" name="mail" />
                  <ErrorMessage name="mail" component="div" />
                </label>
                <label onChange={getData}>
                  Password:
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            );
          }}

                </Formik>
            </div>
        </div>
    );
}

export default Auth;