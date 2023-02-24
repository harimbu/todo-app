import { MdClose, MdDone, MdCheckBoxOutlineBlank, MdEdit } from 'react-icons/md'
import { db } from '../firebase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

export default function Todo({ todo }) {
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState(todo.title)

  function openModal() {
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }

  async function removeTodo() {
    await deleteDoc(doc(db, 'todos', todo.id))
  }

  async function toggleDone() {
    const todoRef = doc(db, 'todos', todo.id)
    await updateDoc(todoRef, {
      isDone: !todo.isDone,
    })
  }

  function handleChange(e) {
    setTitle(e.target.value)
  }

  async function editTodo(e) {
    e.preventDefault()
    const todoRef = doc(db, 'todos', todo.id)
    await updateDoc(todoRef, {
      title: title,
    })
    closeModal()
  }

  return (
    <li className={todo.isDone ? 'todo_item done' : 'todo_item'}>
      <div className="left">
        <div onClick={toggleDone}>
          {todo.isDone ? <MdDone /> : <MdCheckBoxOutlineBlank />}
        </div>
        <div>{todo.title}</div>
      </div>
      <div className="right">
        <div onClick={openModal}>
          <MdEdit />
        </div>
        <div onClick={removeTodo}>
          <MdClose />
        </div>
      </div>

      <div className={modal ? 'modal show' : 'modal'}>
        <h2>수정하기</h2>
        <form onSubmit={editTodo}>
          <input type="text" defaultValue={title} onChange={handleChange} />
        </form>
        <div className="btns">
          <button onClick={closeModal}>취소하기</button>
          <button onClick={editTodo}>수정하기</button>
        </div>
      </div>
    </li>
  )
}
