import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import LZString from 'lz-string';
import './WorldMap.css';

const geoUrl = "https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson";
const TOTAL_COUNTRIES = 195; // Total number of recognized countries

// List of visited countries to highlight
const visitedCountries = [
    "Japan", "Chile", "Germany", "Italy", "Brazil", "Thailand", 
    "France", "Spain", "Belize", "Vietnam", "Belgium", "United Kingdom", 
    "United States of America", "Peru", "Argentina", "Austria",
    "Czech Republic", "Puerto Rico", "Dominican Republic", "Costa Rica",
    "Panama", "Guatemala", "Antigua and Barbuda", "Saint Martin", 
    "Belize", "Anguilla", "Mexico", "Singapore", "United Arab Emirates",
    "Greece", "Cyprus", "Malta"
];

const WorldMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // State to track zoom level
  const [showBorders, setShowBorders] = useState(false); // State to toggle borders

  // Fetch GeoJSON data or load from localStorage if available
  useEffect(() => {
    const storedGeoData = localStorage.getItem("compressedGeoData");

    if (storedGeoData) {
      // Decompress and parse the data
      const decompressedData = JSON.parse(LZString.decompress(storedGeoData));
      setGeoData(decompressedData);
    } else {
      // Fetch data and compress it before storing
      fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
          setGeoData(data);
          const compressedData = LZString.compress(JSON.stringify(data));
          localStorage.setItem("compressedGeoData", compressedData); // Save compressed data
        })
        .catch(error => console.error("Error loading GeoJSON:", error));
    }
  }, []);

  if (!geoData) return <div>Loading map...</div>;

  // Zoom control functions
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 8)); // Limit zoom level to max 8
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 1, 1)); // Limit zoom level to min 1
  };

  // Toggle border visibility
  const toggleBorders = () => {
    setShowBorders(prev => !prev);
  };

  return (
    <div className="map-container">
      <div className="map-wrapper">
        {/* Hovered Country Name Overlay */}
        {hoveredCountry && (
          <div className="hovered-country">
            {hoveredCountry}
          </div>
        )}

        <ComposableMap
          projection="geoMercator"
          viewBox="0 0 900 450"  // Adjusted viewBox to fit in a smaller space
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <ZoomableGroup
            center={[0, 0]}             // Starting center of the map
            zoom={zoomLevel}             // Bind the zoom level to state
            minZoom={1}                  // Minimum zoom level
            maxZoom={10}                 // Maximum zoom level
          >
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const countryName = geo.properties.ADMIN;
                  const isVisited = visitedCountries.includes(countryName);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        default: {
                          fill: isVisited ? "#FFD700" : "#D6D6DA",
                          stroke: showBorders ? "#FFFFFF" : "none", // Conditionally show borders
                          strokeWidth: showBorders ? 0.5 : 0,
                          outline: "none",
                        },
                        hover: {
                          fill: isVisited ? "#FFA500" : "#F53",
                          stroke: showBorders ? "#FFFFFF" : "none",
                          strokeWidth: showBorders ? 0.5 : 0,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          stroke: showBorders ? "#FFFFFF" : "none",
                          strokeWidth: showBorders ? 0.5 : 0,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Visited Countries Counter with Added Style */}
      <div className="visited-counter">
        {visitedCountries.length} / {TOTAL_COUNTRIES} countries visited
      </div>

      {/* Zoom and Border Toggle Buttons */}
      <div className="zoom-button-container">
        <button onClick={handleZoomIn} className="zoom-button">Zoom In</button>
        <button onClick={handleZoomOut} className="zoom-button">Zoom Out</button>
        <button onClick={toggleBorders} className="zoom-button">
          {showBorders ? "Hide Borders" : "Show Borders"}
        </button>
      </div>
    </div>
  );
};

export default WorldMap;
