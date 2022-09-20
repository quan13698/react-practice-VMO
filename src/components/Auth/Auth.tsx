import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ILoginPayload } from "../../contexts/AuthContext";
import * as Yup from "yup";

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

    const context = useContext(AuthContext);
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

    const getData = (e: any) => {
        const { value, name } = e.target;
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
        userData.map((e: any) => {
            if (e.mail === mail && e.password === password) {
                return context.onLogin(e, navigateToDashBoard)
            } else {
                return console.log('invalid email or password');
            }
        })
    }

    return (
        
        <div className="bg-blue-500 grid grid-col-1 sm:grid-cols-1 h-screen w-full">
            <div className="flex flex-col justify-center">
                <Formik
                    initialValues={initialLoginForm}
                    validationSchema={loginSchema}
                    onSubmit={submitHandler}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form className="max-w-[400px] w-full mx-auto bg-white p-10">
                                <h2 className="text-x4xl text-center py-4">Login Form</h2>
                                <div className="flex flex-col py-2">
                                    <label className="flex flex-col" onChange={getData}>
                                        Enter mail: <Field className="border h-8" type="mail" name="mail" />
                                        <ErrorMessage className="text-red-500" name="mail" component="div" />
                                    </label>
                                </div>
                                <div className="flex flex-col py-2">
                                    <label className="flex flex-col" onChange={getData}>
                                        Enter password:
                                        <Field className="border h-8" type="password" name="password" />
                                        <ErrorMessage className="text-red-500" name="password" component="div" />
                                    </label>
                                </div>
                                <div className="text-center py-3">
                                    <button className="border bg-blue-400 py-2 w-40" type="submit" >
                                        Submit
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button className="font-extralight" onClick={navigateToRegister}>Register?</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default Auth;