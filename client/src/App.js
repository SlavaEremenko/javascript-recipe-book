import React from 'react';
import Todo from './Todo.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos
    }

    this.todoInput = "";
  }

  addTodo() {
    if (this.todoInput.value.length > 0) {
      var newTodo = { title: this.todoInput.value, done: false };
      var newTodos = this.state.todos.concat(newTodo);
      this.setState({ todos: newTodos });
      this.todoInput.value = "";

    fetch("http://" + window.location.host + ":5000/todos", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTodo) }).then(response => response.json())
      .then(response => {
        console.log(response);
      });
    }
  }

  deleteTodo(index) {
    var newTodos = this.state.todos.filter((todo,i) => { return i !== index });
    this.setState({
      todos: newTodos
    });
  }

  changeChecked(index) {
    var newTodos = this.state.todos
    newTodos[index].done = !newTodos[index].done;
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div>
        <h1>React ToDo App</h1>
        <p> Todo's count: {this.state.todos.length}</p>
        <ul>
          { this.state.todos.map((todo, index) => {
            return <Todo todo={todo} key={index} onRemove={() => this.deleteTodo(index)} onChange={() => this.changeChecked(index)} />;
          }) }
        </ul>
        <input type="text" placeholder="Enter todo" ref={(input) => this.todoInput = input} onKeyPress={(event) => { if (event.which === 13) this.addTodo() }} />
        <button onClick={this.addTodo.bind(this)}>Add</button>
      </div>
    );
  }
}

export default App;
