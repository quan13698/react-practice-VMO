import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const DashBoard = () => {
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    const navigateToLogin = () => {
      navigate('/login')
    }
    const logoutHandler = () => {
      context.onLogout(navigateToLogin)
    }
  return (
    <>
    {/* <div>
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
              //   </div> */}
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default DashBoard
