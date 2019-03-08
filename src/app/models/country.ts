import { CountryCode } from 'libphonenumber-js';

export interface Country {
  name: string;
  alpha2Code: CountryCode;
  callingCodes: string[];
}
