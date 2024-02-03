export type GeolocationResponse = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: Region;
  Country: Region;
  AdministrativeArea: AdministrativeArea;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  SupplementalAdminAreas: any[];
  DataSets: string[];
}

type GeoPosition = {
  Latitude: number;
  Longitude: number;
  Elevation: Elevation;
}

type Elevation = {
  Metric: Metric;
  Imperial: Metric;
}

type Metric = {
  Value: number;
  Unit: string;
  UnitType: number;
}

type TimeZone = {
  Code: string;
  Name: string;
  GmtOffset: number;
  IsDaylightSaving: boolean;
  NextOffsetChange: string;
}

type AdministrativeArea = {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
  Level: number;
  LocalizedType: string;
  EnglishType: string;
  CountryID: string;
}

type Region = {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}
