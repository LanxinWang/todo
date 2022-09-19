import React from 'react';
import './index.css';

const TodoAdd = ({getNewItem,toggleAll,todoLength}) => {
    const handleCheck = ({target}) =>{
        toggleAll(target.checked)
    }
    
    const handleOnKeyDown =(event) =>{
        let content = event.target.value.trim();
        if (event.keyCode===13 && content !== '') {
            getNewItem(content);
            event.target.value = '';
        }
    }
    
    return (
        <div id='add-todo'>
            <input id="toggle-all" type="checkbox" onChange={handleCheck} />
            <label htmlFor="toggle-all" style={{ visibility: todoLength > 0 ? 'visible' : 'hidden' }}>❯</label>
            <input id="new-todo" placeholder="What needs to be done?" onKeyDown={handleOnKeyDown}></input>
        </div>
    )
}

export default TodoAdd;


