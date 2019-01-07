import React, { Component } from 'react';
import './App.css';
import Swal from 'sweetalert2'
import axios from 'axios'
import Todo from './ToDo'
import TodoItems from './ToDoItems'
import Login from './Login'
import Register from './Register'

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: {text:''},
      loggedIn: false,
      username: '',
      currentTab: 'login',
      name: '',
      email: '',
      password: '',
    }
  }
  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText}
    this.setState({
      currentItem,
    })
  }
  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      let token = localStorage.getItem('token')
      let due_date = new Date()
      let name = 'Dummy Task'
      let description = newItem.text
      axios({
        method: "POST",
        url: `https://xavier-todo-server.thenile.online/todo`,
        headers: {token:token},
        data: {
            name: name,
            description: description,
            due_date: due_date
        }
      })
      .then(response => {
        this.getToDo()
        this.setState({
          currentItem: {text: ''}
        })
        Swal({
          title: 'Task Added! Please wait a moment . . .',
          type: 'success',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
      })
      .catch(err => {
        console.log(err.response)
        Swal({
          title: err.response.data.message,
          type: 'error',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
      })
    } else {
      Swal({
        title: 'Task Title cannot be Empty!',
        type: 'warning',
        position:'top-end',
        toast: true,
        timer: 3000,
      })
    }
  }
  deleteItem = id => {
    Swal({
      title: 'Are you sure?',
      text: "It will be permanently deleted!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((confirm) => {
      if(confirm.value) {
        let token = localStorage.getItem('token')
        axios({
          method: "Delete",
          url: `https://xavier-todo-server.thenile.online/todo/${id}`,
          headers: { token: token },
        })
        .then (response => {
          Swal({
            title: 'Task Deleted! Please wait a moment . . .',
            type: 'success',
            position:'top-end',
            toast: true,
            timer: 3000,
          })
          this.getToDo()
        })
        .catch(err => {
          console.log(err.response.data.message)
          Swal({
            title: err.response.data.message,
            type: 'error',
            position:'top-end',
            toast: true,
            timer: 3000,
          })
        })
      }
    })
  }
  editItem = (index, item) => {
    let editable = document.querySelectorAll('.editable')[index]
    let editBtn = document.querySelectorAll('.fa-edit')[index]
    editable.contentEditable = !editable.isContentEditable;
    editable.focus()
    if(editable.contentEditable === 'true') {
      editBtn.setAttribute("style", "color: lightgrey")
    } else {
      editBtn.setAttribute("style", "color: black")
      localStorage.setItem('editTodo', editable.innerHTML);
      let newTodo = localStorage.getItem('editTodo')
      let token = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `https://xavier-todo-server.thenile.online/todo/${item._id}`,
        headers: { token: token },
        data: {
            name: item.name,
            description: newTodo,
            status: item.status,
            due_date: item.due_date
        }
      })
      .then(response => {
        this.getToDo()
      })
      .catch(err => {
        Swal({
          title: err.response.data.message,
          type: 'error',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
      })
      
    }
  }
  login = (e) => {
    e.preventDefault()
    let email = this.state.email
    let password = this.state.password
    axios({
        method: "POST",
        url: `https://xavier-todo-server.thenile.online/registeration/signin`,
        data: {
            email: email,
            password: password
        }
    })
    .then(response => {
        localStorage.setItem('token', response.data.token)
        this.setState({
          username: response.data.name,
          loggedIn: true,
          email: '',
          password: '',
          name: ''
        })
    })
    .catch(err => {
        console.log(err.response)
        Swal({
          title: err.response.data.message,
          type: 'error',
          position:'top-end',
          toast: true,
          timer: 3000,
        })
    })
  }
  register = (e) => {
    e.preventDefault()
    let email = this.state.email
    let password = this.state.password
    let name = this.state.name
    axios({
      method: "POST",
      url: `https://xavier-todo-server.thenile.online/registeration/signup`,
      data: {
          email: email,
          password: password,
          name: name
      }
    })
    .then(response => {
      Swal({
        title: 'Register Success! Please login to Continue',
        type: 'success',
        position:'top-end',
        toast: true,
        timer: 3000,
      })
      this.setState({
        password: '',
        name: '',
        currentTab: 'login'
      })
    })
    .catch(err => {
      console.log(err.response)
      Swal({
        title: err.response.data.message,
        type: 'error',
        position:'top-end',
        toast: true,
        timer: 3000,
      })
    })
  }
  signout = () => {
    localStorage.removeItem('token')
    this.setState({
      username: '',
      loggedIn: false,

    })
  }
  changeCurrentTab =() => {
    if(this.state.currentTab === 'login') {
      this.setState({
        currentTab: 'register',
      })
    } else {
      this.setState({
        currentTab: 'login',
      })
    }
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }
  getToDo = (e) => {
    let token = localStorage.getItem('token')
    axios({
      method: "GET",
      url: `https://xavier-todo-server.thenile.online/todo/`,
      headers: {
          token: token
      }
    })
    .then(response => {
      this.setState({
        items: response.data.data
      })
    })
    .catch(err => {
      console.log(err.response)
    })
  }
  render() {
    const loggedIn = this.state.loggedIn;
    const currentTab = this.state.currentTab;

    if(loggedIn) {
      return (
        <div className="App">
          <Todo 
            username={this.state.username}
            addItem={this.addItem}
            inputElement={this.inputElement}
            handleInput={this.handleInput}
            currentItem={this.state.currentItem}
            signout={this.signout}
          />
          <br />
          <TodoItems 
            entries={this.state.items}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            getToDo={this.getToDo}
          />
        </div>
      )
    } else if(!loggedIn && currentTab === 'login') {
      return (
        <div className="App">
          <Login 
            login={this.login}
            currentTab={this.state.currentTab}
            changeCurrentTab={this.changeCurrentTab}
            email={this.state.email}
            password={this.state.password}
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange}
          />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Register 
            register={this.register}
            currentTab={this.state.currentTab}
            changeCurrentTab={this.changeCurrentTab}
            email={this.state.email}
            password={this.state.password}
            name={this.state.name}
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange}
            handleNameChange={this.handleNameChange}
          />
        </div>
      )
    }
   
  }
}

export default App;
