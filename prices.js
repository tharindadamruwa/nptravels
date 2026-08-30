// Site data — content matches the original NP Travels source exactly.
var WHATSAPP_NUMBER = '94771234567';
var WHATSAPP_DISPLAY = '+94 77 123 4567';

var vehicles = [
  {
    id: 'compact-car',
    name: 'Compact Car',
    detail: 'Smart, easy everyday comfort',
    seats: 4,
    pricePerDay: 6500,
    image: 'images/nptravels-compact-car-1.jpg',
    accentFrom: '#d5ad45',
    accentTo: '#806928',
    idealFor: 'Couples, small families, and relaxed town-to-town trips.',
  },
  {
    id: 'comfort-car',
    name: 'Comfort Car',
    detail: 'Clean, cool, and comfortable',
    seats: 4,
    pricePerDay: 10500,
    image: 'images/nptravels-compact-car-2.jpg',
    accentFrom: '#2c6258',
    accentTo: '#173832',
    idealFor: 'Airport transfers, families, and longer coastal drives.',
  },
  {
    id: 'tourist-coach',
    name: 'Tourist Coach',
    detail: 'Air-conditioned group travel',
    seats: 29,
    pricePerDay: 16500,
    image: 'images/nptravels-tourist-coach-1.jpg',
    accentFrom: '#bd7658',
    accentTo: '#793f30',
    idealFor: 'School groups, family gatherings, and shared excursions.',
  },
  {
    id: 'private-coach',
    name: 'Private Coach',
    detail: 'Spacious travel for bigger groups',
    seats: 33,
    pricePerDay: 20500,
    image: 'images/nptravels-tourist-coach-2.jpg',
    accentFrom: '#477866',
    accentTo: '#203d37',
    idealFor: 'Large group tours, ceremonies, and island-wide routes.',
  },
];

var attractions = [
  {
    id: 'kalutara-bodhiya',
    name: 'Kalutara Bodhiya',
    category: 'Culture',
    distance: 'In the heart of Kalutara',
    description: 'A revered sacred site beside the Kalu Ganga and one of the city\u2019s most recognisable landmarks.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Kalautara_Bodhiya_1.jpg',
    tag: 'Sacred place',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kalutara+Bodhiya%2C+Kalutara%2C+Sri+Lanka',
  },
  {
    id: 'richmond-castle',
    name: 'Richmond Castle',
    category: 'Culture',
    distance: '15 min from Kalutara',
    description: 'A grand early-20th-century mansion in Palatota, known for its architecture, gardens, and riverside setting.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Richmond_Castle_Kalutara_II.jpg',
    tag: 'Local history',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Richmond+Castle%2C+Kalutara%2C+Sri+Lanka',
  },
  {
    id: 'brief-garden',
    name: 'Brief Garden',
    category: 'Culture',
    distance: '25 min from Kalutara',
    description: 'A five-acre tropical garden in Beruwala shaped by artist and landscape designer Bevis Bawa.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Frontyard_.jpg',
    tag: 'Quiet wonder',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Brief+Garden+by+Bevis+Bawa%2C+Beruwala%2C+Sri+Lanka',
  },
  {
    id: 'thudugala-ella',
    name: 'Thudugala Ella',
    category: 'Water',
    distance: '35 min from Kalutara',
    description: 'A two-tier waterfall in Thudugala village with a natural pool and a short forest walk.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Another_view_of_the_waterfall.JPG?width=1200',
    tag: 'Forest swim',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Thudugala+Ella+Waterfall%2C+Dodangoda%2C+Sri+Lanka',
  },
  {
    id: 'kalu-ganga',
    name: 'Kalu Ganga',
    category: 'Wild',
    distance: 'Runs through Kalutara',
    description: 'The Black River meets the sea at Kalutara, with calm water, mangroves, and local river life to discover.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_Kalutara_City,_Sri_Lanka.jpg?width=1200',
    tag: 'On the water',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kalu+Ganga%2C+Kalutara%2C+Sri+Lanka',
  },
  {
    id: 'calido-beach',
    name: 'Calido Beach',
    category: 'Water',
    distance: '10 min from Kalutara',
    description: 'A slim strip of sand between the Kalu Ganga estuary and the Indian Ocean, made for walks and sunsets.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kalutara_Beach_2_-_Sri_Lanka_2023-11-11.jpg?width=1200',
    tag: 'Coastal day',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calido+Beach%2C+Kalutara%2C+Sri+Lanka',
  },
];

var paymentDetails = {
  bankName: 'Commercial Bank \u2014 Kalutara branch',
  accountName: 'NP Travels (placeholder)',
  accountNumber: '0000 0000 0000',
  branchCode: '7056 (placeholder)',
};

var pricing = {
  guideFee: 8500,
  airportPickupFee: 6500,
  includedTravelers: 2,
  extraTravelerFeePerDay: 1500,
};

function formatLkr(amount) {
  return 'LKR ' + new Intl.NumberFormat('en-LK').format(Math.round(amount));
}

function whatsappLink(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}
