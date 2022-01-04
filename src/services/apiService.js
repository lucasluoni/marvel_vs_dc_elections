// apiService para regras de negócio do back end

import { get } from './httpService'

const BACK_END_URL =
  process.env.NODE_ENV === 'development' ?
    'http://localhost:3001' :
    'https://json-server-elections.herokuapp.com' 

export async function apiGetCitiesData() {
  const data = await get(`${BACK_END_URL}/cities`)
  const sortedCities = data.sort((a, b) => a.name.localeCompare(b.name));
  return sortedCities;
}

export async function apiGetCandidatesData() {
  const candidatesData = await get(`${BACK_END_URL}/candidates`)
  return candidatesData
}

export async function apiGetElectionsData() {
  const electionsData = await get(`${BACK_END_URL}/election`)
  return electionsData.sort((a, b) => b.votes - a.votes)
}

