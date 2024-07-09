import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  // const [showfinshed, setshowfinshed] = useState(false)

  const gettodos = async () => {
    let req = await fetch("https://todobackend-731l.onrender.com/")
    let todoString = await req.json()
    setTodos(todoString)
    console.log(todoString)
    // setshowfinshed(localStorage.getItem('showfinshed'))
    
  }

  useEffect(() => {
    gettodos()
  }, [])

  // const savetols = async (params) => {
  //   let res = await fetch("http://localhost:3000/", {
  //     method: "POST", headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...todos, id: uuidv4() })
  //   })
  //   // localStorage.setItem("todos", JSON.stringify(todos))
  // }


  const handlechange = (e) => {
    setTodo(e.target.value)
  }
 
  const handleadd = async () => {
    // Create a new todo object
    const newTodo = { id: uuidv4(), todo, iscompleted: false };
  
    // Update the todos state with the new todo
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
  
    // Send the new todo data to the server for saving
    let res = await fetch("https://todobackend-731l.onrender.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo) // Send only the new todo, not the entire todos array
    });
  }



  const handleedit = async(e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
 
    let res = await fetch("https://todobackend-731l.onrender.com/", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos);
    
  }



  const handledelete = async(e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
      
    })
    let res = await fetch("https://todobackend-731l.onrender.com/", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    // confirm("are ypu sure you want to delete todo")
    setTodos(newtodos);
  }


  const handlecheakbox = async (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
  
    // Create a copy of the todo item with the 'iscompleted' property toggled
    const updatedTodo = { ...todos[index], iscompleted: !todos[index].iscompleted };
  
    // Update the todos state
    const newTodos = [...todos];
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
    
    
   
  };
  





  return (
    <>
      <Navbar />

      <div className=' bg-blue-200 px-3 py-2  my-1 rounded-xl md:w-1/2 md:mx-auto w-full '>
        <div className="addtodo  w-full ">
          <div className=" px-3 py-4">

            <h1 className=' font-bold md:text-xl text-lg'>Add new todo</h1>
            <div className='flex'>
              <input onChange={handlechange} value={todo} className=' md:w-1/2 w-full px-3' type="text" />
              <button onClick={handleadd} disabled={todo.length <= 3} className=' bg-blue-950 rounded-md px-2 py-1 text-sm mx-3 text-white font-bold'>Add</button>
            </div>
          </div>
        </div>


        <div className="todos  ">
        {/* <div className='flex gap-4 mx-3 my-3 font-bold' >
            <input onChange={togglechange} type="checkbox" id="show" checked={showfinshed} />
            <div>Show finshed</div>
          </div> */}

          <h2 className=' font-bold' >Your todos</h2>
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return  <div key={item.id} className="todo flex w-full justify-between my-2 ">

              <div className=' flex gap-4 '>
                <input onChange={handlecheakbox} type="checkbox" name={item.id} id="" />
                <div className={item.iscompleted ? 'line-through' : ""} > {item.todo} </div>
              </div>
              <div className="buttons flex h-full text-xl">

                <button onClick={(e) => handleedit(e, item.id)} className=' bg-blue-950 rounded-md px-2 py-1 text-sm mx-1 text-white font-bold'><FaEdit /></button>
                <button onClick={(e) => handledelete(e, item.id)} className=' bg-blue-950 rounded-md px-2 py-1 text-sm mx-1 text-white font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>


    </>
  )
}

export default App
