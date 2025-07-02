declare type User = {
  user: {
    email: string;
    name: string;
    image: string;
  };
};
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
