import "./App.css";
import GoogleMapReact from "google-map-react";
import { Component } from "react";
import { Link, Router } from "@reach/router";
import PubFinder from "./PubFinder";
class App extends Component {
  state = {
    defaultProps: {
      center: {
        lat: 51.454514,
        lng: -2.58791,
      },
      zoom: 11,
    },
  };

  componentDidMount() {
    // console.log("mount", this.state.places);
    this.setState({ places: [], place_id: "" });
  }

  handleApiLoaded = (map, maps) => {
    let places = [];
    const poi = new window.google.maps.LatLng(
      this.state.defaultProps.center.lat,
      this.state.defaultProps.center.lng
    );
    const request = {
      location: poi,
      query: "campsites",
      radius: "500",
      fields: ["name", "geometry"],
    };

    // use map and maps objects
    // console.dir(map);
    // console.dir(maps);
    const service = new window.google.maps.places.PlacesService(map);
    console.dir(service);
    service.textSearch(request, (results, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < 5; i++) {
          places.push(results[i]);
        }
        const request2 = {
          placeId: places[0].place_id,
          // fields: ["website", "price_level", "rating"],
        };
        service.getDetails(request2, (results, status) => {
          this.setState({ places, place_id: places[0].place_id, map });
        });
      }
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <div
            id="map"
            className="google-map"
            style={{ height: "50vh", width: "100%" }}
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
            ></GoogleMapReact>
          </div>
          <h2>Camping near your location:</h2>
          {this.state.places
            ? this.state.places.map((place) => (
                <p key={place.formatted_address}>
                  {" "}
                  <Link to={`/campsite/${place.place_id}`}>
                    {" "}
                    {place.formatted_address}
                  </Link>{" "}
                </p>
              ))
            : null}
        </div>
        <Router>
          <PubFinder path="/campsite/:place_id" map={this.state.map} />
        </Router>
      </>
    );
  }
}

export default App;
