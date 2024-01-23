import React, { useState } from "react";
import './ToDoList.css';
 
const ToDoList = () => {
    // establish state variables
    const [inputValue, setInputValue] = useState('');
    const [feature, setFeature] = useState([]);

    // helper functions
    const addItem = () => {
        const newFeature = {
            id: Math.floor(Math.random() * 1000),
            value: inputValue
        };

        
        setFeature(prevFeature => [...prevFeature, newFeature]);
        setInputValue("");
    };

    const deleteItem= (id)=>{
        const newArray= feature.filter(feature => feature.id !== id);
        setFeature(newArray);
    ;
    }

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
            </div>
            <div>
                <ul>
                    {feature.map(feature => (
                        <li key={feature.id}>{feature.value} <button onClick={()=>deleteItem(feature.id)}>x</button></li>
                    ))}
                </ul>
                <p> Only <i>{feature.length}</i> more to go!</p>
            </div>
        </div>
    );
};

export default ToDoList;
