"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

type Position = [number, number];

const customIcon = L.icon({
  iconUrl: "/assets/icons/location-indicator-red.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function ChangeView({ coords }: { coords: Position }) {
  const map = useMap();
  map.setView(coords, map.getZoom()); // OR map.flyTo(coords, zoom);
  return null;
}

export default function MyMap({ position }: { position: Position }) {
  return (
    <MapContainer
      center={position}
      zoom={4}
      style={{
        height: "208px",
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      />
      <ChangeView coords={position} />
      <Marker position={position} icon={customIcon} />
    </MapContainer>
  );
}
