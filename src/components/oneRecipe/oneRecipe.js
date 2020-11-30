import React, { Component } from 'react';

class OneRecipe extends Component {
  constructor(props) {
    super();
    this.state = {
      recipe: [],
      editStatus: false,
      title: '',
      ingredients: '',
      rec: '',
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/recipe/${this.props.id}`)
      .then((response) => response.json())
      .then((recipe) =>
        this.setState({
          recipe,
          title: recipe.title,
          ingredients: recipe.ingredients,
          rec: recipe.recipe,
        })
      );
  }

  //Handling onclick of submit button of edit form
  onSubmit = () => {
    if (!this.state.title || !this.state.ingredients || !this.state.rec) {
      return alert(
        'You can not submit empty Title, Ingredients and/or Recipe'
      );
    }
    fetch(`http://localhost:5000/edit/${this.props.id}`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: this.state.title,
        ingredients: this.state.ingredients,
        recipe: this.state.rec,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          this.setState({ recipe: data });
        }
      })
      .catch((err) => console.log(err));
    this.setState({ editStatus: false });
  };

  //Handling onClick of delete button
  delete = () => {
    let confirm = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirm) {
      fetch(`http://localhost:5000/delete/${this.props.id}`, {
        method: 'delete',
      })
        .then(this.props.routeChange('home'))
        .catch((err) => console.log(err));
    }
  };

  render() {
    let { recipe } = this.state;
    return (
      <div>
        <div className="card mb-3">
          <img
            className="card-img-top"
            src={'http://localhost:5000/' + recipe.image}
            alt="Card cap"
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.title}</h5>
            <p className="card-text">{recipe.recipe}</p>
            <p className="card-text">
              <small className="text-muted">{recipe.ingredients}</small>
            </p>
            <button
              className="btn btn-primary m-3"
              onClick={() => this.setState({ editStatus: true })}
            >
              Edit
            </button>
            <button
              className="btn btn-primary m-3"
              onClick={() => this.delete()}
            >
              Delete
            </button>
            {this.state.editStatus ? <p>Edit Form is Below</p> : <div></div>}
          </div>
        </div>
        {this.state.editStatus ? (
          <div className="d-flex justify-content-center">
            <form onSubmit={(e) => e.preventDefault()} className="w-50">
              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  className="form-control"
                  defaultValue={recipe.title}
                  onChange={(txt) =>
                    this.setState({ title: txt.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                <input
                  name="ingredients"
                  className="form-control"
                  defaultValue={recipe.ingredients}
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
                  defaultValue={recipe.recipe}
                  onChange={(txt) => this.setState({ rec: txt.target.value })}
                />
              </div>

              <button
                type="button"
                onClick={() => this.onSubmit()}
                className="btn btn-primary m-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => this.setState({ editStatus: false })}
                className="btn btn-primary m-2"
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default OneRecipe;
