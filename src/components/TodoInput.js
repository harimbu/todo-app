import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function TodoInput() {
  const [todoTitle, SetTodoTitle] = useState('')

  function handleChange(e) {
    SetTodoTitle(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    await addDoc(collection(db, 'todos'), {
      title: todoTitle,
      isDone: false,
      date: serverTimestamp(),
    })
    SetTodoTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="todo_input"
        type="text"
        placeholder="Write a todo.."
        onChange={handleChange}
        value={todoTitle}
      />
    </form>
  )
}
