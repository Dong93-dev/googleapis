import "./App.css";
import { Component } from "react";
import Testmap from "./components/map";


class App extends Component {
  state = {
    isLoading: true,
    position: {
      latitude: 0,
      longitude: 0,
    },
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((userPosition) => {
      this.setState(() => {
        return {
          isLoading: false,
          position: {
            latitude: userPosition.coords.latitude,
            longitude: userPosition.coords.longitude,
          },
        };
      });
    });
  }

  render() {
    console.log("rendering", this.state.position);
    return (
      <>
        {this.state.isLoading ? (
          <></>
        ) : (
          <Testmap position={this.state.position} />
        )}
      </>
    );
  }
}
export default App;
