import { useEffect, useState } from 'react'
import { db } from '../firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from 'firebase/firestore'
import Todo from './Todo'

export default function TodoList() {
  const [todos, SetTodos] = useState([])
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
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const count = todos.filter(todo => todo.isDone === true).length
    setDoneTodoNum(count)
  }, [todos])

  useEffect(() => {
    const count = todos.filter(todo => todo.isDone === false).length
    setRemainTodoNum(count)
  }, [todos])

  return (
    <>
      <ul className="todo_list">
        {todos.map(todo => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>

      <div className="todo_bottom">
        <span>전체 : {todos.length}</span>
        <span>완료한 일 : {doneTodoNum}</span>
        <span>남은 일 : {remainTodoNum}</span>
      </div>
    </>
  )
}
