import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Task({ task, getTask }) {
 
  const [editId, setEditId] = useState(null)
  const [editTaskText, setEditTaskText] = useState('')
  const [editLevel, setEditLevel] = useState('')

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/task/${id}`)
      .then(() => {
        getTask()
        toast.error('Удалено')
      })
      .catch((e) => console.log(e))
  }

  
  const handleEdit = (item) => {
    setEditId(item.id)
    setEditTaskText(item.task)
    setEditLevel(item.level)
  }


  const handleCancel = () => {
    setEditId(null)
    setEditTaskText('')
    setEditLevel('')
  }


  const handleSave = (id) => {
    if (!editTaskText.trim()) {
      toast.warning('Введите текст задачи')
      return
    }

    axios.patch(`http://localhost:8000/task/${id}`, {
      task: editTaskText,
      level: editLevel
    })
      .then(() => {
        getTask()
        setEditId(null)
        toast.success('Задача обновлена!')
      })
      .catch((e) => {
        console.log(e)
        toast.error('Ошибка при обновлении')
      })
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {
        task?.map((item) => (
          <div key={item.id} style={{
            border: `1px solid ${
              item?.level === 'hard' ? 'red'
              : item?.level === 'medium' ? 'yellow'
              : 'green' 
            }`,
            padding: '10px',
            margin: '10px'
          }}>
            {editId === item.id ? (
              
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <select
                  value={editLevel}
                  onChange={(e) => setEditLevel(e.target.value)}
                  style={{ marginRight: '10px' }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <button onClick={() => handleSave(item.id)} style={{ marginRight: '5px' }}>
                  Сохранить
                </button>
                <button onClick={handleCancel}>
                  Отмена
                </button>
              </div>
            ) : (
              
              <div>
                <h2>{item.task}</h2>
                <button onClick={() => handleEdit(item)} style={{ marginRight: '5px' }}>
                  Редактировать
                </button>
                <button onClick={() => deleteTask(item.id)}>
                  Удалить
                </button>
              </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

