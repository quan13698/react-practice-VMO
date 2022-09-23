import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const TAB_KEYS = [
  { id: "all", name: "All" },
  { id: "pending", name: "Pending" },
  { id: "completed", name: "Completed" },
];

export const TodoList = () => {
  const { isLoggedIn, loggedUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [tab, setTab] = useState("all");

  const allTodoList = JSON.parse(localStorage.getItem("todolist") || "[]");
  const userTodoList = allTodoList.filter(
    (item: any) => (item.userEmail = loggedUser.mail)
  );
  const [currentTodoList, setCurrentTodoList] = useState(userTodoList);

  if (!isLoggedIn) {
    return <div>You haven't logged in</div>;
  }

  const onChangeName = (e: any) => {
    const value = e.target.value;
    setName(value);
  };

  const onChangeTab = (tabKey: string) => {
    setTab(tabKey);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: new Date().getTime().toString(),
      name,
      userEmail: loggedUser.mail,
      completed: false,
    };
    const newAllTodoList = [...allTodoList, newTodo];
    localStorage.setItem("todolist", JSON.stringify(newAllTodoList));
    setCurrentTodoList([...currentTodoList, newTodo]);
    setName("");
  };

  const handleChangeTodoStatus = (e: any) => {
    const id = e.target.dataset.id;
    const newAllTodoList = allTodoList.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    localStorage.setItem("todolist", JSON.stringify(newAllTodoList));
    const newCurrentTodoList = currentTodoList.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });
    setCurrentTodoList(newCurrentTodoList);
  };

  const handleRemoveTodo = (id: string) => {
    const newAllTodoList = allTodoList.filter((item: any) => item.id !== id);
    localStorage.setItem("todolist", JSON.stringify(newAllTodoList));
    setCurrentTodoList(currentTodoList.filter((item: any) => item.id !== id));
  };

  const onKeyPress = (e: any) => {
    if (e.charCode === 13) {
      handleAddTodo();
    }
  };

  const handleClearAll = () => {
    setCurrentTodoList([]);
    const newAllTodoList = allTodoList.filter(
      (item: any) => item.userEmail !== loggedUser.mail
    );
    localStorage.setItem("todolist", JSON.stringify(newAllTodoList));
  };

  return (
    <div className="bg-blue-500 flex justify-center items-center h-screen w-screen">
      <div className="bg-white w-[450px] h-[700px] rounded py-7">
        <div className="h-full border-b border-gray-300">
          <div className="px-7">
            <input
              className="border-2 rounded w-full h-12 p-4 border-gray-400"
              placeholder="Add a new task"
              value={name}
              onChange={onChangeName}
              onKeyPress={onKeyPress}
            />
          </div>
          <div className="flex justify-between mt-5 items-center px-7 pb-4 border-b border-gray-300">
            <div className="flex gap-5">
              {TAB_KEYS.map((item) => (
                <div
                  key={item.id}
                  data-id={item.id}
                  onClick={() => onChangeTab(item.id)}
                >
                  <span
                    className={`${
                      tab === item.id
                        ? "text-blue-800 font-semibold inline-block border-b-2 border-blue-800"
                        : ""
                    } cursor-pointer`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <button
                className="rounded px-4 py-1 bg-cyan-600 text-white"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="px-7 pb-7 flex flex-col overflow-y-auto max-h-[524px]">
            {currentTodoList
              .filter((item: any) =>
                tab === "all" ? true : tab === "pending"
                  ? item.completed === false
                  : item.completed
              )
              .map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-300"
                >
                  <div className="flex gap-5 items-center py-5">
                    <input
                      type="checkbox"
                      id={item.id}
                      name={item.id}
                      value={item.completed}
                      checked={item.completed}
                      data-id={item.id}
                      onChange={handleChangeTodoStatus}
                    />
                    <label htmlFor={item.id}>{item.name}</label>
                  </div>
                  <div
                    className="cursor-pointer hover:text-blue-700"
                    onClick={() => handleRemoveTodo(item.id)}
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
