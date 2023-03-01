import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import Todo from './Todo'

export default function TodoList() {
  const [todos, SetTodos] = useState([])
  const [filterTodos, setFilterTodos] = useState([])
  const [isEdit, setIsEdit] = useState(true)
  const [doneTodoNum, setDoneTodoNum] = useState(null)
  const [remainTodoNum, setRemainTodoNum] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      SetTodos(items)
      setFilterTodos(items)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const doneCount = todos.filter(todo => todo.isDone === true).length
    const remainCount = todos.filter(todo => todo.isDone === false).length
    setDoneTodoNum(doneCount)
    setRemainTodoNum(remainCount)
  }, [todos])

  function doneTodo() {
    const items = todos.filter(todo => todo.isDone === true)
    setFilterTodos(items)
    setIsEdit(false)
  }

  function remainTodo() {
    const items = todos.filter(todo => todo.isDone === false)
    setFilterTodos(items)
  }

  function allTodo() {
    setFilterTodos(todos)
    setIsEdit(true)
  }

  return (
    <>
      <ul className="todo_list">
        {filterTodos.map(todo => (
          <Todo todo={todo} key={todo.id} isEdit={isEdit} />
        ))}
      </ul>

      <div className="todo_bottom">
        <span onClick={allTodo}>전체 : {todos.length}</span>
        <span onClick={doneTodo}>완료한 일 : {doneTodoNum}</span>
        <span onClick={remainTodo}>남은 일 : {remainTodoNum}</span>
      </div>
    </>
  )
}
