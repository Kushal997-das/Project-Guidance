import { useContext, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import Info from './Info';
import ToDoContext from '../contexts/ToDoContext';

function ToDoList() {

    const {allTodos, getAllToDo, editToDo, deleteToDo, getToDoById, loading, error} = useContext(ToDoContext)

    useEffect(() => {
        getAllToDo()
    }, [])

    return(
        <section className="my-4 mx-8">

           {
                loading ? (
                    <Info message="Loading..." />
                ) : (
                        allTodos && allTodos.map((todo) => {
                            return <ToDoItem todo={todo} key={todo._id} deleteToDo={deleteToDo} editToDo={editToDo} getToDoById={getToDoById}/>
                        })
                    )    
           }
           {
                allTodos && allTodos.length === 0 && <Info message="You have no tasks to complete!" />
           }
           {
                !loading && error && <Info message="Unable to process your request now. Please try again later!" />
           }

        </section>
    )

}


export default ToDoList;