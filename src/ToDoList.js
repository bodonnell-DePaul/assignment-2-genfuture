import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import { todos as initialTodos } from './todoItems';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState(initialTodos);
    const [activeKey, setActiveKey] = useState("#link0");
    const [newTodo, setNewTodo] = useState({ title: '', dueDate: '' });

    const getVariant = (dueDate) => {
        const currentDate = new Date();
        const dueDateObj = new Date(dueDate);
        const diffTime = Math.abs(dueDateObj - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        if (diffDays > 7) return 'primary';
        if (diffDays <= 7 && diffDays > 4) return 'success';
        if (diffDays <= 4 && diffDays > 2) return 'warning';
        return 'danger';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.title && newTodo.dueDate) {
            const newTodoItem = {
                title: newTodo.title,
                description: 'No description provided',
                dueDate: newTodo.dueDate,
            };
            setTodos(todos => [...todos, newTodoItem]);
            setNewTodo({ title: '', dueDate: '' });
            setActiveKey(`#link${todos.length}`);
        }
    };

    return (
        <Container>
            <h1>Assignment 2: ToDo List</h1>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handleSubmit} className="bg-success p-3 rounded">
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label className="text-white">Todo item</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add todo item"
                                name="title"
                                value={newTodo.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDueDate">
                            <Form.Label className="text-white">Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={newTodo.dueDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="primary" type="submit" size="lg">
                                Add Todo
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col md={8}>
                    <Tab.Container activeKey={activeKey} onSelect={k => setActiveKey(k)}>
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    {todos.map((todo, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            action
                                            href={`#link${index}`}
                                            className={`list-group-item-${getVariant(todo.dueDate)}`}
                                            role="tab"
                                        >
                                            {todo.title}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    {todos.map((todo, index) => (
                                        <Tab.Pane key={index} eventKey={`#link${index}`}>
                                            <h4>Description</h4>
                                            <Form.Control
                                                as="textarea"
                                                className="editable"
                                                defaultValue={todo.description}
                                            />
                                            <h4>Due Date</h4>
                                            <Form.Control
                                                type="date"
                                                defaultValue={todo.dueDate}
                                                className="editable"
                                            />
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
}

export default TodoList;
