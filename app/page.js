"use client";

import { useState, useEffect, useRef } from "react";
import countries from "world-map-country-shapes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [difficulty, setDifficulty] = useState("easy");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  // Format time as mm:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Get country list based on difficulty
  const getCountryList = () => {
    // Easy: Large, well-known countries (50+ countries)
    const easyCountries = [
      "US",
      "CA",
      "MX",
      "BR",
      "AR",
      "CL",
      "PE",
      "CO",
      "VE",
      "EC",
      "GB",
      "FR",
      "DE",
      "IT",
      "ES",
      "PT",
      "NL",
      "BE",
      "CH",
      "AT",
      "SE",
      "NO",
      "FI",
      "DK",
      "PL",
      "CZ",
      "GR",
      "RO",
      "HU",
      "IE",
      "RU",
      "UA",
      "TR",
      "CN",
      "IN",
      "JP",
      "KR",
      "TH",
      "VN",
      "ID",
      "PH",
      "MY",
      "SG",
      "AU",
      "NZ",
      "ZA",
      "EG",
      "NG",
      "KE",
      "ET",
      "DZ",
      "MA",
      "SD",
      "SA",
      "IR",
      "IQ",
      "AF",
      "PK",
    ];

    // Moderate: Medium-sized countries and smaller but recognizable ones (100+ countries)
    const moderateCountries = [
      ...easyCountries,
      "GT",
      "HN",
      "SV",
      "NI",
      "CR",
      "PA",
      "CU",
      "DO",
      "HT",
      "JM",
      "BO",
      "PY",
      "UY",
      "GY",
      "SR",
      "BZ",
      "TT",
      "BB",
      "BS",
      "GD",
      "IS",
      "LU",
      "MT",
      "CY",
      "EE",
      "LV",
      "LT",
      "SI",
      "HR",
      "RS",
      "BA",
      "MK",
      "AL",
      "BG",
      "MD",
      "BY",
      "SK",
      "ME",
      "XK",
      "LI",
      "MC",
      "AD",
      "SM",
      "VA",
      "GE",
      "AM",
      "AZ",
      "KZ",
      "UZ",
      "TM",
      "KG",
      "TJ",
      "MN",
      "NP",
      "BT",
      "BD",
      "LK",
      "MM",
      "LA",
      "KH",
      "BN",
      "TL",
      "PG",
      "FJ",
      "SB",
      "VU",
      "NC",
      "PF",
      "WS",
      "TO",
      "KI",
      "TV",
      "NR",
      "PW",
      "FM",
      "MH",
      "LY",
      "TN",
      "MR",
      "ML",
      "NE",
      "TD",
      "CF",
      "CM",
      "GH",
      "CI",
      "BF",
      "SN",
      "GN",
      "SL",
      "LR",
      "TG",
      "BJ",
      "GA",
      "CG",
      "CD",
      "AO",
      "ZM",
      "ZW",
      "BW",
      "NA",
      "MZ",
      "MW",
      "MG",
      "SC",
      "MU",
      "KM",
      "RE",
      "YT",
      "SZ",
    ];

    // Hard: All countries
    const allCountries = countries.map((c) => c.id);

    if (difficulty === "easy") return easyCountries;
    if (difficulty === "moderate") return moderateCountries;
    return allCountries;
  };

  // Get country name from ISO code
  const getCountryName = (code) => {
    const countryNames = {
      // Americas
      US: "United States",
      CA: "Canada",
      MX: "Mexico",
      BR: "Brazil",
      AR: "Argentina",
      CL: "Chile",
      PE: "Peru",
      CO: "Colombia",
      VE: "Venezuela",
      EC: "Ecuador",
      GT: "Guatemala",
      HN: "Honduras",
      SV: "El Salvador",
      NI: "Nicaragua",
      CR: "Costa Rica",
      PA: "Panama",
      CU: "Cuba",
      DO: "Dominican Republic",
      HT: "Haiti",
      JM: "Jamaica",
      BO: "Bolivia",
      PY: "Paraguay",
      UY: "Uruguay",
      GY: "Guyana",
      SR: "Suriname",
      BZ: "Belize",
      TT: "Trinidad and Tobago",
      BB: "Barbados",
      BS: "Bahamas",
      GD: "Grenada",

      // Europe
      GB: "United Kingdom",
      FR: "France",
      DE: "Germany",
      IT: "Italy",
      ES: "Spain",
      PT: "Portugal",
      NL: "Netherlands",
      BE: "Belgium",
      CH: "Switzerland",
      AT: "Austria",
      SE: "Sweden",
      NO: "Norway",
      FI: "Finland",
      DK: "Denmark",
      PL: "Poland",
      CZ: "Czech Republic",
      GR: "Greece",
      RO: "Romania",
      HU: "Hungary",
      IE: "Ireland",
      IS: "Iceland",
      LU: "Luxembourg",
      MT: "Malta",
      CY: "Cyprus",
      EE: "Estonia",
      LV: "Latvia",
      LT: "Lithuania",
      SI: "Slovenia",
      HR: "Croatia",
      RS: "Serbia",
      BA: "Bosnia and Herzegovina",
      MK: "North Macedonia",
      AL: "Albania",
      BG: "Bulgaria",
      MD: "Moldova",
      BY: "Belarus",
      SK: "Slovakia",
      ME: "Montenegro",
      XK: "Kosovo",
      LI: "Liechtenstein",
      MC: "Monaco",
      AD: "Andorra",
      SM: "San Marino",
      VA: "Vatican City",

      // Asia
      RU: "Russia",
      UA: "Ukraine",
      TR: "Turkey",
      CN: "China",
      IN: "India",
      JP: "Japan",
      KR: "South Korea",
      TH: "Thailand",
      VN: "Vietnam",
      ID: "Indonesia",
      PH: "Philippines",
      MY: "Malaysia",
      SG: "Singapore",
      GE: "Georgia",
      AM: "Armenia",
      AZ: "Azerbaijan",
      KZ: "Kazakhstan",
      UZ: "Uzbekistan",
      TM: "Turkmenistan",
      KG: "Kyrgyzstan",
      TJ: "Tajikistan",
      MN: "Mongolia",
      NP: "Nepal",
      BT: "Bhutan",
      BD: "Bangladesh",
      LK: "Sri Lanka",
      MM: "Myanmar",
      LA: "Laos",
      KH: "Cambodia",
      BN: "Brunei",
      TL: "East Timor",
      SA: "Saudi Arabia",
      IR: "Iran",
      IQ: "Iraq",
      AF: "Afghanistan",
      PK: "Pakistan",

      // Oceania
      AU: "Australia",
      NZ: "New Zealand",
      PG: "Papua New Guinea",
      FJ: "Fiji",
      SB: "Solomon Islands",
      VU: "Vanuatu",
      NC: "New Caledonia",
      PF: "French Polynesia",
      WS: "Samoa",
      TO: "Tonga",
      KI: "Kiribati",
      TV: "Tuvalu",
      NR: "Nauru",
      PW: "Palau",
      FM: "Micronesia",
      MH: "Marshall Islands",

      // Africa
      ZA: "South Africa",
      EG: "Egypt",
      NG: "Nigeria",
      KE: "Kenya",
      ET: "Ethiopia",
      DZ: "Algeria",
      MA: "Morocco",
      SD: "Sudan",
      LY: "Libya",
      TN: "Tunisia",
      MR: "Mauritania",
      ML: "Mali",
      NE: "Niger",
      TD: "Chad",
      CF: "Central African Republic",
      CM: "Cameroon",
      GH: "Ghana",
      CI: "Ivory Coast",
      BF: "Burkina Faso",
      SN: "Senegal",
      GN: "Guinea",
      SL: "Sierra Leone",
      LR: "Liberia",
      TG: "Togo",
      BJ: "Benin",
      GA: "Gabon",
      CG: "Congo",
      CD: "Democratic Republic of the Congo",
      AO: "Angola",
      ZM: "Zambia",
      ZW: "Zimbabwe",
      BW: "Botswana",
      NA: "Namibia",
      MZ: "Mozambique",
      MW: "Malawi",
      MG: "Madagascar",
      SC: "Seychelles",
      MU: "Mauritius",
      KM: "Comoros",
      RE: "Reunion",
      YT: "Mayotte",
      SZ: "Eswatini",
    };
    return countryNames[code] || code;
  };

  // Start game
  const handlePlay = () => {
    setIsPlaying(true);
    setScore(0);
    setCorrectAnswers(0);
    setTime(0);
    selectRandomCountry();
  };

  // Reset game
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentCountry(null);
    setUserAnswer("");
    setScore(0);
    setCorrectAnswers(0);
    setTime(0);
  };

  // Select random country
  const selectRandomCountry = () => {
    const countryList = getCountryList();
    const randomCountry =
      countryList[Math.floor(Math.random() * countryList.length)];
    setCurrentCountry(randomCountry);
    setUserAnswer("");
  };

  // Handle skip
  const handleSkip = () => {
    if (!isPlaying || !currentCountry) return;
    setScore(Math.max(0, score - 3)); // Penalty for skipping
    selectRandomCountry();
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPlaying || !currentCountry) return;

    const correctName = getCountryName(currentCountry).toLowerCase();
    const userInput = userAnswer.toLowerCase().trim();

    if (userInput === correctName) {
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      setScore(score + 10);
      setFeedback("correct");

      // Clear feedback after animation
      setTimeout(() => setFeedback(null), 500);

      if (newCorrectAnswers >= 5) {
        setIsPlaying(false);
        setShowConfetti(true);
        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
        setTimeout(() => {
          alert(`🎉 Congratulations! You won! Time: ${formatTime(time)}`);
        }, 100);
        return;
      }

      selectRandomCountry();
    } else {
      setScore(Math.max(0, score - 5));
      setUserAnswer("");
      setFeedback("wrong");

      // Clear feedback after animation
      setTimeout(() => setFeedback(null), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    "#ef4444",
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#8b5cf6",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          {/* Title */}
          <h1 className="text-4xl font-bold text-indigo-900">Country Rush</h1>

          {/* Controls */}
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
              <Button
                variant={difficulty === "easy" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDifficulty("easy")}
                disabled={isPlaying}
              >
                Easy
              </Button>
              <Button
                variant={difficulty === "moderate" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDifficulty("moderate")}
                disabled={isPlaying}
              >
                Moderate
              </Button>
              <Button
                variant={difficulty === "hard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDifficulty("hard")}
                disabled={isPlaying}
              >
                Hard
              </Button>
            </div>
            <Button onClick={handlePlay} disabled={isPlaying}>
              Play
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        {/* Timer and Score */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg px-8 py-4">
            <div className="text-5xl font-mono font-bold text-indigo-600">
              {formatTime(time)}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Score: {score} | Correct: {correctAnswers}/5
            </div>
          </div>

          {/* Answer Input - Next to Timer */}
          <div className="flex flex-col gap-2">
            {feedback === "wrong" && (
              <div className="text-center">
                <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  ❌ Wrong Answer!
                </span>
              </div>
            )}
            {feedback === "correct" && (
              <div className="text-center">
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  ✓ Correct!
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter country name..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={!isPlaying}
                className={`w-80 text-lg ${
                  feedback === "wrong" ? "border-red-500 border-2" : ""
                }`}
              />
              <Button type="submit" disabled={!isPlaying}>
                Enter
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                disabled={!isPlaying}
              >
                Skip
              </Button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000 1001"
            className="w-full h-auto"
          >
            {countries.map((country) => (
              <path
                key={country.id}
                d={country.shape}
                fill={currentCountry === country.id ? "#3b82f6" : "#e5e7eb"}
                stroke="#9ca3af"
                strokeWidth="0.5"
                className="transition-colors duration-300"
              />
            ))}
          </svg>
        </div>

        {/* Rules Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-indigo-900 mb-3">
            How to Play
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">1.</span>
              <span>
                Select your difficulty level: Easy (58 countries), Moderate
                (120+ countries), or Hard (all countries)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">2.</span>
              <span>Click the Play button to start the game</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">3.</span>
              <span>
                A random country will be highlighted on the map in blue
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">4.</span>
              <span>
                Type the country name and press Enter or click the Enter button
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">5.</span>
              <span>
                Get 5 countries correct to win! Correct answers give +10 points,
                wrong answers -5 points
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">6.</span>
              <span>
                Can't figure out a country? Click Skip to move to the next one
                (-3 points)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-2">7.</span>
              <span>
                Try to complete the game as fast as possible and beat your best
                time!
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
