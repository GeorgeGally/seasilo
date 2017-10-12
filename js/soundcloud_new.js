

var soundCloud = function(_fft_size) {

  // setup the player
  var body = document.querySelector('body');
  var client_id = "a02d202ac1397c777070cd10fbe015c5"; // to get an ID go to http://developers.soundcloud.com/

  // exposes audioChannelVolume
  var audioChannelVolume = [];

  var mix = [];
  var volume = [];
  var audioContext;
  this.analyser;
  this.source;
  this.volumeLow = 0;
  this.volumeHi = 0;
  this.streamData;
  this.sound = {};
  this.peak_volume = 0;
  // this.fft_size = fft_size || 256;
  var FFT_SIZE = _fft_size || 256;
  var SAMPLE_RATE;
  var self = this;
  var player;

  loadScript('http://connect.soundcloud.com/sdk.js', init)

  // var genres = ["slomo", "deeptechno", "ebm", "disco", "deepdisco", "indiedisco", "slomodisco", "slomohouse", "downtempotechno", "downtempo", "deepness", "pixies", "lowmotion", "plastikman", "minimalhouse", "acidhouse", "cosmic", "cosmicdisco", "ambient", "vapourwave"];
  var genres = ["ambient"];
  var blacklist = ["trap", "drum n bass", , "drum and bass"];
  // SETUP AUDICONTEXT INSTANCE
  function init(){
    player = createAudioElement('player', self.fft_size);
  }

  function createAudioElement(audio_name){

    var audioElement = document.createElement('audio');
    audioElement.setAttribute("id", audio_name);
    body.appendChild(audioElement);
    audioElement.width = window.innerWidth;
    audioElement.height = window.innerHeight;

    setupPlayer(audioElement);
    createPlayerUI(audioElement);
    return audioElement;

  }

  function setupPlayer(audioElement){

    var audioContextCheck = window.AudioContext || window.webkitAudioContext;

    if (!audioContextCheck) {
      alert("Audio context error");
    } else {
      var song_type = getGenre();
      audioContext = new (window.AudioContext || window.webkitAudioContext);
      analyser = audioContext.createAnalyser();
      SAMPLE_RATE = audioContext.sampleRate;
      //console.log("FFT Size:" + FFT_SIZE);
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = 0.3;
      source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      streamData = new Uint8Array(analyser.frequencyBinCount);
      audioLooper();

    }

  }

  function audioLooper(){
    window.requestAnimationFrame(audioLooper);
    analyser.getByteFrequencyData(streamData);
    //console.log(streamData.length);
    self.spectrum = streamData.slice(0,streamData.length/2);
    self.vol = self.getVolume();
    if (self.vol > self.peak_volume) self.peak_volume = self.vol;
  }

  function playStream(streamUrl) {
      // Get the input stream from the audio element
      player.addEventListener('ended', function(){
            console.log('end track.')
      });
      player.crossOrigin = 'anonymous';
      player.setAttribute('src', streamUrl);
      player.play();
  }

  // update the track and artist into in the controlPanel
  function populateUI() {

      var artistLink = document.createElement('a');
      artistLink.setAttribute('href', this.sound.user.permalink_url);
      artistLink.innerHTML = this.sound.user.username.trunc(60);
        var trackLink = document.createElement('a');
      trackLink.setAttribute('href', this.sound.permalink_url);

      if(this.sound.kind=="playlist"){
          trackLink.innerHTML = "<p>" + this.sound.tracks[loader.streamPlaylistIndex].title.trunc(60) + "</p>" + "<p>"+loader.sound.title+"</p>";
      } else {
        trackLink.innerHTML = this.sound.title.trunc(60);
      }

      //console.log(this.sound);
      // if no track artwork, use user's avatar.
      var image = this.sound.artwork_url ? this.sound.artwork_url :this.sound.user.avatar_url;
        this.trackImage.setAttribute('src', image);
        this.trackImageLink.setAttribute('href', this.sound.permalink_url);
        this.artistInfo.innerHTML = '';
        this.artistInfo.appendChild(artistLink);

        this.trackInfo.innerHTML = '';
        this.trackInfo.appendChild(trackLink);

        // add a hash to the URL so it can be shared or saved
        var trackToken = this.sound.permalink_url.substr(22);

    };

  function loadAndUpdate(genre) {
      loadStream(genre,
        function() {
          playStream(self.streamUrl());
          populateUI();
        }, function(){});
  };

  function loadStream(genre, successCallback, errorCallback) {

      if (SC != undefined) {

        SC.initialize({ client_id: client_id });

        // load a specific track
        if (genre.charAt(0) == "!") {

            song_type = genre.substring(1);
            var call = { track: genre }
            console.log("track: " + genre);

            SC.get('/tracks/', {genres: genre} , function(tracks) {

            console.log("tracks: " + tracks);

            if (tracks.errors) {

              this.errorMessage = "";

              for (var i = 0; i < tracks.errors.length; i++) {
                  this.errorMessage += tracks.errors[i].error_message + '<br>';
              }

              this.errorMessage += 'Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';
                errorCallback();

            } else {

              sound = tracks;
              this.sound = sound;
              this.streamUrl = function(){ return sound.stream_url + '?client_id=' + this.client_id; };
              successCallback();

            }

          }); // END GENRE CALL

        // load tags
        } else {
          genre = "ambient";
          console.log("Genre: " + genre);
          var call = {genres: genre }

          // get tracks from soundcloud
          SC.get('/tracks', { genres: genre, tag_list: 'downdempo, chill, chillout, Chill Out, piano, slomo, deep, yoga, spa, relaxing, sleep, massage, meditation, classical, mellow, Thievery Corporation, Tycho', limit: 100 }, function(tracks) {

            if (tracks.errors) {
                self.errorMessage = "";
                for (var i = 0; i < tracks.errors.length; i++) {
                    self.errorMessage += tracks.errors[i].error_message + '<br>';
                }
                self.errorMessage += 'Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';
                errorCallback();

            } else {
                console.log(tracks);
                for (var i = tracks.length -1; i >= 0; i--) {
                  console.log(tracks[i].tag_list);
                  if(tracks[i].tag_list == ""
                  || tracks[i].id == "265802323"
                  || tracks[i].id == "146762488"
                  || tracks[i].id == "105496381"
                  || tracks[i].id == "322905389"
                  || tracks[i].id == "175480754"
                  || tracks[i].id == "248342489"
                  || tracks[i].tag_list.includes("pump")
                  || tracks[i].tag_list.includes("trap")
                  || tracks[i].tag_list.includes("Trivisio")
                  || tracks[i].tag_list.includes("House")
                  || tracks[i].tag_list.includes("house")
                  || tracks[i].tag_list.includes("rnb")
                  || tracks[i].tag_list.includes("hop")
                  || tracks[i].tag_list.includes("Hop")
                  || tracks[i].tag_list.includes("MsftsrepMusic")
                  || tracks[i].tag_list.includes("swagger")
                  || tracks[i].tag_list.includes("Drum")
                  || tracks[i].tag_list.includes("hiphop"))
                  {
                    tracks.splice(i, 1);
                  }
                }
                randomTrack = Math.floor(Math.random()*(tracks.length-1));
                console.log("Play track: " + randomTrack + "/"+ tracks.length);
                sound = tracks[randomTrack];
                console.log(sound.tag_list);
                console.log(sound.id);
                self.sound = sound;
                self.streamUrl = function(){ return sound.stream_url + '?client_id=' + client_id; };
                successCallback();
            }

          }); // end track get

        }

      }

    };

  function createPlayerUI(audioElement) {

      // var audioplayer = document.createElement('div');
      // audioplayer.setAttribute("id", "audioplayer");
      // audioplayer.setAttribute("class", "wrapper");
      var audioplayer = document.getElementById('audioplayer');
      var container = document.getElementById('audiocontainer');

      var trackImageLink = document.createElement('a');
      trackImageLink.setAttribute("id", "trackImageLink");
      container.appendChild(trackImageLink);

      var trackImage = document.createElement('img');
      trackImage.setAttribute("id", "trackImage");
      trackImageLink.appendChild(trackImage);

      var playButton = document.createElement('div');
      playButton.setAttribute("id", "playButton");
      playButton.setAttribute("class", "pause");
      container.appendChild(playButton);

      var timeline = document.createElement('div');
      timeline.setAttribute("id", "timeline");
      container.appendChild(timeline);

      var trackInfo = document.createElement('span');
      trackInfo.setAttribute("id", "trackInfo");
      container.appendChild(trackInfo);

      var artistInfo = document.createElement('span');
      artistInfo.setAttribute("id", "artistInfo");
      container.appendChild(artistInfo);

      // var container = document.createElement('div');
      // container.setAttribute("id", "audiocontainer");
      // audioplayer.apendChild(container);




      var playhead = document.createElement('div');
      playhead.setAttribute("id", "playhead");
      timeline.appendChild(playhead);

      var playtime = document.createElement('span');
      playtime.setAttribute("id", "playtime");
      timeline.appendChild(playtime);

      var soundcloudLogo = document.createElement('img');
      soundcloudLogo.setAttribute("id", "soundcloudLogo");
      soundcloudLogo.setAttribute("src", "http://developers.soundcloud.com/assets/logo_black.png");
      timeline.appendChild(soundcloudLogo);

      //body.appendChild(audioplayer);

      playButton.addEventListener("click", playStop);
      timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

      // Gets audio file duration
      audioElement.addEventListener("canplaythrough",
        function () {
        duration = audioElement.duration;
        audioElement.addEventListener("timeupdate", timeUpdate, false);
      }, false);

      //Makes timeline clickable
      timeline.addEventListener("click", function (event) {
        moveplayhead(event);
        player.currentTime = audioElement.duration * clickPercent(event);
      }, false);

      function playStop() {

        if (audioElement.paused) {
          console.log("play");
          audioElement.play();
          playButton.className = "";
          playButton.className = "pause";
        } else {
          console.log("pause");
          audioElement.pause();
          playButton.className = "";
          playButton.className = "play";
        }

      }

      function timeUpdate() {
        var playPercent = 100 * (player.currentTime / audioElement.duration);
        playhead.style.marginLeft = playPercent + "%";
        playtime.innerHTML = convertTime(Math.floor(player.currentTime)) + "/" + convertTime(Math.floor(audioElement.duration));
      }

      // PLAYER UTILITIES
      function clickPercent(e) {
        return (e.pageX - this.timeline.offsetLeft) / timelineWidth;
      }

      function moveplayhead(e) {
          var newMargLeft = e.pageX - this.timeline.offsetLeft;
          if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
              playhead.style.marginLeft = newMargLeft + "px";
          }
          if (newMargLeft < 0) {
              playhead.style.marginLeft = "0px";
          }
          if (newMargLeft > timelineWidth) {
              playhead.style.marginLeft = timelineWidth + "px";
          }
      }

      function convertTime(totalSec){
        var hours = parseInt( totalSec / 3600 ) % 24;
        var minutes = parseInt( totalSec / 60 ) % 60;
        var seconds = totalSec % 60;
        return (hours > 0 ? (hours < 10 ? "0" + hours : hours)+ ":" : "") + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
      }

      return this;

  } // createPlayerUI



  // SOUND UTILITIES

  this.mapSound = function(_me, _total, _min, _max){

    if (self.spectrum.length > 0) {
      return this.mapSpectrum(self.spectrum, _me, _total, _min, _max)
    } else {
      return 0;
    }

  }
  this.getVolume = function () {
    return this.getRMS(self.spectrum);
  }

  this.getVol = function(_min, _max){

    var min_max = _min || 100;
    var min = _min || 0;

    var max = _max || min_max;
    //return this.getRMS(self.spectrum);
    // map total volume to 100 for convenience
    self.volume = map(self.vol, 0, self.peak_volume, min, max);
    return self.volume || 0;;
  }

  //this.getVolume = function() { return this.getVol();}

  this.getRMS = function (freq) {
        var rms = 0;
        for (var i = 0; i < freq.length; i++) {
          rms += freq[i] * freq[i];
        }
        rms /= freq.length;
        rms = Math.sqrt(rms);
        return rms || 0;
  }

  //freq = n * SAMPLE_RATE / MY_FFT_SIZE
  function mapFreq(i){
    // var freq = i * SAMPLE_RATE / FFT_SIZE;
    var freq = i * SAMPLE_RATE / self.spectrum.length;
    return freq;
  }

    // getMix function. Computes the current frequency with
    // computeFreqFromFFT, then returns bass, mids and his
    // sub bass : 0 > 100hz
    // mid bass : 80 > 500hz
    // mid range: 400 > 2000hz
    // upper mid: 1000 > 6000hz
    // high freq: 4000 > 12000hz
    // Very high freq: 10000 > 20000hz and above

    this.getMix = function(){
      var highs = [];
      var mids = [];
      var bass = [];
      var bass = [];
      for (var i = 0; i < self.spectrum.length; i++) {
        var band = mapFreq(i);
        var v = map(self.spectrum[i], 0, self.peak_volume, 0, 100);
        if (band < 500) {
          bass.push(v);
        }
        if (band > 400 && band < 6000) {
            mids.push(v);
        }
        if (band > 4000) {
            highs.push(v);
        }
      }
      return {bass: bass, mids: mids, highs: highs}
    }


    this.getBass = function(){
            return this.getMix().bass;
      }

    this.getMids = function(){
          return this.getMix().mids;
    }

    this.getHighs = function(){
          return this.getMix().highs;
    }

    this.getHighsVol = function(_min, _max){
      var min = _min || 0;
      var max = _max || 100;
      var v = map(this.getRMS(this.getMix().highs), 0, self.peak_volume, min, max);
      return v || 0;
    }

    this.getMidsVol = function(_min, _max){
      var min = _min || 0;
      var max = _max || 100;
      var v = map(this.getRMS(this.getMix().mids), 0, self.peak_volume, min, max);
      return v || 0;
    }

    this.getBassVol = function(_min, _max){
      var min = _min || 0;
      var max = _max || 100;
      var v = map(this.getRMS(this.getMix().bass), 0, self.peak_volume, min, max);
      return v || 0;
    }

  this.mapSpectrum = function(_freqs, _me, _total, _min, _max){
    var min = _min || 0;
      var max = _max || 100;
      //actual new freq
      var new_freq = Math.round(_me /_total * _freqs.length);

      //console.log(Math.round(self.peak_volume) + " : " + Math.round(self.spectrum[new_freq]));
      // map the volumes to a useful number
      var s = map(_freqs[new_freq], 0, self.peak_volume, min, max);
      //console.log(s);
      return s || 0;
  }

  // On load, check to see if there is a track name/genre in the URL

  function getGenre(){

        if (window.location.hash) {
          var genre = window.location.hash.substr(1);
          loadAndUpdate(genre);
        } else {
          var genre = genres[randomInt(genres.length-1)];
          location.hash = "#" + genre;
          loadAndUpdate(genre);
        }

      }

  return this;

} // END SOUNDCLOUD


// loadscript utility

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var Sound = new soundCloud();
console.log(Sound);
