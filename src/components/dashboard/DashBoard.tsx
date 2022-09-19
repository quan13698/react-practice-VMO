import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const DashBoard = () => {
  const context = useContext(AuthContext)

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login')
  }
  const navigateToEditUser = () => {
    navigate('/edit-user')
  }
  const logoutHandler = () => {
    context.onLogout(navigateToLogin)
  }

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userList') as any))
  const renderTableData = () => {
    const userList = localStorage.getItem('userList');
    const data = JSON.parse(userList as any);

    return data.map((e: any, i: any) => {
      const { firstName, lastName, sex, birthday, phone, mail, password } = e;
      return (
        <tr>
          <td className="border text-center w-32">{firstName}</td>
          <td className="border text-center w-32">{lastName}</td>
          <td className="border text-center w-32">{sex}</td>
          <td className="border text-center w-32">{birthday}</td>
          <td className="border text-center w-32">{phone}</td>
          <td className="border text-center w-32" id={e.mail}>{mail}</td>
          <td className="border text-center w-32">{password}</td>
          <td>
            <button className="border px-3 bg-green-200" onClick={() => handlerClickEditUser(e.mail, navigateToEditUser)}>Edit</button>
            <button className="border px-2 bg-red-400" onClick={() => handleOnclickDeleteBtn(mail)}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  const handlerClickEditUser = (value: any, callback: () => void) => {
    callback()
    localStorage.setItem('isEditing', JSON.stringify(value));
  }

  const handleOnclickDeleteBtn = (mail: any) => {
    const data = JSON.parse(localStorage.getItem('userList') as any);
    let index: any;
    data.filter((e: any, i: any) => {
      if (e.mail === mail) {
        index = i
        data.splice(index, 1)
        localStorage.setItem('userList', JSON.stringify(data))
        setUserInfo(JSON.parse(localStorage.getItem('userList') as any))
      }
    })
  }

  return (
    <div className="flex flex-row">
      <div className="">
        <table id="user">
          <tbody>
            <tr>
              <td className="border text-center bg-yellow-100" style={{ width: '100px' }}>firstName</td>
              <td className="border text-center bg-yellow-100" style={{ width: '100px' }}>lastName</td>
              <td className="border text-center bg-yellow-100" style={{ width: '100px' }}>sex</td>
              <td className="border text-center bg-yellow-100" style={{ width: '110px' }}>birthday</td>
              <td className="border text-center bg-yellow-100" style={{ width: '150px' }}>phone</td>
              <td className="border text-center bg-yellow-100" style={{ width: '150px' }}>mail</td>
              <td className="border text-center bg-yellow-100" style={{ width: '100px' }}>password</td>
            </tr>
          </tbody>
          <tbody>
            {renderTableData()}
            <button className="border px-2 bg-pink-200" onClick={() => navigate('/register')}>Add user</button>
          </tbody>
        </table>
      </div>
      <div >
        <button className="w-20 border" onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default DashBoard
