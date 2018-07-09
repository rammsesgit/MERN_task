import React, {Component} from 'react'

class App extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      _id: '',
      tasks: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
  }

  handleChange(e) {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  addTask(e) {
    e.preventDefault()
    if (this.state._id) {
      fetch(`/api/task/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        M.toast({html: `${data.status}`})
        this.setState({title: '', description: '', _id: ''})
        this.fetchTask()
      })
    } else {
      fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        M.toast({html: `${data.status}`})
        this.setState({title: '', description: ''})
        this.fetchTask()
      }).catch(err => console.error(err))
    }
  }

  // read when loading
  componentDidMount() {
    this.fetchTask()
  }

  fetchTask() {
    fetch('/api/task').then(res => res.json()).then(data => {
      this.setState({tasks: data})
    })
  }

  deleteTask(_id) {
    if (confirm('Are you sure you want to delete it?')) {
      fetch(`/api/task/${_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => {
        M.toast({html: `${data.status}`})
        this.fetchTask()
      })
    }
  }

  editTask(_id) {
    // NOTE: making a new request
    fetch(`/api/task/${_id}`).then(res => res.json()).then(data => {
      this.setState({title: data.title, description: data.description, _id: data._id})
    })
    // NOTE: with the information that you already have
  }

  render() {
    return (<div>
      {/* navigation */}
      <nav className="light-blue darken-4">
        <div className="container">
          <a className="brand-logo" href="/">MERN Stack</a>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <form onSubmit={this.addTask}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input autoFocus="autoFocus" type="text" name="title" placeholder="Title task" onChange={this.handleChange} value={this.state.title}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea name="description" className="materialize-textarea" placeholder="Task description" onChange={this.handleChange} value={this.state.description}></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn light-blue darken-4">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col s7">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.tasks.map(task => {
                    return (<tr key={task._id}>
                      <td>{task.title}</td>
                      <td style={{maxWidth: '250px', overflowX: 'auto'}}>{task.description}</td>
                      <td>
                        <button className="btn light-blue darken-4" style={{
                            margin: '4px'
                          }} onClick={() => this.editTask(task._id)}>
                          <i className="material-icons">edit</i>
                        </button>
                        <button className="btn light-blue darken-4" style={{
                            margin: '4px'
                          }} onClick={() => this.deleteTask(task._id)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default App
