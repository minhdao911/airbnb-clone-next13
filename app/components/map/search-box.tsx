/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaLocationArrow } from "react-icons/fa";
import Loader from "../loader";

interface SearchBoxProps {
  locationText: string;
  locationLoading: boolean;
  onPlaceSelected: (placeId: string) => void;
  onUserLocationSelected: () => void;
}

const SearchBox: FunctionComponent<SearchBoxProps> = ({
  locationText,
  locationLoading,
  onPlaceSelected,
  onUserLocationSelected,
}) => {
  const autoCompleteService = new google.maps.places.AutocompleteService();
  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken]
  );

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<
    Array<{ id: string | undefined; name: string; address: string }>
  >([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (!locationLoading) {
      setIsInputFocused(false);
    }
  }, [locationLoading]);

  useEffect(() => {
    setSearchText(locationText);
  }, [locationText]);

  const handlePredictions = (
    predictions: google.maps.places.AutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      predictions !== null
    ) {
      const suggestions = predictions.map((prediction) => ({
        id: prediction.place_id as string,
        name: prediction.structured_formatting.main_text as string,
        address: prediction.structured_formatting.secondary_text as string,
      }));
      setSearchResult(suggestions);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <div className="absolute top-5 left-5 right-5">
      <div className="relative w-full">
        <div className="flex items-center absolute top-0 left-0 w-full gap-3 p-5 px-7 rounded-full bg-white shadow-md z-10">
          <IoLocationSharp size={24} />
          <input
            className="w-full focus:outline-none"
            type="text"
            placeholder="Enter your address"
            value={searchText}
            onClick={() => setIsInputFocused(true)}
            onChange={(e: any) => {
              const { value } = e.target;
              setSearchText(value);
              if (value === "") setSearchResult([]);
              else {
                autoCompleteService.getPlacePredictions(
                  {
                    input: value,
                    sessionToken,
                  },
                  handlePredictions
                );
              }
            }}
          />
        </div>
        {(searchResult.length > 0 || isInputFocused) && (
          <ul
            className="absolute top-0 left-0 w-full rounded-xl overflow-hidden bg-white transition"
            style={{ paddingTop: 50, top: 26 }}
          >
            {searchResult.length > 0 ? (
              <>
                {searchResult?.map(({ id, name, address }) => (
                  <li
                    key={id}
                    className="flex items-center p-3 px-5 gap-4 hover:bg-neutral-300 cursor-pointer"
                    onClick={() => {
                      onPlaceSelected(id || "");
                      setSearchResult([]);
                      //   setSearchText(name);
                      setIsInputFocused(false);
                    }}
                  >
                    <div className="p-2 rounded-full bg-neutral-100">
                      <HiBuildingOffice2 size={20} />
                    </div>
                    <div className="flex flex-col">
                      <p>{name}</p>
                      <p className="text-sm">{address}</p>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <>
                {isInputFocused && (
                  <>
                    {locationLoading ? (
                      <li className="flex items-center justify-center p-3">
                        <Loader />
                      </li>
                    ) : (
                      <li
                        className="flex items-center p-3 px-5 gap-4 hover:bg-neutral-300 cursor-pointer"
                        onClick={onUserLocationSelected}
                      >
                        <div className="p-3 rounded-full text-neutral-500 bg-neutral-100">
                          <FaLocationArrow size={15} />
                        </div>
                        <p>Use my current location</p>
                      </li>
                    )}
                  </>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
