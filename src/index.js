import React from "react";
import ReactDOM from "react-dom";

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
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {breeds.map(breed => (
            <li key={breed}>
              {breed}
            </li>
          ))}
        </ul>
      );
    }
  }
  
}

ReactDOM.render(<BreedsList/>, document.getElementById("root"));