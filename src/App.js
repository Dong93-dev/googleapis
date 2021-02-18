import "./App.css";
import GoogleMapReact from "google-map-react";
import { Component } from "react";

class App extends Component {
  state = {
    defaultProps: {
      center: {
        lat: 51.454514,
        lng: -2.5879,
      },
      zoom: 11,
    },
  };

  componentDidMount() {
    console.log("mount", this.state.places);
    this.setState({ places: [] });
  }

  handleApiLoaded = (map, maps) => {
    let places = [];
    const request = {
      query: "campsites",
      fields: ["name", "geometry"],
    };
    // use map and maps objects
    console.dir(map);
    console.dir(maps);
    const service = new window.google.maps.places.PlacesService(map);
    console.dir(service);
    service.textSearch(request, (results, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          places.push(results[i]);
        }
        console.log("places", results);
        this.setState({ places });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div
          id="map"
          className="google-map"
          style={{ height: "50vh", width: "50%" }}
        >
          {/* {this.state.map} */}
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAuc0iyyESvJUyPOLjHVn4j-RWcEBPrG0U",
            }}
            defaultCenter={this.state.defaultProps.center}
            defaultZoom={this.state.defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              this.handleApiLoaded(map, maps)
            }
          />
        </div>
        <p>
          {
            (this.state.defaultProps.center.lat,
            this.state.defaultProps.center.lng)
          }
        </p>
        {this.state.places
          ? this.state.places.map((place) => (
              <p key={place.formatted_address}>{place.formatted_address} </p>
            ))
          : null}
      </div>
    );
  }
}

export default App;
