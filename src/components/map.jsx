import "../App.css";
import GoogleMapReact from "google-map-react";
import { Component } from "react";
import "./map.css"
import CampsiteMarker from "./CampsiteMarker"

class Testmap extends Component {
  state = {
    defaultProps: {
      center: {
        lat: this.props.position.latitude,
        lng: this.props.position.longitude,
      },
      zoom: 11,
    },
    places: [],
    isLoading: true
  };

  componentDidMount() {
    console.log("mount", this.state.places);
    this.setState({ places: [] });
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
    console.dir(map);
    console.dir(maps);
    const service = new window.google.maps.places.PlacesService(map);
    console.dir(service);
    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          places.push(results[i]);
        }
        console.log("places", places);
        this.setState({ places, isLoading: false });
      }
    });
  };

  // Marker = (props) => {
  //   return (
  //     <div>
  //       <img src={props.image} alt="camp location" className="Marker__icon" />
  //     </div>)
  // }

  render () {
    const { places } = this.state;

    return (
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
          >
            {places.map((place) => {
              return <CampsiteMarker text={"marker"}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
                key={place.place_id}
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Tent_Flat_Icon_Vector.svg/1024px-Tent_Flat_Icon_Vector.svg.png"
                name={place.name}
              ></CampsiteMarker>
            })}

            {/* <this.Marker text={"marker"}
              lat={53.6114287}
              lng={-2.3053994}
            ></this.Marker>  */}
  
          </GoogleMapReact>
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

export default Testmap;
