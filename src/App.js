import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import Home from './Containers/Home/Home';
import About from './Containers/About/About';
import Shop from './Containers/Shop/Shop';
import { Route} from 'react-router-dom';



class App extends Component {


  render() {
    return (
    <div className="App">
      <BrowserRouter>

      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />

      <Route path="/shop" render={props => <Shop {...props}/>}/>
      </Switch>
      </BrowserRouter>
    </div>

  );
  }
}


export default App;
