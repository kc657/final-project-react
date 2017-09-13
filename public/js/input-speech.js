function initPage () {
  var _mic = $('#microphone')
  var _stop = $('#stop')
  var readText = $('#readText')
  var stream = null
  _mic.addClass('mic_enabled')
  _stop.addClass('mic_disabled')

  _mic.on('click', function () {
    var _className = this.className
    if (this.className == 'mic_enabled') {
      _mic.addClass('mic_disabled')
      _mic.removeClass('mic_enabled')
      _stop.addClass('mic_enabled')
      _stop.removeClass('mic_disabled')
      $.when($.get('http://localhost:3001/api/watson/token')).done(
        function (token) {
          console.log(token);
          stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
            token: token,
            outputElement: '#speech' // CSS selector or DOM Element
          })
          stream.on('error', function (err) {
            console.log(err)
          })
        })
    }
  })

  _stop.on('click', function () {
    console.log('Stopping text-to-speech service...')
    if (stream != undefined) {
      stream.stop()
    }
    _mic.addClass('mic_enabled')
    _mic.removeClass('mic_disabled')
    _stop.addClass('mic_disabled')
    _stop.removeClass('mic_enabled')
  })
}
