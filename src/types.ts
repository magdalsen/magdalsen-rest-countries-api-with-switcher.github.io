export type Data = { 
  languages: { [s: string]: string; }; //jaki typ?
  subregion: string
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
    nativeName: {
      official: any;
    }
  };
  ccn3: string;
  population: number;
  region: string;
  capital: string[];
  tld: string[];
  currencies: string[];
  borders: string[];
}[]

export interface DataAll {
  languages: { [s: string]: string; };
  subregion: string;
  flags: {
    svg: HTMLImageElement;
  }
  name: { 
    common: string; 
    nativeName: {
      official: any;
    }
  };
  ccn3: string;
  population: number;
  region: string;
  capital: string[];
  tld: string[];
  currencies: string[];
  borders: string[];
}[]