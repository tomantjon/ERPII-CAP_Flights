namespace sap.capire.flightmodel;

using from '@sap/cds-common-content';
using {
  Currency,
  managed
} from '@sap/cds/common';

entity Flights {
  key carrID     : String(3);
  key connID     : String(4);
  key fldate     : DateTime;
      price      : Decimal(9, 2);
      currency   : Currency;
      planetype  : String(10);
      seatsmax   : Integer;
      seatsocc   : Integer;
      paymentsum : Decimal(18, 3);
      seatsmax_b : Integer;
      seatsocc_b : Integer;
      seatsmax_f : Integer;
      seatsocc_f : Integer;
}

entity Games {
  key Id          : UUID;
      Name        : String(40);
      Developer   : String(40);
      Genre       : String(20);
      ReleaseDate : DateTime;
}
