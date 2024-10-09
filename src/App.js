import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
import TodoList from './ToDoList'; // Ensure the path is correct based on your project structure

function App() {
    return (
        <div className="App">
            <TodoList />
        </div>
    );
}

export default App;
