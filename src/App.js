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
      <BrowserRouter basename={process.env.PUBLIC_URL}>

      <Route path="/" exact component={Home} />
      <Route path="/jewellery-store/about" component={About} />

      <Route path="/jewellery-store/shop" render={ (props) => <Shop></Shop>}/>
      <Route path="/jewellery-store/terms" component={Terms} />
      <Route path="/jewellery-store/contact" component={Contact} />

      </BrowserRouter>
    </div>

  );
  }
}


export default App;
