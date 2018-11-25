let URL = 'http://localhost:5101/api/kiosk/v1/negative/phrases'

window.submitPrediction = () => {
  let predictionText =
    window.document.forms[0].elements.prediction.value
  console.log(`Prediction entered: ${predictionText}`)

  let payload = JSON.stringify({ text: predictionText })

  let onPhraseSubmitted = (phrase) => {
    console.log(`Phrase submitted: ${phrase}`)
  }

  console.log(`Submitting payload: ${payload}`)

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload,
  }).then(response => {
    console.debug(`Response: ${response}`)
    console.debug(`Response headers: ${response.headers}`)
    console.debug(`Response header: ${response.headers[0]}`)
    console.debug(`Response body: ${response.body}`)
    console.debug(`Response body used: ${response.bodyUsed}`)
    console.debug(`Response type: ${response.type}`)
    console.debug(`Response OK: ${response.ok}`)
    console.debug(`Response status: ${response.status}`)
    console.debug(`Response status text: ${response.statusText}`)
    return response.json()
  })
    .then(phrase => onPhraseSubmitted(phrase))
}
