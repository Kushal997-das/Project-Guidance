import Header from "../components/Header";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";
import ToDoContext from "../contexts/ToDoContext";
import ToDoService from "../services/ToDoService";

function Home() {

    const { allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo } = ToDoService();

    return (
        <>
            <Header />
            <ToDoContext.Provider value={{ allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo }}>
                <ToDoForm/>
                <ToDoList/>
            </ToDoContext.Provider>
        </>
    )

}

export default Home;