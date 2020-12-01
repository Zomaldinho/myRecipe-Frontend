import React, { Component } from 'react';

class Recipes extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    fetch('https://myrecipe-be.herokuapp.com/')
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  //Handling onClick of More Details button (passing the recipe ID to App component)
  showOne(i) {
    this.props.handeldRecipe(i);
    this.props.routeChange('one');
  }

  //handling onClick of Delete button
  delete = (id) => {
    let confirm = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirm) {
      fetch(`https://myrecipe-be.herokuapp.com/delete/${id}`, {
        method: 'delete',
      })
        .then(() => {
          this.componentDidMount();
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="d-flex flex-wrap">
        {this.state.data.map((recipe) => {
          return (
            <div className="card m-3" style={{ width: '18rem' }}>
              <img
                className="card-img-top"
                src={'https://myrecipe-be.herokuapp.com/' + recipe.image}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.ingredients}</p>
                <p className="card-text">{recipe.recipe}</p>
                <button
                  onClick={() => this.showOne(recipe._id)}
                  className="btn btn-primary m-2"
                >
                  More Details
                </button>
                <button
                  onClick={() => this.delete(recipe._id)}
                  className="btn btn-primary m-2"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Recipes;
