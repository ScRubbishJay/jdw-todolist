import React, { useState, useEffect } from "react";
import './ToDoList.css';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [feature, setFeature] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getData();
            if (data && data.todos) {
                setFeature(data.todos);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addItem = async () => {
        // Add a new task to the list and update the backend
        const newFeature = {
            id: Math.floor(Math.random() * 1000),
            value: inputValue
        };

        // Update the local state
        setFeature(prevFeature => [...prevFeature, newFeature]);
        setInputValue("");

        // Update the backend
        await updateBackend(feature.concat(newFeature));
    };

    const deleteItem = async (id) => {
        // Delete a task from the list and update the backend
        const newArray = feature.filter(feature => feature.id !== id);

        // Update the local state
        setFeature(newArray);

        // Update the backend
        await updateBackend(newArray);
    };

    const clearAllTasks = async () => {
        // Clear all tasks from the list and update the backend
        setFeature([]);

        // Update the backend with an empty array
        await updateBackend([]);
    };

    const updateBackend = async (updatedList) => {
        // Update the backend with the new list
        try {
            const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/jwalker', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todos: updatedList }),
            });

            if (!response.ok) {
                console.error('Error updating backend:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating backend:', error);
        }
    };
    

    return (
        <div className="toDoList">
            <div>
                <h1>To Do List</h1>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Add items here..."
                />
                <button onClick={addItem}>Add Item</button>
                <button onClick={clearAllTasks}>Clear All Tasks</button>
            </div>
            <div>
                <ul>
                    {feature.map(feature => (
                        <li key={feature.id}>{feature.value} <button onClick={() => deleteItem(feature.id)}>x</button></li>
                    ))}
                </ul>
                <p> Only <i>{feature.length}</i> more to go!</p>
            </div>
        </div>
    );
};

export default ToDoList;
