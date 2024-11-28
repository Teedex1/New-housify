import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Nigerian major cities and states
  const nigerianLocations = [
    "Lagos", "Ikeja", "Lekki", "Victoria Island", "Ikoyi",
    "Abuja", "Garki", "Wuse", "Maitama", "Asokoro",
    "Port Harcourt", "Kano", "Ibadan", "Benin City",
    "Calabar", "Uyo", "Enugu", "Owerri", "Kaduna",
    "Jos", "Ilorin", "Abeokuta", "Onitsha", "Warri"
  ];

  const handleInputChange = (event) => {
    const value = event.target.value;
    setLocation(value);

    // Filter locations based on input
    const filtered = nigerianLocations.filter(loc =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered : []);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically trigger a search with the selected location
    console.log("Searching properties in: " + location);
  };

  return (
    <div className="md:mr-20 mt-5">
      <form className="relative" onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={location}
          className="country rounded-full py-4 px-6 w-full text-black outline-0"
          placeholder="Enter location in Nigeria"
          autoComplete="off"
        />
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="absolute right-0 rounded-full py-4 px-6 bg-pink-700 hover:bg-purple-700 text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchButton;
