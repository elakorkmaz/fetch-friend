import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

class Images extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
  }

  componentDidMount() {  
  fetch("https://dog.ceo/api/breed/hound/images")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          images: result.message
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  
  render() {
    let { error, isLoaded, images } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var image = images[Math.floor(Math.random() * images.length)];
      return <img src={image} className="image" />
    }
  }

}
  
class BreedsList extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      breeds: []
    };
  }
  
  componentDidMount() {
  fetch("https://dog.ceo/api/breeds/list")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          breeds: result.message
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, breeds } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {breeds.map(breed => (
            <li key={breed}>
              <button 
                className="btn"
                onClick={this.props.handleClick}>
                {breed}
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }
  
}

ReactDOM.render(<BreedsList/>, document.getElementById("root"));
ReactDOM.render(<Images/>, document.getElementById("photo"));