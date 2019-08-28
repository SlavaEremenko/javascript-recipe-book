import React from 'react';
import Todo from './Todo.js';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: window.localStorage.getItem('react-app-todos')
    }

    if (this.state.todos) {
      this.state.todos = JSON.parse(this.state.todos);
    } else {
      this.state.todos = [
        { title: "Go to The Store", done: true },
        { title: "Buy Ingredients", done: true },
        { title: "Cook borstch", done: false },
        { title: "Eat borstch", done: false }
      ]
    }

    this.todoInput = "";
  }

  addTodo() {
    if (this.todoInput.value.length > 0) {
      var newTodos = this.state.todos.concat({ title: this.todoInput.value });
      this.setState({ todos: newTodos });
      this.todoInput.value = "";
      window.localStorage.setItem('react-app-todos', JSON.stringify(newTodos));
    }
  }

  deleteTodo(index) {
    var newTodos = this.state.todos.filter((todo,i) => { return i !== index });
    this.setState({
      todos: newTodos
    });
    window.localStorage.setItem('react-app-todos', JSON.stringify(newTodos));
  }

  changeChecked(index) {
    var newTodos = this.state.todos
    newTodos[index].done = !newTodos[index].done;
    this.setState({ todos: newTodos });
    window.localStorage.setItem('react-app-todos', JSON.stringify(newTodos));
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
