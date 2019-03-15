
export function getAllLines() {
  const URL = 'https://data.metromobilite.fr/api/routers/default/index/routes'
  return fetch(URL)
      .then(res => res.json())
      .catch((error) => console.error(error))
}


export function getStopByLine(lineId) {
  const URL = 'https://data.metromobilite.fr/api/ficheHoraires/json?route=' + lineId
  return fetch(URL)
    .then(res => res.json())
    .catch((error) => console.error(error))
}

export function getScheduleByStop(stopId) {
  const URL = 'https://data.metromobilite.fr/api/routers/default/index/stops/' + stopId + '/stoptimes'
  return fetch(URL)
    .then(res => res.json())
    .catch((error) => console.error(error))
}