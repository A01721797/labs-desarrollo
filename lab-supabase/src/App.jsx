import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const consulta = async () => {
        const { data, error } = await supabase.from("directorio").select("*");
        if (error) {
            console.log("Error de conexion en consulta: ", error);
        } else {
            setTodoList(data);
        }
    };

    useEffect(() => {
        consulta();
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return; // Evita insertar strings vacíos
        const newTodoData = {
            name: newTodo.trim(),
            isCompleted: false,
            partido: null,
            anio_ingreso: null,
        };
        const { data, error } = await supabase
            .from("directorio")
            .insert([newTodoData])
            .select(); // Esto hace que retorne los datos insertados
        if (error) {
            console.log("Error en el insert: ", error);
        } else {
            setTodoList((prev) => [...prev, data[0]]);
            setNewTodo("");
        }
    };

    const completeTask = async (id, isCompleted) => {
        const { error } = await supabase
            .from("directorio")
            .update({ isCompleted: !isCompleted })
            .eq("id", id);
        if (error) {
            console.log("error en el update task: ", error);
        } else {
            setTodoList((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
                )
            );
        }
    };

    const deleteTask = async (id) => {
        const { error } = await supabase.from("directorio").delete().eq("id", id);
        if (error) {
            console.log("error deleting task: ", error);
        } else {
            setTodoList((prev) => prev.filter((todo) => todo.id !== id));
        }
    };

    const remaining = todoList.filter((todo) => !todo.isCompleted).length;

    return (
        <div className="todo-app">
            <h1>Lista de personas</h1>

            <form className="todo-form" onSubmit={addTodo}>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="¿A quién quieres registrar?"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="todo-add-btn">
                    Add
                </button>
            </form>

            {todoList.length === 0 ? (
                <p className="todo-empty">No hay nadie registrado.</p>
            ) : (
                <ul className="todo-list">
                    {todoList.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item${todo.isCompleted ? " is-completed" : ""}`}
                        >
                            <label className="todo-checkbox">
                                <input
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    onChange={() => completeTask(todo.id, todo.isCompleted)}
                                />
                                <span className="todo-name">{todo.name}</span>
                            </label>
                            <button
                                type="button"
                                className="todo-delete"
                                aria-label={`Delete "${todo.name}"`}
                                onClick={() => deleteTask(todo.id)}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {todoList.length > 0 && (
                <p className="todo-footer">
                    {remaining} {remaining === 1 ? "task" : "personas"} registradas
                </p>
            )}
        </div>
    );
}

export default App;
