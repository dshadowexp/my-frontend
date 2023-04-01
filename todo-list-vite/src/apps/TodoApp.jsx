import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';

import Header from '../components/header'
import AddTodo from '../components/add-todo';
import TodoList from '../components/todo-list';
import SearchInput from '../components/search-input';

export default function TodoApp() {
    const [editIndex, setEditIndex] = useState(null);
    const [todos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const titleInputRef = useRef('');

    const filteredTodos = useMemo(() => {
        return todos.filter(
        (todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, todos])

    useEffect(() => {
        const controller = new AbortController();

        axios.get('http://localhost:8080/api/todos', {
        signal: controller.signal
        })
        .then((response) => {
            setTodos(response.data);
        })
        .catch((err) => {
            if (!axios.isCancel(err)) {
            console.log(err);
            }
        });

        return () => {
        controller.abort();
        }
    }, []);

    async function addTodo() {
        const todoTitle = titleInputRef.current.value;

        if (todoTitle.trim() === '')
        return;
        axios.post('http://localhost:8080/api/todos', {
        title: todoTitle.trim()
        }).then((response) => {
        setTodos([...todos, response.data]);
        titleInputRef.current.value = '';
        }).catch(error => {
        console.log(`Error; ${error}`);
        });  
    }

    function completeTodo(todoId) {
        const todoToUpdate = todos.find((todo) => todo._id === todoId);
        axios.put(`http://localhost:8080/api/todos/${todoId}`, {
            active: !todoToUpdate.active
        })
            .then(response => {
            setTodos(todos.map((todo) => {
                if (todo._id == response.data._id) {
                return response.data;
                }
                return todo;
            }))
            })
            .catch((err) => {
            console.log(err);
            });
    }

    async function deleteTodo(todoId) {
        try {
        await axios.delete(`http://localhost:8080/api/todos/${todoId}`);
        setTodos(todos.filter((todo) => todoId != todo._id));
        } catch (err) {
        console.log(err)
        }
    }

    function editTodo(todoId) {
        let targetTodo = todos.find(todo => todo._id === todoId);
        titleInputRef.current.value = targetTodo.title;
        setEditIndex(todoId)
    }

    function updateTodo(e) {
        e.preventDefault();
        if (editIndex === null || titleInputRef.current.value.trim() === '')
        return;
        axios.put(`http://localhost:8080/api/todos/${editIndex}`, {
        title: titleInputRef.current.value.trim()
        })
        .then(response => {
            setTodos(todos.map((todo) => {
            if (todo._id == response.data._id) {
                return response.data;
            }
            return todo;
            }))
        })
        .catch((err) => {
            console.log(err);
            });
        cancelEdit();
    }

    function cancelEdit() {
        titleInputRef.current.value = '';
        setEditIndex(null);
    }

    return <div className='todo'>
        <Header />
        <main>
            <AddTodo 
                isAdd={editIndex === null}
                titleInputRef={titleInputRef} 
                addTodo={addTodo} 
                updateTodo={updateTodo}
                cancelEdit={cancelEdit}
            />
            <SearchInput 
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}}
            />
            <TodoList 
                todos={filteredTodos} 
                completeTodo={completeTodo} 
                editTodo={editTodo} 
                removeTodo={deleteTodo}
            />
        </main>
    </div>
}