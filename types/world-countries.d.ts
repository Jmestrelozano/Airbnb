declare module "world-countries" {
  interface Country {
    cca2: string;
    flag: string;
    latlng: number[];
    region: string;
    name: {
      common: string;
    };
  }

  const countries: Country[];
  export default countries;
}
