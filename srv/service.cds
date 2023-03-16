using {sap.capire.flightmodel as my} from '../db/schema';

service FlightService @(path: '/flightSet') {
  entity Flights as projection on my.Flights;
}
