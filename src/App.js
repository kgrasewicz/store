import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Home from './Containers/Home/Home';
import About from './Containers/About/About';
import Shop from './Containers/Shop/Shop';
import Terms from './Containers/Terms';
import { Route} from 'react-router-dom';
import Contact from './Containers/Contact';




class App extends Component {



  render() {
    return (
    <div className="App">
      <BrowserRouter basename="https://kgrasewicz.github.io/jewellery-store/">


      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />

      <Route path="/shop" render={ (props) => <Shop></Shop>}/>
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />

      </BrowserRouter>
    </div>

  );
  }
}


export default App;
