import React, {useState, useEffect} from "react"
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
import AsyncStorage from '@react-native-community/async-storage';
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-date-picker'
// import {countries, usaStates, statesCity} from './UsaStateCityList'


const Blank = ({navigation}) => {
  const genders = ["Male", "Female"]

    
  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Côte dIvoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "The Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia, Federated States of", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Sudan, South", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]


  const usaStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"]


  const statesCity = {
      "New York": [
        "New York",
        "Buffalo",
        "Rochester",
        "Yonkers",
        "Syracuse",
        "Albany",
        "New Rochelle",
        "Mount Vernon",
        "Schenectady",
        "Utica",
        "White Plains",
        "Hempstead",
        "Troy",
        "Niagara Falls",
        "Binghamton",
        "Freeport",
        "Valley Stream"
      ],
      "California": [
        "Los Angeles",
        "San Diego",
        "San Jose",
        "San Francisco",
        "Fresno",
        "Sacramento",
        "Long Beach",
        "Oakland",
        "Bakersfield",
        "Anaheim",
        "Santa Ana",
        "Riverside",
        "Stockton",
        "Chula Vista",
        "Irvine",
        "Fremont",
        "San Bernardino",
        "Modesto",
        "Fontana",
        "Oxnard",
        "Moreno Valley",
        "Huntington Beach",
        "Glendale",
        "Santa Clarita",
        "Garden Grove",
        "Oceanside",
        "Rancho Cucamonga",
        "Santa Rosa",
        "Ontario",
        "Lancaster",
        "Elk Grove",
        "Corona",
        "Palmdale",
        "Salinas",
        "Pomona",
        "Hayward",
        "Escondido",
        "Torrance",
        "Sunnyvale",
        "Orange",
        "Fullerton",
        "Pasadena",
        "Thousand Oaks",
        "Visalia",
        "Simi Valley",
        "Concord",
        "Roseville",
        "Victorville",
        "Santa Clara",
        "Vallejo",
        "Berkeley",
        "El Monte",
        "Downey",
        "Costa Mesa",
        "Inglewood",
        "Carlsbad",
        "San Buenaventura (Ventura)",
        "Fairfield",
        "West Covina",
        "Murrieta",
        "Richmond",
        "Norwalk",
        "Antioch",
        "Temecula",
        "Burbank",
        "Daly City",
        "Rialto",
        "Santa Maria",
        "El Cajon",
        "San Mateo",
        "Clovis",
        "Compton",
        "Jurupa Valley",
        "Vista",
        "South Gate",
        "Mission Viejo",
        "Vacaville",
        "Carson",
        "Hesperia",
        "Santa Monica",
        "Westminster",
        "Redding",
        "Santa Barbara",
        "Chico",
        "Newport Beach",
        "San Leandro",
        "San Marcos",
        "Whittier",
        "Hawthorne",
        "Citrus Heights",
        "Tracy",
        "Alhambra",
        "Livermore",
        "Buena Park",
        "Menifee",
        "Hemet",
        "Lakewood",
        "Merced",
        "Chino",
        "Indio",
        "Redwood City",
        "Lake Forest",
        "Napa",
        "Tustin",
        "Bellflower",
        "Mountain View",
        "Chino Hills",
        "Baldwin Park",
        "Alameda",
        "Upland",
        "San Ramon",
        "Folsom",
        "Pleasanton",
        "Union City",
        "Perris",
        "Manteca",
        "Lynwood",
        "Apple Valley",
        "Redlands",
        "Turlock",
        "Milpitas",
        "Redondo Beach",
        "Rancho Cordova",
        "Yorba Linda",
        "Palo Alto",
        "Davis",
        "Camarillo",
        "Walnut Creek",
        "Pittsburg",
        "South San Francisco",
        "Yuba City",
        "San Clemente",
        "Laguna Niguel",
        "Pico Rivera",
        "Montebello",
        "Lodi",
        "Madera",
        "Santa Cruz",
        "La Habra",
        "Encinitas",
        "Monterey Park",
        "Tulare",
        "Cupertino",
        "Gardena",
        "National City",
        "Rocklin",
        "Petaluma",
        "Huntington Park",
        "San Rafael",
        "La Mesa",
        "Arcadia",
        "Fountain Valley",
        "Diamond Bar",
        "Woodland",
        "Santee",
        "Lake Elsinore",
        "Porterville",
        "Paramount",
        "Eastvale",
        "Rosemead",
        "Hanford",
        "Highland",
        "Brentwood",
        "Novato",
        "Colton",
        "Cathedral City",
        "Delano",
        "Yucaipa",
        "Watsonville",
        "Placentia",
        "Glendora",
        "Gilroy",
        "Palm Desert",
        "Cerritos",
        "West Sacramento",
        "Aliso Viejo",
        "Poway",
        "La Mirada",
        "Rancho Santa Margarita",
        "Cypress",
        "Dublin",
        "Covina",
        "Azusa",
        "Palm Springs",
        "San Luis Obispo",
        "Ceres",
        "San Jacinto",
        "Lincoln",
        "Newark",
        "Lompoc",
        "El Centro",
        "Danville",
        "Bell Gardens",
        "Coachella",
        "Rancho Palos Verdes",
        "San Bruno",
        "Rohnert Park",
        "Brea",
        "La Puente",
        "Campbell",
        "San Gabriel",
        "Beaumont",
        "Morgan Hill",
        "Culver City",
        "Calexico",
        "Stanton",
        "La Quinta",
        "Pacifica",
        "Montclair",
        "Oakley",
        "Monrovia",
        "Los Banos",
        "Martinez"
      ],
      "Illinois": [
        "Chicago",
        "Aurora",
        "Rockford",
        "Joliet",
        "Naperville",
        "Springfield",
        "Peoria",
        "Elgin",
        "Waukegan",
        "Cicero",
        "Champaign",
        "Bloomington",
        "Arlington Heights",
        "Evanston",
        "Decatur",
        "Schaumburg",
        "Bolingbrook",
        "Palatine",
        "Skokie",
        "Des Plaines",
        "Orland Park",
        "Tinley Park",
        "Oak Lawn",
        "Berwyn",
        "Mount Prospect",
        "Normal",
        "Wheaton",
        "Hoffman Estates",
        "Oak Park",
        "Downers Grove",
        "Elmhurst",
        "Glenview",
        "DeKalb",
        "Lombard",
        "Belleville",
        "Moline",
        "Buffalo Grove",
        "Bartlett",
        "Urbana",
        "Quincy",
        "Crystal Lake",
        "Plainfield",
        "Streamwood",
        "Carol Stream",
        "Romeoville",
        "Rock Island",
        "Hanover Park",
        "Carpentersville",
        "Wheeling",
        "Park Ridge",
        "Addison",
        "Calumet City"
      ],
      "Texas": [
        "Houston",
        "San Antonio",
        "Dallas",
        "Austin",
        "Fort Worth",
        "El Paso",
        "Arlington",
        "Corpus Christi",
        "Plano",
        "Laredo",
        "Lubbock",
        "Garland",
        "Irving",
        "Amarillo",
        "Grand Prairie",
        "Brownsville",
        "Pasadena",
        "McKinney",
        "Mesquite",
        "McAllen",
        "Killeen",
        "Frisco",
        "Waco",
        "Carrollton",
        "Denton",
        "Midland",
        "Abilene",
        "Beaumont",
        "Round Rock",
        "Odessa",
        "Wichita Falls",
        "Richardson",
        "Lewisville",
        "Tyler",
        "College Station",
        "Pearland",
        "San Angelo",
        "Allen",
        "League City",
        "Sugar Land",
        "Longview",
        "Edinburg",
        "Mission",
        "Bryan",
        "Baytown",
        "Pharr",
        "Temple",
        "Missouri City",
        "Flower Mound",
        "Harlingen",
        "North Richland Hills",
        "Victoria",
        "Conroe",
        "New Braunfels",
        "Mansfield",
        "Cedar Park",
        "Rowlett",
        "Port Arthur",
        "Euless",
        "Georgetown",
        "Pflugerville",
        "DeSoto",
        "San Marcos",
        "Grapevine",
        "Bedford",
        "Galveston",
        "Cedar Hill",
        "Texas City",
        "Wylie",
        "Haltom City",
        "Keller",
        "Coppell",
        "Rockwall",
        "Huntsville",
        "Duncanville",
        "Sherman",
        "The Colony",
        "Burleson",
        "Hurst",
        "Lancaster",
        "Texarkana",
        "Friendswood",
        "Weslaco"
      ],
      "Pennsylvania": [
        "Philadelphia",
        "Pittsburgh",
        "Allentown",
        "Erie",
        "Reading",
        "Scranton",
        "Bethlehem",
        "Lancaster",
        "Harrisburg",
        "Altoona",
        "York",
        "State College",
        "Wilkes-Barre"
      ],
      "Arizona": [
        "Phoenix",
        "Tucson",
        "Mesa",
        "Chandler",
        "Glendale",
        "Scottsdale",
        "Gilbert",
        "Tempe",
        "Peoria",
        "Surprise",
        "Yuma",
        "Avondale",
        "Goodyear",
        "Flagstaff",
        "Buckeye",
        "Lake Havasu City",
        "Casa Grande",
        "Sierra Vista",
        "Maricopa",
        "Oro Valley",
        "Prescott",
        "Bullhead City",
        "Prescott Valley",
        "Marana",
        "Apache Junction"
      ],
      "Florida": [
        "Jacksonville",
        "Miami",
        "Tampa",
        "Orlando",
        "St. Petersburg",
        "Hialeah",
        "Tallahassee",
        "Fort Lauderdale",
        "Port St. Lucie",
        "Cape Coral",
        "Pembroke Pines",
        "Hollywood",
        "Miramar",
        "Gainesville",
        "Coral Springs",
        "Miami Gardens",
        "Clearwater",
        "Palm Bay",
        "Pompano Beach",
        "West Palm Beach",
        "Lakeland",
        "Davie",
        "Miami Beach",
        "Sunrise",
        "Plantation",
        "Boca Raton",
        "Deltona",
        "Largo",
        "Deerfield Beach",
        "Palm Coast",
        "Melbourne",
        "Boynton Beach",
        "Lauderhill",
        "Weston",
        "Fort Myers",
        "Kissimmee",
        "Homestead",
        "Tamarac",
        "Delray Beach",
        "Daytona Beach",
        "North Miami",
        "Wellington",
        "North Port",
        "Jupiter",
        "Ocala",
        "Port Orange",
        "Margate",
        "Coconut Creek",
        "Sanford",
        "Sarasota",
        "Pensacola",
        "Bradenton",
        "Palm Beach Gardens",
        "Pinellas Park",
        "Coral Gables",
        "Doral",
        "Bonita Springs",
        "Apopka",
        "Titusville",
        "North Miami Beach",
        "Oakland Park",
        "Fort Pierce",
        "North Lauderdale",
        "Cutler Bay",
        "Altamonte Springs",
        "St. Cloud",
        "Greenacres",
        "Ormond Beach",
        "Ocoee",
        "Hallandale Beach",
        "Winter Garden",
        "Aventura"
      ],
      "Indiana": [
        "Indianapolis",
        "Fort Wayne",
        "Evansville",
        "South Bend",
        "Carmel",
        "Bloomington",
        "Fishers",
        "Hammond",
        "Gary",
        "Muncie",
        "Lafayette",
        "Terre Haute",
        "Kokomo",
        "Anderson",
        "Noblesville",
        "Greenwood",
        "Elkhart",
        "Mishawaka",
        "Lawrence",
        "Jeffersonville",
        "Columbus",
        "Portage"
      ],
      "Ohio": [
        "Columbus",
        "Cleveland",
        "Cincinnati",
        "Toledo",
        "Akron",
        "Dayton",
        "Parma",
        "Canton",
        "Youngstown",
        "Lorain",
        "Hamilton",
        "Springfield",
        "Kettering",
        "Elyria",
        "Lakewood",
        "Cuyahoga Falls",
        "Middletown",
        "Euclid",
        "Newark",
        "Mansfield",
        "Mentor",
        "Beavercreek",
        "Cleveland Heights",
        "Strongsville",
        "Dublin",
        "Fairfield",
        "Findlay",
        "Warren",
        "Lancaster",
        "Lima",
        "Huber Heights",
        "Westerville",
        "Marion",
        "Grove City"
      ],
      "North Carolina": [
        "Charlotte",
        "Raleigh",
        "Greensboro",
        "Durham",
        "Winston-Salem",
        "Fayetteville",
        "Cary",
        "Wilmington",
        "High Point",
        "Greenville",
        "Asheville",
        "Concord",
        "Gastonia",
        "Jacksonville",
        "Chapel Hill",
        "Rocky Mount",
        "Burlington",
        "Wilson",
        "Huntersville",
        "Kannapolis",
        "Apex",
        "Hickory",
        "Goldsboro"
      ],
      "Michigan": [
        "Detroit",
        "Grand Rapids",
        "Warren",
        "Sterling Heights",
        "Ann Arbor",
        "Lansing",
        "Flint",
        "Dearborn",
        "Livonia",
        "Westland",
        "Troy",
        "Farmington Hills",
        "Kalamazoo",
        "Wyoming",
        "Southfield",
        "Rochester Hills",
        "Taylor",
        "Pontiac",
        "St. Clair Shores",
        "Royal Oak",
        "Novi",
        "Dearborn Heights",
        "Battle Creek",
        "Saginaw",
        "Kentwood",
        "East Lansing",
        "Roseville",
        "Portage",
        "Midland",
        "Lincoln Park",
        "Muskegon"
      ],
      "Tennessee": [
        "Memphis",
        "Nashville-Davidson",
        "Knoxville",
        "Chattanooga",
        "Clarksville",
        "Murfreesboro",
        "Jackson",
        "Franklin",
        "Johnson City",
        "Bartlett",
        "Hendersonville",
        "Kingsport",
        "Collierville",
        "Cleveland",
        "Smyrna",
        "Germantown",
        "Brentwood"
      ],
      "Massachusetts": [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
        "Brockton",
        "Quincy",
        "Lynn",
        "Fall River",
        "Newton",
        "Lawrence",
        "Somerville",
        "Waltham",
        "Haverhill",
        "Malden",
        "Medford",
        "Taunton",
        "Chicopee",
        "Weymouth Town",
        "Revere",
        "Peabody",
        "Methuen",
        "Barnstable Town",
        "Pittsfield",
        "Attleboro",
        "Everett",
        "Salem",
        "Westfield",
        "Leominster",
        "Fitchburg",
        "Beverly",
        "Holyoke",
        "Marlborough",
        "Woburn",
        "Chelsea"
      ],
      "Washington": [
        "Seattle",
        "Spokane",
        "Tacoma",
        "Vancouver",
        "Bellevue",
        "Kent",
        "Everett",
        "Renton",
        "Yakima",
        "Federal Way",
        "Spokane Valley",
        "Bellingham",
        "Kennewick",
        "Auburn",
        "Pasco",
        "Marysville",
        "Lakewood",
        "Redmond",
        "Shoreline",
        "Richland",
        "Kirkland",
        "Burien",
        "Sammamish",
        "Olympia",
        "Lacey",
        "Edmonds",
        "Bremerton",
        "Puyallup"
      ],
      "Colorado": [
        "Denver",
        "Colorado Springs",
        "Aurora",
        "Fort Collins",
        "Lakewood",
        "Thornton",
        "Arvada",
        "Westminster",
        "Pueblo",
        "Centennial",
        "Boulder",
        "Greeley",
        "Longmont",
        "Loveland",
        "Grand Junction",
        "Broomfield",
        "Castle Rock",
        "Commerce City",
        "Parker",
        "Littleton",
        "Northglenn"
      ],
      "District of Columbia": [
        "Washington"
      ],
      "Maryland": [
        "Baltimore",
        "Frederick",
        "Rockville",
        "Gaithersburg",
        "Bowie",
        "Hagerstown",
        "Annapolis"
      ],
      "Kentucky": [
        "Louisville/Jefferson County",
        "Lexington-Fayette",
        "Bowling Green",
        "Owensboro",
        "Covington"
      ],
      "Oregon": [
        "Portland",
        "Eugene",
        "Salem",
        "Gresham",
        "Hillsboro",
        "Beaverton",
        "Bend",
        "Medford",
        "Springfield",
        "Corvallis",
        "Albany",
        "Tigard",
        "Lake Oswego",
        "Keizer"
      ],
      "Oklahoma": [
        "Oklahoma City",
        "Tulsa",
        "Norman",
        "Broken Arrow",
        "Lawton",
        "Edmond",
        "Moore",
        "Midwest City",
        "Enid",
        "Stillwater",
        "Muskogee"
      ],
      "Wisconsin": [
        "Milwaukee",
        "Madison",
        "Green Bay",
        "Kenosha",
        "Racine",
        "Appleton",
        "Waukesha",
        "Eau Claire",
        "Oshkosh",
        "Janesville",
        "West Allis",
        "La Crosse",
        "Sheboygan",
        "Wauwatosa",
        "Fond du Lac",
        "New Berlin",
        "Wausau",
        "Brookfield",
        "Greenfield",
        "Beloit"
      ],
      "Nevada": [
        "Las Vegas",
        "Henderson",
        "Reno",
        "North Las Vegas",
        "Sparks",
        "Carson City"
      ],
      "New Mexico": [
        "Albuquerque",
        "Las Cruces",
        "Rio Rancho",
        "Santa Fe",
        "Roswell",
        "Farmington",
        "Clovis"
      ],
      "Missouri": [
        "Kansas City",
        "St. Louis",
        "Springfield",
        "Independence",
        "Columbia",
        "Lee's Summit",
        "O'Fallon",
        "St. Joseph",
        "St. Charles",
        "St. Peters",
        "Blue Springs",
        "Florissant",
        "Joplin",
        "Chesterfield",
        "Jefferson City",
        "Cape Girardeau"
      ],
      "Virginia": [
        "Virginia Beach",
        "Norfolk",
        "Chesapeake",
        "Richmond",
        "Newport News",
        "Alexandria",
        "Hampton",
        "Roanoke",
        "Portsmouth",
        "Suffolk",
        "Lynchburg",
        "Harrisonburg",
        "Leesburg",
        "Charlottesville",
        "Danville",
        "Blacksburg",
        "Manassas"
      ],
      "Georgia": [
        "Atlanta",
        "Columbus",
        "Augusta-Richmond County",
        "Savannah",
        "Athens-Clarke County",
        "Sandy Springs",
        "Roswell",
        "Macon",
        "Johns Creek",
        "Albany",
        "Warner Robins",
        "Alpharetta",
        "Marietta",
        "Valdosta",
        "Smyrna",
        "Dunwoody"
      ],
      "Nebraska": [
        "Omaha",
        "Lincoln",
        "Bellevue",
        "Grand Island"
      ],
      "Minnesota": [
        "Minneapolis",
        "St. Paul",
        "Rochester",
        "Duluth",
        "Bloomington",
        "Brooklyn Park",
        "Plymouth",
        "St. Cloud",
        "Eagan",
        "Woodbury",
        "Maple Grove",
        "Eden Prairie",
        "Coon Rapids",
        "Burnsville",
        "Blaine",
        "Lakeville",
        "Minnetonka",
        "Apple Valley",
        "Edina",
        "St. Louis Park",
        "Mankato",
        "Maplewood",
        "Moorhead",
        "Shakopee"
      ],
      "Kansas": [
        "Wichita",
        "Overland Park",
        "Kansas City",
        "Olathe",
        "Topeka",
        "Lawrence",
        "Shawnee",
        "Manhattan",
        "Lenexa",
        "Salina",
        "Hutchinson"
      ],
      "Louisiana": [
        "New Orleans",
        "Baton Rouge",
        "Shreveport",
        "Lafayette",
        "Lake Charles",
        "Kenner",
        "Bossier City",
        "Monroe",
        "Alexandria"
      ],
      "Hawaii": [
        "Honolulu"
      ],
      "Alaska": [
        "Anchorage"
      ],
      "New Jersey": [
        "Newark",
        "Jersey City",
        "Paterson",
        "Elizabeth",
        "Clifton",
        "Trenton",
        "Camden",
        "Passaic",
        "Union City",
        "Bayonne",
        "East Orange",
        "Vineland",
        "New Brunswick",
        "Hoboken",
        "Perth Amboy",
        "West New York",
        "Plainfield",
        "Hackensack",
        "Sayreville",
        "Kearny",
        "Linden",
        "Atlantic City"
      ],
      "Idaho": [
        "Boise City",
        "Nampa",
        "Meridian",
        "Idaho Falls",
        "Pocatello",
        "Caldwell",
        "Coeur d'Alene",
        "Twin Falls"
      ],
      "Alabama": [
        "Birmingham",
        "Montgomery",
        "Mobile",
        "Huntsville",
        "Tuscaloosa",
        "Hoover",
        "Dothan",
        "Auburn",
        "Decatur",
        "Madison",
        "Florence",
        "Gadsden"
      ],
      "Iowa": [
        "Des Moines",
        "Cedar Rapids",
        "Davenport",
        "Sioux City",
        "Iowa City",
        "Waterloo",
        "Council Bluffs",
        "Ames",
        "West Des Moines",
        "Dubuque",
        "Ankeny",
        "Urbandale",
        "Cedar Falls"
      ],
      "Arkansas": [
        "Little Rock",
        "Fort Smith",
        "Fayetteville",
        "Springdale",
        "Jonesboro",
        "North Little Rock",
        "Conway",
        "Rogers",
        "Pine Bluff",
        "Bentonville"
      ],
      "Utah": [
        "Salt Lake City",
        "West Valley City",
        "Provo",
        "West Jordan",
        "Orem",
        "Sandy",
        "Ogden",
        "St. George",
        "Layton",
        "Taylorsville",
        "South Jordan",
        "Lehi",
        "Logan",
        "Murray",
        "Draper",
        "Bountiful",
        "Riverton",
        "Roy"
      ],
      "Rhode Island": [
        "Providence",
        "Warwick",
        "Cranston",
        "Pawtucket",
        "East Providence",
        "Woonsocket"
      ],
      "Mississippi": [
        "Jackson",
        "Gulfport",
        "Southaven",
        "Hattiesburg",
        "Biloxi",
        "Meridian"
      ],
      "South Dakota": [
        "Sioux Falls",
        "Rapid City"
      ],
      "Connecticut": [
        "Bridgeport",
        "New Haven",
        "Stamford",
        "Hartford",
        "Waterbury",
        "Norwalk",
        "Danbury",
        "New Britain",
        "Meriden",
        "Bristol",
        "West Haven",
        "Milford",
        "Middletown",
        "Norwich",
        "Shelton"
      ],
      "South Carolina": [
        "Columbia",
        "Charleston",
        "North Charleston",
        "Mount Pleasant",
        "Rock Hill",
        "Greenville",
        "Summerville",
        "Sumter",
        "Goose Creek",
        "Hilton Head Island",
        "Florence",
        "Spartanburg"
      ],
      "New Hampshire": [
        "Manchester",
        "Nashua",
        "Concord"
      ],
      "North Dakota": [
        "Fargo",
        "Bismarck",
        "Grand Forks",
        "Minot"
      ],
      "Montana": [
        "Billings",
        "Missoula",
        "Great Falls",
        "Bozeman"
      ],
      "Delaware": [
        "Wilmington",
        "Dover"
      ],
      "Maine": [
        "Portland"
      ],
      "Wyoming": [
        "Cheyenne",
        "Casper"
      ],
      "West Virginia": [
        "Charleston",
        "Huntington"
      ],
      "Vermont": [
        "Burlington"
      ]
    }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dateFormatAmPm = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    // var strTime = monthNames[month] + " " + day + "," + year;
    var strTime = year + "-" + month + "-" + day;
    return strTime;
  }

  const [LoadingEffect, setLoadingEffect] = useState(true);
  const [userDob, setUserDob] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userZip, setUserZip] = useState("");
  const [userState, setUserState] = useState("");
  const [userCountry, setUserCountry] = useState("");
  // const userToken = "735cd18d6e50adcbc63f2b045702621b9cbe6bc5";
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);
  const [selectedCountryIsUsa, setSelectedCountryIsUsa] = useState(false);
  const [selectedUsaState, setSelectedUsaState] = useState(false);
  const [cityToView, setCityToView] = useState([]);



  const handleSubmitButton = () => {
    const str_date = dateFormatAmPm(date);
    console.log("User Dob: ", str_date, userDob);
    // return;
    if (!userDob) {
      alert('Please add date of birth');
      return;
    }
    if (!userGender) {
      alert('Please add gender');
      return;
    }
    if (!userAddress) {
      alert("Please add address")
      return;
    }
    if (!userCity) {
      alert("Please add city")
      return;
    }
    if (!userZip) {
      alert("Please add zip code")
      return;
    }
    if (!userState) {
      alert("Please add state")
      return;
    }
    if (!userCountry) {
      alert("Please add country")
      return;
    }

    setLoadingEffect(true);
    
    var dataToSend = {
      "profile.dob": str_date,
      "profile.gender": userGender,
      "profile.address": userAddress,
      "profile.city": userCity,
      "profile.zip_code": userZip,
      "profile.state": userState,
      "profile.country": userCountry,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log(formBody);
    // return;
    fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${userId}/`, {
      method: 'PATCH',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Token ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Response: ", responseJson);
        setLoadingEffect(false);
        navigation.replace('Interests');
      })
      .catch((error) => {
        console.error(error);
      });
    
  };

  const countryStateSelection = (selectedCountry) => {
    if (selectedCountry == "United States") {
      console.log("United States selected.");
      setSelectedCountryIsUsa(true);
    } else {
      console.log("Not United States selected.");
      setSelectedCountryIsUsa(false);
      setSelectedUsaState(false);
    }
  }

  const stateCitySelection = (selectedState) => {
    setCityToView(statesCity[selectedState]);
    setSelectedUsaState(true);
    console.log("State selected: ", selectedState);
  }

  const citySelection = (selectedCity) => {
    console.log("City selected: ", selectedCity);
  }

  useEffect(() => {

    const storage = async()=>{
      let user_token = await AsyncStorage.getItem("user_token_vg");
      let user_id = await AsyncStorage.getItem("user_id_vg");
      console.log("User token: ", user_token)
      setUserToken(user_token);
      console.log("User id: ", user_id)
      setUserId(user_id);
      fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${user_id}/`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Token ${user_token}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Response user details: ", responseJson);
          setUserDob(responseJson.profile.dob);
          setUserGender(responseJson.profile.gender);
          setUserAddress(responseJson.profile.address)
          setUserCity(responseJson.profile.city);
          setUserZip(responseJson.profile.zip_code);
          setUserState(responseJson.profile.state);
          setUserCountry(responseJson.profile.country);
          if (responseJson.profile.country == "United States") {
            setSelectedCountryIsUsa(true);
            stateCitySelection(responseJson.profile.state);
          }
          })
        .catch((error) => {
          console.error(error);
        });
        setLoadingEffect(false);
    }
    storage()

  }, [])


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>

        {LoadingEffect && <View style={styles.Loading_effect}>
          <ImageBackground source={require("../assets/images/loading.gif")} style={styles.Loading_effect_image} />
        </View>}

        <TouchableOpacity onPress={() => 
        // navigation.goBack()
        navigation.navigate('CreateProfile_2')
        } >
          <ImageBackground source={require ('../assets/images/left_arrow.png')} style={styles.back_icon} />
        </TouchableOpacity>

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Let’s Create your Profile 3
          </Text>

          <View style={styles.View_4}>

            <DatePicker modal open={open} date={date} mode="date"
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setUserDob(dateFormatAmPm(date))
                console.log("date: ", date, "user dob: ", userDob)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />

            <TouchableOpacity title="Open" onPress={() => setOpen(true)} style={styles.t_o_a_d}>
              <Text style={styles.t_o_a_d_text}>{userDob}</Text>
            </TouchableOpacity>

            {/* <TextInput style={styles.TextInput_1} placeholder="Date Of Birth" value={userDob} onChangeText={(userDob) => {setOpen(true)}} /> */}
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/calender_icon.png')} style={styles.input_calender_icon} />
            </View>
          </View>

          <View style={styles.View_4}>
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setUserGender(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={styles.a_r_s_dropdown}
              buttonTextStyle={styles.a_r_s_dropdown_text}
              defaultButtonText={userGender}
            />
            {/* <TextInput style={styles.TextInput_1} placeholder="Gender" value={userGender}  onChangeText={(UserGender) => setUserGender(UserGender)} /> */}
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/login_user_icon.png')} style={styles.input_user_icon} />
            </View>
            <View style={styles.input_dropdown_gender_view}>
              <ImageBackground source={require ('../assets/images/down_arrow.png')} style={styles.input_gender_dropdown_icon} />
            </View>
          </View>

          <View style={styles.View_6}>
            <Text style={styles.Text_91}>
              Home Location
            </Text>
            <ImageBackground source={require ('../assets/images/home.png')} style={styles.home_location_icon} />
          </View>

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Address" value={userAddress} onChangeText={(UserAddress) => setUserAddress(UserAddress)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          {!selectedUsaState && <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="City" value={userCity} onChangeText={(UserCity) => setUserCity(UserCity)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>}

          {selectedUsaState && <View style={styles.View_4}>
            <SelectDropdown 
              data={cityToView}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setUserCity(selectedItem)
                citySelection(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={styles.a_r_s_dropdown}
              buttonTextStyle={styles.a_r_s_dropdown_text_country}
              defaultButtonText={userCity || "Select City"}
            />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
            <View style={styles.input_dropdown_gender_view}>
              <ImageBackground source={require ('../assets/images/down_arrow.png')} style={styles.input_gender_dropdown_icon} />
            </View>
          </View>}

          <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="Zipcode" value={userZip} onChangeText={(UserZip) => setUserZip(UserZip)} keyboardType={'numeric'} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>

          {!selectedCountryIsUsa && <View style={styles.View_4}>
            <TextInput style={styles.TextInput_1} placeholder="State" value={userState} onChangeText={(UserState) => setUserState(UserState)} />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
          </View>}

          {selectedCountryIsUsa && <View style={styles.View_4}>
            <SelectDropdown 
              data={usaStates}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setUserState(selectedItem)
                stateCitySelection(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={styles.a_r_s_dropdown}
              buttonTextStyle={styles.a_r_s_dropdown_text_country}
              defaultButtonText={userState || "Select State"}
            />
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
            <View style={styles.input_dropdown_gender_view}>
              <ImageBackground source={require ('../assets/images/down_arrow.png')} style={styles.input_gender_dropdown_icon} />
            </View>
          </View>}

          <View style={styles.View_4_dropdown}>
            <SelectDropdown 
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setUserCountry(selectedItem)
                countryStateSelection(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={styles.a_r_s_dropdown}
              buttonTextStyle={styles.a_r_s_dropdown_text_country}
              defaultButtonText={userCountry}
            />
            {/* <TextInput style={styles.TextInput_1} placeholder="Country" value={userCountry} onChangeText={(UserCountry) => setUserCountry(UserCountry)} /> */}
            <View style={styles.input_icon_view}>
              <ImageBackground source={require ('../assets/images/location_small_icon.png')} style={styles.input_location_icon} />
            </View>
            <View style={styles.input_dropdown_gender_view}>
              <ImageBackground source={require ('../assets/images/down_arrow.png')} style={styles.input_gender_dropdown_icon} />
            </View>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('Interests')}
            >
              <Text style={styles.Text_90}>
              Continue
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  t_o_a_d_text: {
    color: "black",
    fontSize: 13,
    backgroundColor: "white",
  },
  t_o_a_d: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 15,
    paddingLeft: 60,
  },
  a_r_s_dropdown: {
    color: "rgba(15, 4, 22, 0.5)",
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    // borderColor: "rgba(15, 31, 72, 0.1)",
    // borderWidth: 1,
    paddingTop: 0,
    paddingLeft: 18.50,
  },
  a_r_s_dropdown_text: {
    // color: "rgba(15, 4, 22, 0.5)",
    fontSize: 14,
    // marginLeft: -170,
    textAlign: "left",
    paddingLeft: 45,
  },
  a_r_s_dropdown_text_country: {
    // color: "rgba(15, 4, 22, 0.5)",
    fontSize: 14,
    // marginLeft: -130,
    textAlign: "left",
    paddingLeft: 45,
    fontStyle: "normal",
    fontWeight: "400",
  },
  Loading_effect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, .9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  Loading_effect_image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 70,
    height: 70,
    marginTop: -35,
    marginLeft: -35,
  },
  ScrollView_1: { 
    backgroundColor: "rgba(255, 255, 255, 1)" 
  },
  View_3: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9faff",  
  },
  back_icon:{
    width: 8,
    height: 14.22,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 36,
  },
  View_2: {
    fontFamily: "Museo Slab",
  },
  Text_87: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 23,
    lineHeight: 24,
    color: "#4F5454",
    alignContent: "center",
    textAlign: "center",
    opacity: .9,
    marginBottom: 48,
  },
  View_4: {
    width: "90%",
    height: 55,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  View_4_dropdown: {
    width: "90%",
    height: 55,
    // alignContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  TextInput_1: {
    width: "100%",
    height: 55,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 60,
  },
  input_icon_view: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 13,
    left: 10,
  },
  input_dropdown_gender_view: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 13,
    right: 10,
  },
  input_gender_dropdown_icon: {
    width: 9,
    height: 6,
    position: "relative",
    top: 9,
    left: 5,
  },
  input_calender_icon: {
    width: 16,
    height: 18,
    position: "relative",
    top: 5,
    left: 5,
  },
  input_user_icon: {
    width: 14.6,
    height: 18.3,
    position: "relative",
    top:4,
    left: 6,
  },
  input_location_icon: {
    width: 12,
    height: 18,
    position: "relative",
    top:4,
    left: 6,
  },
  profile_icon_upload_picture: {
    width: 108,
    height: 135,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -67,
    marginLeft: -54,
    opacity: .7,
  },
  View_5: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Text_88: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    color: "#4F5454",
    marginBottom: 10,
  },
  Text_89: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 12,
    color: "rgba(79, 84, 84, 0.7)",
    marginBottom: 144,
  },
  View_6: {
    width: "90%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  Text_91: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 30,
    color: "#4F5454",
    opacity: .9,
  },
  home_location_icon: {
    width: 19,
    height: 19,
    marginTop: 2,
    marginLeft: 10,
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 42,
    marginBottom: 20,
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
})


export default Blank