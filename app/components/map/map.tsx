import { FunctionComponent, useEffect, useRef, useState } from "react";
import SearchBox from "./search-box";

interface MapProps {
  setValue: (value: any) => void;
}

const Map: FunctionComponent<MapProps> = ({ setValue }) => {
  const marker = useRef<google.maps.marker.AdvancedMarkerElement>();
  const mapObject = useRef<google.maps.Map>();

  const [locationText, setLocationText] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    async function initMap() {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      mapObject.current = new Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
          mapId: "4504f8b37365c3d0",
          disableDefaultUI: true,
        }
      );
    }
    initMap();
  }, []);

  const handlePlaceSelected = (placeId: string) => {
    if (mapObject.current) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId }, handleGeocoderResponse);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation && mapObject.current) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coordinates: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinates }, handleGeocoderResponse);
      });
    }
  };

  const handleGeocoderResponse = async (
    results: google.maps.GeocoderResult[] | null,
    status: google.maps.GeocoderStatus
  ) => {
    if (status === "OK" && results && results.length > 0) {
      const place = results[0];
      await createMarker(place.geometry.location);
      setLocationText(place.formatted_address);
      setValue(place.formatted_address);
    } else {
      setLocationLoading(false);
    }
  };

  const createMarker = async (
    coords: google.maps.LatLngLiteral | google.maps.LatLng
  ) => {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    // Remove the marker from Google Maps for the previously searched place
    if (marker.current?.map) {
      marker.current.map = null;
    }
    // Drop the marker to the searched place location
    marker.current = new AdvancedMarkerElement({
      map: mapObject.current,
      position: coords,
    });
    // Snap the map to the area around the searched place
    mapObject.current?.panTo(coords);
    mapObject.current?.setZoom(14);

    setLocationLoading(false);
  };

  return (
    <div className="relative">
      <div className="w-full rounded-xl" style={{ height: 650 }} id="map" />
      <SearchBox
        locationText={locationText}
        locationLoading={locationLoading}
        onPlaceSelected={handlePlaceSelected}
        onUserLocationSelected={getUserLocation}
      />
    </div>
  );
};

export default Map;
