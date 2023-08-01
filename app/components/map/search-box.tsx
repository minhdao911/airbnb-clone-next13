/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";

interface SearchBoxProps {
  onPlaceSelected: (placeId: string) => void;
}

const SearchBox: FunctionComponent<SearchBoxProps> = ({ onPlaceSelected }) => {
  const autoCompleteService = new google.maps.places.AutocompleteService();
  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken]
  );

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<
    Array<{ id: string | undefined; name: string; address: string }>
  >([]);

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
        {searchResult.length > 0 && (
          <ul
            className="absolute top-0 left-0 w-full rounded-xl overflow-hidden bg-white transition"
            style={{ paddingTop: 50, top: 26 }}
          >
            {searchResult?.map(({ id, name, address }) => (
              <li
                key={id}
                className="flex items-center p-3 px-5 gap-4 hover:bg-neutral-300 cursor-pointer"
                onClick={() => {
                  onPlaceSelected(id || "");
                  setSearchResult([]);
                  setSearchText(name);
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
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
