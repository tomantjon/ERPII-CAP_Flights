using {sap.capire.flightmodel as my} from '../db/schema';

service FlightService @(path: '/flightSet') {
  entity Flights as projection on my.Flights;
}

service GameService @(path: '/gameSet') {
  entity Games   as projection on my.Games;
}
