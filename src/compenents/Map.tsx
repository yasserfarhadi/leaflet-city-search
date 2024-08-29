import React, { LegacyRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  LayersControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Geometry } from '../types/City';
import type { LatLngExpression, Map as LeafletMap } from 'leaflet';

const BaseLayer = LayersControl.BaseLayer;

const Map = ({ center }: { center?: Geometry }) => {
  const map = React.useRef<LeafletMap>();
  const lat = new URLSearchParams(window.location.search).get('lat') || '';
  const lng = new URLSearchParams(window.location.search).get('lng') || '';
  const coord: LatLngExpression =
    lat && lng ? [+lat, +lng] : [35.6892, 51.389]; /* Default to tehran */
  React.useEffect(() => {
    if (center) {
      map?.current?.flyTo([center.lat, center.lng], 12);
    } else if (!lat && !lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((response) => {
          map?.current?.flyTo(
            [response.coords.latitude, response.coords.longitude],
            12
          );
        });
      }
    }
  }, [center, lat, lng]);

  return (
    <MapContainer
      center={center ? [center.lat, center.lng] : coord /* Default to tehran*/}
      zoom={13}
      style={{ height: '100vh' }}
      scrollWheelZoom={true}
      zoomControl={false}
      ref={map as LegacyRef<LeafletMap>}
    >
      <ZoomControl position="bottomright" />
      <LayersControl position="bottomright">
        <BaseLayer name="Open Street Map" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="Google Satelite">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution="&copy; <a href='https://www.google.com/maps'>Google Maps</a>"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          />
        </BaseLayer>
        <BaseLayer name="Stamen Terrain">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://opentopomap.org'>OpenTopoMap</a>"
          />
        </BaseLayer>
        <BaseLayer name="Esri Satelite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; <a href='https://www.esri.com/'>Esri</a>"
          />
        </BaseLayer>
      </LayersControl>
      {(center || (lat && lng)) && (
        <Marker position={center ? [center.lat, center.lng] : coord}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default React.memo(Map);
