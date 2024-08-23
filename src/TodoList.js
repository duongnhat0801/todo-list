import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {

                const filteredTodos = response.data.filter(todo => todo.title.includes('task'));
                setTodos(filteredTodos);
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi tải todos!", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title: newTodo,
            completed: false
        })
            .then(response => {
                alert(`Thêm todo thành công: ${response.status}`);
                setTodos([...todos, response.data]);
                setNewTodo('');
            })
            .catch(error => {
                alert(`Thêm todo thất bại: ${error.message}`);
            });
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Nhập todo mới"
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
