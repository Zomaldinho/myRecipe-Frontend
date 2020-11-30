import React, { Component } from 'react';
import './App.css';
import Recipes from './components/recipes/recipes';
import OneRecipe from './components/oneRecipe/oneRecipe';
import NewRecipe from './components/newRecipe/NewRecipe'

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'home',
      handeledReipeId: null,
    };
  }
  Routing = (route) => {
    this.setState({ route: route });
  };
  handeldRecipe = (id) => {
    this.setState({ handeledReipeId: id });
  };

  render() {
    return (
      <div className="App container bg-light">
        <div className="d-flex justify-content-between bg-primary">
          <h1 className='text-white'>My Recipes</h1>
          <div>
            <a className="btn btn-primary m-2" onClick={()=>this.Routing('home')}>
              Home
            </a>
            <a className="btn btn-primary m-2" onClick={()=>this.Routing('new')}>
              Add New Recipe
            </a>
          </div>
        </div>
        {this.state.route === 'one' ? (
          <OneRecipe
            routeChange={this.Routing}
            id={this.state.handeledReipeId}
          />
        ) : this.state.route === 'home' ? (
          <Recipes
            routeChange={this.Routing}
            handeldRecipe={this.handeldRecipe}
          />
        ) : this.state.route === 'new' ? (
          <NewRecipe routeChange={this.Routing}/>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default App;
