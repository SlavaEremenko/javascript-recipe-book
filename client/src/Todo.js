import React from 'react';

export class Todo extends React.Component {
  render() {
    return (
      <li className={this.props.todo.done ? "done" : ""}>
        {this.props.todo.title}
        <input type='checkbox' checked={this.props.todo.done ? "checked" : ""} onChange={this.props.onChange} />
        <button className='delete' onClick={this.props.onRemove}>Delete</button>
      </li>
    );
  }
}

export default Todo;
