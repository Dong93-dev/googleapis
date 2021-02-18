import "./App.css";
import GoogleMapReact from "google-map-react";

function App() {
  let map;
  let service;
  let infowindow;
  let places = [];
  // map = new google.maps.Map();
  const request = {
    query: "campsites",
    fields: ["name", "geometry"],
  };
  // service = new google.maps.places.PlacesService(map);
  // service.textSearch(request, callback);
  // function callback(results, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       place.push(results[i]);
  //     }
  //   }
  // }
  const defaultProps = {
    center: {
      lat: 53.400002,
      lng: -2.983333,
    },
    zoom: 11,
  };
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <div className="App">
      <div className="google-map" style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAuc0iyyESvJUyPOLjHVn4j-RWcEBPrG0U" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={53.400002} lng={-2.983333} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
