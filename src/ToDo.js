import React, { Component } from 'react'
class TodoList extends Component {
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between" >
            <a className="navbar-brand">To Do</a>
            <a className="navbar-brand">Welcome {this.props.username}</a>
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.props.addItem}>
                    <input
                        placeholder="Task"
                        ref={this.props.inputElement}
                        value={this.props.currentItem.text}
                        onChange={this.props.handleInput}
                    />
                    <button type="submit"> Add Task </button>
                    </form>
                </div>
            </div>
            <button onClick={this.props.signout}>Sign Out</button>
        </nav>       
      )
    }
  }

export default TodoList