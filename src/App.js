import React, { Component } from 'react';
import './App.css';
import ReactDOMServer from 'react-dom/server';

import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import Icon from './Icon';

class App extends Component {
  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      key: 0
    }
   this.timer = '';
  }
  componentDidMount() {
    this.timer = setInterval(() => this.setState({
      key: Math.floor(Math.random() * 100) + 1 
    }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.set);
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    const icon = L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(<Icon perc={this.state.key}/>)
    });
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position} icon={icon}/>
      </Map>
    );
  }
}

export default App;
