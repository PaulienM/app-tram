import React, { Component } from 'react';
import '../style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export class Carte extends Component {
  componentDidMount(){
    this.map= L.map('map', {
      center: [45.18, 5.73],
      zoom: 13,
      zoomControl: false
    })

    //L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      detectRetina: true,
      maxZoom: 20,
      maxNativeZoom: 17,
    }).addTo(this.map)
  }

  render() {
    return (
      <Wrapper width="1280px" height="720px" id="map" />
    )
  }
}

export default Carte
