import { City } from '../types/City';

export async function getCity(city: string) {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=5b806adc48044d549c70cbfb6d385636`
  );
  if (!response.ok) {
    throw `HTTP error! status: ${response.status}`;
  }

  if (response.status > 400) {
    throw `Server Error`;
  }
  if (response.status > 200) {
    throw `Not Authorized`;
  }
  const cityData: City = await response.json();

  if (!cityData.results.length) {
    throw `Couldn't find city: "${city}"`;
  }
  return cityData;
}
