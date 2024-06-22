import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import JobsRoute from './components/JobsRoute'

import JobItemDetailsRoute from './components/JobItemDetailsRoute'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={JobsRoute} />
        <ProtectedRoute
          exact
          path="/jobs/:id"
          component={JobItemDetailsRoute}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App
