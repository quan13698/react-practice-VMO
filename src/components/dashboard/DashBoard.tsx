import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const DashBoard = () => {
    const context = useContext(AuthContext)
    console.log(context.isLoggedIn);
    
    
  return (
    <>
    <div>hi</div>
    <button onClick={context.onLogout}>Logout</button>
    </>
  )
}

export default DashBoard
