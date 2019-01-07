import React, { Component } from 'react'

class TodoItems extends Component {
    componentDidMount() {
        this.props.getToDo()
    }
    createTasks = item => {
        return (
            <li className="col-3" key={item.index} >
                <div className="container">
                    <p className="editable">{item.description} </p>
                </div>
                <div className="button">
                    <i className="fas fa-trash-alt" onClick= {() => this.props.deleteItem(item._id)}></i>
                    <i className="fas fa-edit" onClick={() => this.props.editItem(item.index, item)}></i>
                </div>
            </li>
        )
    }
    render() {
        const todoEntries = this.props.entries
        todoEntries.forEach((element, index) => {
            element.index = index
        });
        const listItems = todoEntries.map(this.createTasks)
        // console.log('toE', todoEntries)
        // console.log('LI', listItems)

        return (
            <ul className="theList row">{listItems}</ul>
        )
    }
}

export default TodoItems