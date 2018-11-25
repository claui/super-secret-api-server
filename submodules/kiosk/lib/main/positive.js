let URL = '/api/kiosk/v1/positive/phrases'

window.submitPrediction = () => {
  let inputElement = window.document.forms[0].elements.prediction
  let predictionText = inputElement.value
  console.log(`Prediction entered: ${predictionText}`)

  let payload = JSON.stringify({ text: predictionText })

  let onPhraseSubmitted = (response) => {
    console.log('Submitted successfully; response from backend:')
    console.debug(response)
  }

  console.log(`Submitting payload: ${payload}`)

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload,
  })
    .then(response => {
      let mistakeDiv = window.document.getElementById("mistake")

      if (response.ok) {
        mistakeDiv.style = 'visibility: hidden;'
        let inputElement =
          window.document.forms[0].elements.prediction
        inputElement.value = ''
      } else {
        mistakeDiv.style = 'visibility: visible;'
        throw(`Backend responded with status ${response.status}`)
      }
      return response.json()
    })
    .then(response => onPhraseSubmitted(response))
}
