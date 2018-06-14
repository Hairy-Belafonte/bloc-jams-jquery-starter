{
  $('button#play-pause').on('click', function() {
    player.playPause();
    $(this).attr('playState', player.playState);
  });

  $('button#next').on('click', function() {
    if (player.playState !== 'playing') {return; }

    const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= album.songs.length) { return; }

    const nextSong = album.songs[nextSongIndex];
    player.playPause(nextSong);
  });



  $('button#previous').on('click', function() {
    if (player.playState !== 'playing') {return; }
    if(player.getTime() > 2){
      player.skipTo(0);
    } else {
      const currentSongIndex = album.songs.indexOf(player.currentlyPlaying);
      const previousSongIndex = currentSongIndex - 1;

      const previousSong = album.songs[previousSongIndex < 0
                                        ? album.songs.length-1 : previousSongIndex];
      player.playPause(previousSong);
    }

  });
  $('#time-control input').on('input', function (event) {
    player.skipTo(event.target.value);
  });

  setinterval( () => {
    if (player.playState !== 'playing') { return; }
    const currentTime = player.getTime();
    const duration = player.getDuration();
    const percent = (currentTime / duration) *  100;
    $('#time-control .current-time').text( currentTime );
    $('#time-control input').val(percent);
  }, 1000);
}
