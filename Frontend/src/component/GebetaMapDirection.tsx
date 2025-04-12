// src/components/GebetaMapDirections.tsx
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix for Leaflet marker issue
import "../util/leafletconfig";

const Routing = ({
  from,
  to,
}: {
  from: [number, number];
  to: [number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null, // Optional: disables default blue markers
      lineOptions: {
        styles: [{ color: "#0077ff", weight: 6 }], // Custom route line color
      },
    }).addTo(map);

    return () => {
      map.removeControl(routingControl); // Cleanup when component unmounts
    };
  }, [from, to, map]);

  return null;
};

const GebetaMapDirections = ({
  eventCoords,
}: {
  eventCoords: [number, number] | null;
}) => {
  const kuriftuCoords: [number, number] = [8.738, 38.979]; // Example Kuriftu coordinates
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error("Geolocation error:", err)
    );
  }, []);

  return (
    <section id="directions" className="py-16 w-[400px] bg-white text-gray-800">


      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <MapContainer
            center={kuriftuCoords}
            zoom={13}
            style={{ height: "240px", width: "100%" }}
            className="rounded-lg"
          >
            <TileLayer
              attribution="&copy; Gebeta Map / OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userCoords && eventCoords && (
              <>
                <Routing from={userCoords} to={eventCoords} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default GebetaMapDirections;
