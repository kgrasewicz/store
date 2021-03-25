import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Home from './Containers/Home/Home';
import About from './Containers/About/About';
import Shop from './Containers/Shop/Shop';
import { Route} from 'react-router-dom';



class App extends Component {


  render() {
    return (
    <div className="App">
      <BrowserRouter>

      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/shop" component={Shop} />

      </BrowserRouter>
    </div>

  );
  }
}


export default App;
