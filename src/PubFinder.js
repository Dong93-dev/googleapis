import React, { Component } from "react";

class PubFinder extends Component {
  state = { pubs: [] };

  componentDidUpdate(prevProps) {
    if (this.props.place_id !== prevProps.place_id) {
      const { place_id, map } = this.props;
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({ placeId: place_id }, (results, status) => {
        const name = results.name;
        const rating = results.rating;
        const location = results.geometry.location;
        console.log(location);
        const request = {
          location,
          type: "bar",
          rankBy: window.google.maps.places.RankBy.DISTANCE,
        };
        service.nearbySearch(request, (results, status) => {
          let pubs = [];
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < 5; i++) {
              pubs.push(results[i]);
            }

            this.setState({ pubs });
          }
        });
      });
    }
  }

  componentDidMount() {
    const { place_id, map } = this.props;
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails({ placeId: place_id }, (results, status) => {
      console.log(results);
      const name = results.name;
      const rating = results.rating;
      const location = results.geometry.location;
      console.log(location);
      const request = {
        location,
        type: "bar",
        rankBy: window.google.maps.places.RankBy.DISTANCE,
      };
      service.nearbySearch(request, (results, status) => {
        let pubs = [];
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < 5; i++) {
            pubs.push(results[i]);
          }

          this.setState({ pubs });
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Pubs nearby:</h2>
        {this.state.pubs
          ? this.state.pubs.map((pub) => (
              <p key={pub.name}>
                {pub.name} {pub.rating}🍺
              </p>
            ))
          : null}
      </div>
    );
  }
}

export default PubFinder;
