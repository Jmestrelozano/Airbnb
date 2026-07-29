"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapBasicProps } from "@/shared/ui/types/mapBasic";

const resolveAssetUrl = (asset: string | { src?: string }) => {
  if (typeof asset === "string" && asset.length > 0) return asset;
  if (typeof asset === "object" && asset?.src) return asset.src;
  return undefined;
};

const iconUrl =
  resolveAssetUrl(markerIcon) ??
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl =
  resolveAssetUrl(markerIcon2x) ??
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl =
  resolveAssetUrl(markerShadow) ??
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

// Leaflet's default icon paths break under Next/Turbopack bundling.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MapBasic: React.FC<MapBasicProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};
