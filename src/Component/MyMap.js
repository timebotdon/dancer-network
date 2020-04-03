import React, { Component } from "react";
import "./MyMap.css";
import DanceEventInfo from "../utils/DanceEventInfo";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import instance from "../utils/axios";

class NewMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfoBoxOpen: false,
      myEvent: props.boo,
      allDanceEvents: []
    };
  }

  render() {
    const event = this.state.allDanceEvents;
    return (
      <Marker
        key={event.eventName}
        className="marker"
        position={{ lat: parseInt(event.lat), lng: parseInt(event.lng) }}
        onClick={() => this.setState({ isInfoBoxOpen: true })}
      >
        {this.state.isInfoBoxOpen && (
          <InfoWindow
            onCloseClick={() => this.setState({ isInfoBoxOpen: false })}
          >
            <h4>
              Event name : {event.eventName}
              Dance Style : {event.danceStyle}
              Date : {event.date}
              Country : {event.country}
            </h4>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDanceEvents: []
    };
  }

  componentDidMount() {
    instance.get("https://dancer-network.herokuapp.com/events").then(res => {
      this.setState({
        allDanceEvents: res.data
      });
      console.log(res);
    });
  }
  render() {
    return (
      <div>
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 1.35, lng: 103.85 }}>
          {this.state.allDanceEvents.map(event => (
            <NewMarker
              allDanceEvents={this.state.allDanceEvents}
              key={event.eventName}
              boo={event}
            ></NewMarker>
          ))}
        </GoogleMap>
      </div>
    );
  }
}

const MapWithScript = withScriptjs(
  withGoogleMap(props => <MyMap {...props} />)
);

const InitiasedMap = () => (
  <MapWithScript
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_SECRET}`}
    loadingElement={<div style={{ height: "100%" }} />}
    containerElement={<div className="map" />}
    mapElement={<div style={{ height: "100%" }} />}
  />
);

export default InitiasedMap;
