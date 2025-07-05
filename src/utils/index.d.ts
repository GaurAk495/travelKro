declare type Country = {
  name: string;
  code: string;
  value: string;
  flag: string;
  openMap: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

declare type ItineraryData = {
  name: "string";
  description: "string";
  estimatedPrice: "string";
  duration: "number";
  budget: "string";
  travelStyle: "string";
  country: "string";
  interests: "string";
  groupType: "string";
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: {
    city: "string";
    coordinates: [number, number];
    openStreetMap: "string";
  };
  itinerary: [
    {
      day: "number";
      location: "string";
      activities: [
        {
          time: "string";
          description: "string";
        }
      ];
    }
  ];
};

declare type statsData = {
  title: string;
  current: number;
  last: number;
  grStats: Record<string, number>;
  users?: Models.User<Models.Preferences>[];
  itinearyByInterest?: Record<string, number>;
};

declare type User = {
  name: string;
  email: string;
  $id: string;
  prefs: { [key: string]: string };
};

declare type UserInfo = User | undefined;
