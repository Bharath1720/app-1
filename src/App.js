import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

import SearchFilter from './components/SearchFilter'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/search" component={SearchFilter} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
