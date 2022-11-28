import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/jobs" component={Jobs} />
          <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
