import React, { Component } from 'react';

class NewRecipe extends Component {
  constructor(props) {
    super();
    this.state = {
      title: '',
      ingredients: '',
      recipe: '',
      image: null,
    };
  }

  //Handling onClick of submit button of add new recipe
  onSubmit = () => {
    let data = new FormData();
    data.append('recipeImg', this.state.image);
    data.append('title', this.state.title);
    data.append('ingredients', this.state.ingredients);
    data.append('recipe', this.state.recipe);
    fetch('http://localhost:5000/recipe/create', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then(() => this.props.routeChange('home'))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className='d-flex justify-content-center'>
        <form onSubmit={(e) => e.preventDefault()} className='w-50'>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              className="form-control"
              onChange={(txt) => this.setState({ title: txt.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Ingredients</label>
            <input className='w-50'
              name="ingredients"
              className="form-control"
              onChange={(txt) =>
                this.setState({ ingredients: txt.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>recipe</label>
            <input
              name="recipe"
              className="form-control"
              onChange={(txt) => this.setState({ recipe: txt.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              name="image"
              className="form-control"
              type="file"
              onChange={(event) =>
                this.setState({ image: event.target.files[0] })
              }
            />
          </div>

          <button
            type="button"
            onClick={() => this.onSubmit()}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewRecipe;
