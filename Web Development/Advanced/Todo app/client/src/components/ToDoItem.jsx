import { FaCheckCircle, FaCircle, FaPen, FaTrashAlt } from 'react-icons/fa';
import { categories } from './Categories';


function ToDoItem({todo, deleteToDo, editToDo, getToDoById}) {

    const onDelete = () => {
        deleteToDo(todo._id)
    }
    const onCheck = () => {
        editToDo(todo._id, todo.task, todo.category, !todo.isCompleted)
    }
    const onEdit = () => {
        getToDoById(todo._id)
    }

    return(

            <div className="flex px-4 py-3  *:text-blue-950 items-center rounded mb-3 bg-blue-100 hover:bg-blue-200">

                <p className='flex-1'>
                    <span className='capitalize'>{todo.task}</span>
                    {
                        categories.map((category) => {
                            if (category.name === todo.category) {
                                const { border, text, bg } = category.style || {};
                                return (
                                    <span 
                                        className={`px-2 py-0 rounded-full border-2 ${border} ${text} ${bg} ml-2 text-sm`} 
                                        key={category.name}
                                    >
                                        {category.name}
                                    </span>
                                )
                            }
                        })
                    }
                </p>

                <p className='flex items-center *:p-2 *:rounded *:transition-all *:duration-100'>
                    <span className='hover:bg-blue-300' onClick={onCheck}>
                        {
                            todo.isCompleted ? (
                                <FaCheckCircle size={20} color='green'/>
                            ) : (
                                <FaCircle className='border-2 border-green-600 rounded-full text-transparent' size={19}/>
                            )
                        }
                        
                    </span>
                    <span className='hover:bg-blue-300' onClick={onEdit}>
                        <FaPen size={15} color='purple' />
                    </span>
                    <span className='hover:bg-blue-300' onClick={onDelete}>
                        <FaTrashAlt size={15} color='red'/>
                    </span>
                </p>

            </div>

    )

}


export default ToDoItem;