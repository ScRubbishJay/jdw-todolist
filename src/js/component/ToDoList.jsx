import React, { useState } from "react";

const ToDoList = () => {
    // establish state variables
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    // helper functions
    const addItem = () => {
        const newItem = {
            id: Math.floor(Math.random() * 1000),
            value: inputValue
        };

        
        setItems(prevItems => [...prevItems, newItem]);
        setInputValue("");
    };

    const deleteItem= (id)=>{
        const newArray= items.filter(items => items.id !== id);
        setItems(newArray);
    ;
    }
    return (
        <div>
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
                    {items.map(item => (
                        <li key={item.id}>{item.value} <button onClick={()=>deleteItem()}>x</button></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;
