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

  const [todo, setTodo] = useState('');
  const enterKey = (e: any) => {
    if (e.key === "Enter") {
      setTodo(e.value)
      console.log('asdhkasjd');


    }
  }
  const renderTodoList = () => {
    return (
      <div className="flex flex-row">
        <input type="checkbox" />
        {/* <a href="">{todo}</a> */}
      </div>
    )
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setTodo('')
  }
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([] as any);
  const addItem = () => {
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
        // console.log('click');
        
    setItems((oldList: any) => [...oldList, item]);
    setNewItem("");
  }

  const handleDelete = (id: any) => {
    const a = items.filter((e: any) => e.id !== id)
    setItems(a)
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
    <div className="">
      <div className=" flex flex-row">
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
      <div className="">
        <button className="w-20 border" onClick={logoutHandler}>Logout</button>
      </div>
      <div className="w-screen h-screen flex bg-sky-500 justify-center">
        <div className="flex flex-col w-1/3 h-3/5 rounded justify-center bg-white my-auto">
          <div className="border w-5/6 h-5/6 mx-auto">
            <div className="flex flex-col">
              {/* <form action="" onSubmit={() => handleSubmit}>
                <div className="flex flex-row border h-12 ">
                  <input type="text" placeholder="Add a new task" className="w-full pl-3" onKeyDown={enterKey} onChange={(e: any) => setTodo(e.target.value)}/>
                </div>
              </form>
              <div className="flex flex-row my-2 justify-center">
                <div className="mx-2 font-extralight">
                  <p className="text-blue-600">All</p>
                </div>
                <div className="mx-2 font-extralight">
                  <p>Pending</p>
                </div>
                <div className="mx-2 font-extralight">
                  <p>Completed</p>
                </div>
                <div className="ml-16">
                  <button className="border rounded px-1.5 py-1 bg-blue-400">Clear All</button>
                </div>
              </div> */}
              <div className="flex flex-row border h-12 ">
                <input type="text" placeholder="Add a new task" className="w-full pl-3" onKeyDown={enterKey} value={newItem} onChange={(e: any) => setNewItem(e.target.value)} />
                <button className="border px-2 bg-blue-200" onClick={() => addItem()}>Add</button>
              </div>
            </div>
            <div className="flex flex-row my-2 justify-center">
                <div className="mx-2 font-extralight">
                  <p className="text-blue-600">All</p>
                </div>
                <div className="mx-2 font-extralight">
                  <p>Pending</p>
                </div>
                <div className="mx-2 font-extralight">
                  <p>Completed</p>
                </div>
                <div className="ml-16">
                  <button className="border rounded px-1.5 py-1 bg-blue-400">Clear All</button>
                </div>
            </div>
            {/* {renderTodoList()} */}
            {/* <div className="flex flex-row">
              <input type="checkbox" />
            </div> */}
              {items.map((item : any) => {
                return (
                  <div className="flex flex-row my-1">
                    <input className="mx-2" type="checkbox" />
                    <h5 className="font-normal" id={item.id} >{item.value}</h5>
                    <button className="w-full border text-right" onClick={() => handleDelete(item.id)}>delete</button>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
