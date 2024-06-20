import { useContext, useEffect, useRef, useState } from "react";
import { categories } from "./Categories";
import ToDoContext from "../contexts/ToDoContext";

function ToDoForm() {

    const { toDo, addToDo, editToDo, setToDo } = useContext(ToDoContext)
    const [toDoData, setToDoData] = useState({ task: "", category: categories[0].name });
    const taskInput = useRef()

    useEffect(() => {
        if (toDo) {
            setToDoData(prev => {
                return { ...prev, task: toDo.task, category: toDo.category };
            });
            taskInput.current.focus()
        }
    }, [toDo])

    const clearForm = () => {
        setToDoData(prev => {
            return { ...prev, task: "", category: categories[0].name };
        });
    }

    const handleInputChange = (name, value) => {
        setToDoData(prev => {
            return { ...prev, [name]: value };
        });
    }

    const onAdd = (e) => {
        e.preventDefault()
        addToDo(toDoData.task, toDoData.category)
        clearForm()

    }

    const onEdit = (e) => {
        e.preventDefault()
        editToDo(toDo._id, toDoData.task, toDoData.category, toDo.isCompleted)
        clearForm()
    }

    const onCancel = (e) => {
        e.preventDefault()
        setToDo(null)
        clearForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form
            className="my-4 mx-8 flex"
            onSubmit={handleSubmit}
        >
            <select
                className="p-3 border-2 border-blue-900 text-blue-950 border-r-0 focus:ring-2 focus:ring-blue-500 outline-none rounded-l"
                name="category"
                value={toDoData.category}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
                {
                    categories.map((category) => {
                        return (
                            <option
                                value={category.name}
                                key={category.name}
                            >
                                {category.name}
                            </option>
                        )
                    })
                }
            </select>
            <input
                className="flex-1 border-2 border-blue-900 text-blue-950 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                ref={taskInput}
                placeholder="Enter task"
                name="task"
                value={toDoData.task}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {
                toDo &&
                <>
                    <button
                        className="bg-gray-500 px-6 py-3 hover:bg-gray-600 text-white focus:ring-2 focus:ring-gray-300"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-900 px-6 py-3 hover:bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 rounded-r"
                        onClick={onEdit}
                    >
                        Update
                    </button>
                </>
            }
            {
                !toDo && (
                    <button
                        className="bg-blue-900 px-6 py-3 hover:bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 rounded-r"
                        onClick={onAdd}
                    >
                        Add
                    </button>
                )
            }
        </form>
    )
}

export default ToDoForm;