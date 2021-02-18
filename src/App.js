import "./App.css";
import GoogleMapReact from "google-map-react";
import { Component } from "react";

class App extends Component {
  state = {
    defaultProps: {
      center: {
        lat: 53.400002,
        lng: -2.983333,
      },
      zoom: 11,
    },
  };
  componentDidMount() {
    let map;
    let service;
    let infowindow;
    let places = [];
    // map = new google.maps.Map();

    const liverpool = new window.google.maps.LatLng(53.400002, -2.983333);
    infowindow = new window.google.maps.InfoWindow();
    console.dir(liverpool);
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: liverpool,
      zoom: 15,
    });
    console.dir(map);
    const request = {
      query: "campsites",
      fields: ["name", "geometry"],
    };
    console.dir(window.google);
    service = new window.google.maps.places.PlacesService(
      document.getElementById("map")
    );
    service.textSearch(request, (results, status) => {
      console.log("places", results);
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          places.push(results[i]);
        }

        this.setState({ places });
      }
    });
    console.dir(service);
  }

  render() {
    return (
      <div className="App">
        <div
          id="map"
          className="google-map"
          style={{ height: "50vh", width: "50%" }}
        >
          {/* <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAuc0iyyESvJUyPOLjHVn4j-RWcEBPrG0U",
            }}
            defaultCenter={this.state.defaultProps.center}
            defaultZoom={this.state.defaultProps.zoom}
          ></GoogleMapReact> */}
        </div>
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
