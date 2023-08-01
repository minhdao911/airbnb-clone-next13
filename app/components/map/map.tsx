import { FunctionComponent, useEffect, useRef } from "react";
import SearchBox from "./search-box";

interface MapProps {}

const Map: FunctionComponent<MapProps> = () => {
  const marker = useRef<google.maps.marker.AdvancedMarkerElement>();
  const mapObject = useRef<google.maps.Map>();

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
      const request = {
        placeId,
        fields: ["name", "geometry"],
      };
      const placesService = new google.maps.places.PlacesService(
        mapObject.current
      );
      placesService.getDetails(request, handlePlacesDetailsResponse);
    }
  };

  const handlePlacesDetailsResponse = async (
    place: google.maps.places.PlaceResult | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (
      status === "OK" &&
      place?.geometry?.location?.lat() &&
      place?.geometry?.location?.lng()
    ) {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      const coordinates: google.maps.LatLngLiteral = {
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      };
      // Remove the marker from Google Maps for the previously searched place
      if (marker.current?.map) {
        marker.current.map = null;
      }
      // Drop the marker to the searched place location
      marker.current = new AdvancedMarkerElement({
        map: mapObject.current,
        position: coordinates,
      });
      // Snap the map to the area around the searched place
      mapObject.current?.panTo(coordinates);
      mapObject.current?.setZoom(14);
    }
  };

  return (
    <div className="relative">
      <div className="w-full rounded-xl" style={{ height: 650 }} id="map" />
      <SearchBox onPlaceSelected={handlePlaceSelected} />
    </div>
  );
};

export default Map;
