export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/admin/dashboard",
    Title: "Welcome User 👋",
    description: "Track activity, trends, & popular destinations in real time",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/admin/all-users",
    Title: "Manage Users",
    description: "Manage and oversee all user accounts seamlessly.",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/admin/trips",
    Title: "Add New Trips",
    description: "View and generate Al travel plans",
  },
];

export const metricsData = [
  {
    title: "Total Users",
    last: 8400,
    current: 12450,
    data: [
      { value: 100 },
      { value: 200 },
      { value: 150 },
      { value: 250 },
      { value: 300 },
      { value: 280 },
    ],
  },
  {
    title: "Total Trips",
    last: 3350,
    current: 3210,
    data: [
      { value: 100 },
      { value: 200 },
      { value: 150 },
      { value: 250 },
      { value: 300 },
      { value: 280 },
    ],
  },
  {
    title: "Active Users Today",
    last: 450,
    current: 520,
    data: [
      { value: 100 },
      { value: 200 },
      { value: 150 },
      { value: 250 },
      { value: 300 },
      { value: 280 },
    ],
  },
];

export const allTrips = [
  {
    id: 1,
    name: "Tropical Rewind",
    imageUrls: ["/assets/images/sample1.jpg"],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000",
  },
  {
    id: 2,
    name: "French Reverie",
    imageUrls: ["/assets/images/sample2.jpg"],
    itinerary: [{ location: "Paris" }],
    tags: ["Relaxation", "Culinary"],
    travelStyle: "Family",
    estimatedPrice: "$2,000",
  },
  {
    id: 3,
    name: "Zen Break",
    imageUrls: ["/assets/images/sample3.jpg"],
    itinerary: [{ location: "Japan" }],
    tags: ["Shopping", "Luxury"],
    travelStyle: "Couple",
    estimatedPrice: "$3,000",
  },
  {
    id: 4,
    name: "Adventure in Westeros",
    imageUrls: ["/assets/images/sample4.jpg"],
    itinerary: [{ location: "Croatia" }],
    tags: ["Historical", "Culture"],
    travelStyle: "Friends",
    estimatedPrice: "$4,000",
  },
];

export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

export const travelStyles = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature & Outdoors",
  "City Exploration",
];

export const interestOptions = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business"];

export const footers = ["Terms & Condition", "Privacy Policy"];

// export const selectItems = [
//   "groupType",
//   "travelStyle",
//   "interest",
//   "budget",
// ] as (keyof TripFormData)[];

// export const comboBoxItems = {
//   groupType: groupTypes,
//   travelStyle: travelStyles,
//   interest: interests,
//   budget: budgetOptions,
// } as Record<keyof TripFormData, string[]>;

// export const userXAxis: AxisModel = { valueType: "Category", title: "Day" };
// export const useryAxis: AxisModel = {
//   minimum: 0,
//   maximum: 10,
//   interval: 2,
//   title: "Count",
// };

// export const tripXAxis: AxisModel = {
//   valueType: "Category",
//   title: "Travel Styles",
//   majorGridLines: { width: 0 },
// };

// export const tripyAxis: AxisModel = {
//   minimum: 0,
//   maximum: 10,
//   interval: 2,
//   title: "Count",
// };

export const CONFETTI_SETTINGS = {
  particleCount: 200, // Number of confetti pieces
  spread: 60, // Spread of the confetti burst
  colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
  decay: 0.95, // Gravity decay of the confetti
};

export const LEFT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 45, // Direction of the confetti burst (90 degrees is top)
  origin: { x: 0, y: 1 }, // Center of the screen
};

export const RIGHT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 135,
  origin: { x: 1, y: 1 },
};
