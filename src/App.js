import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App
