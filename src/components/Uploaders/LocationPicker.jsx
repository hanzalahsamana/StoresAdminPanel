'use client';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function LocationPicker() {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Initialize map
  useEffect(() => {
    if (!map) {
      const mapInstance = L.map('map', {
        center: [24.8607, 67.0011], // Karachi
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance);

      // When the map stops moving, get center and reverse geocode
      mapInstance.on('moveend', () => {
        const center = mapInstance.getCenter();
        reverseGeocode(center.lat, center.lng);
      });

      setMap(mapInstance);
    }
  }, [map]);

  const reverseGeocode = (lat, lon) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
      .then(res => res.json())
      .then(data => {
        setAddress(data.display_name || '');
      });
  };

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (map) {
          map.setView([latitude, longitude], 16);
        }
      },
      () => alert("Location access denied or not available.")
    );
  };

  const searchAddress = async (query) => {
    setSearchInput(query);
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`);
    const data = await res.json();
    setSuggestions(data.features);
  };

  const handleSelectSuggestion = (feature) => {
    const [lon, lat] = feature.geometry.coordinates;
    if (map) {
      map.setView([lat, lon], 16);
    }
    setSearchInput(feature.properties.name + ', ' + (feature.properties.city || '') || '');
    setSuggestions([]);
  };

  return (
    <div className='w-full max-w-2xl mx-auto relative'>
      {/* Controls */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={locateUser}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          📍 Get Current Location
        </button>
        <input
          type="text"
          placeholder="Search address..."
          value={searchInput}
          onChange={(e) => searchAddress(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="border bg-white max-h-40 overflow-y-auto rounded shadow mb-2 absolute z-[999] w-full">
          {suggestions.map((sug, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(sug)}
            >
              {sug.properties.name}, {sug.properties.city}, {sug.properties.country}
            </li>
          ))}
        </ul>
      )}

      {/* Map container */}
      <div id="map" style={{ height: '330px', borderRadius: '10px' }}></div>

      {/* Fixed marker icon (center) */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
        alt="center marker"
        style={{
          position: 'absolute',
          top: 'calc(50% + 20px)',
          left: '50%',
          width: '32px',
          height: '32px',
          transform: 'translate(-50%, -100%)',
          pointerEvents: 'none',
          zIndex: 998
        }}
      />

      {/* Address display */}
      <input
        type="text"
        value={address}
        readOnly
        placeholder="Your address will appear here"
        className="mt-2 w-full px-3 py-2 border rounded"
      />
    </div>
  );
}

export default LocationPicker;
