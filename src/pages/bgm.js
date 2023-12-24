import '../styles/App.css';
import React, { useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { isMobile } from 'react-device-detect';
import soundcloud from '../api/soundcloud';

import { FaMusic } from 'react-icons/fa';
import { BiShuffle } from 'react-icons/bi';

export const BGM = React.memo(() => {    
    let vol;
    let volume;
    let randTrack = useRef(Math.floor(Math.random() * 50));
    const playlist = ["263367934","300494469","483718232","545610837","783832791",
                      "655383102","305665701","799182711","1234281943","356635769"];
    const trackParams = 
        '&color=%23000000' +
        '&auto_play=false' +
        '&show_comments=false' +
        '&show_user=false' +
        '&show_artwork=false' +
        '&sharing=false' +
        '&download=false' +
        '&buying=false' +
        '&visual=false' +
        '&show_teaser=false' +
        '&start_track=' + randTrack.current;

    let randPlaylist = useRef(playlist[Math.floor(Math.random() * playlist.length)]);

    const[musicOpen, setMusicOpen] = useState(false);
    const[shuffle, setShuffle] = useState(randPlaylist.current);

    const toggleMusic = () => {
        setMusicOpen(!musicOpen);
    };

    const shufflePlaylist = () => {
        vol = document.getElementById("volume");
        soundcloud().setVolume(vol.value);
        setTimeout(function() { soundcloud().setVolume(vol.value); soundcloud().play(); }, 2500);
        setShuffle(playlist[Math.floor(Math.random() * playlist.length)]);
        randPlaylist.current = shuffle;
    };

    setTimeout
    (
        function() {
            vol = document.getElementById("volume");
            let update = () => { 
                volume = vol.value;
                soundcloud().setVolume(volume);
            }
            vol.addEventListener('input', update);
            if (vol) {
                update();
            }
        }
    ,1000);
  
    return (
        <>
        <div className={ "shuffleButton" }>
            <IconButton 
                size='small'
                disableRipple
                iconStyle
                sx={{
                    background: 'white',
                    color: 'black',
                    border: 1.5,
                    borderColor: 'black'}}
                onClick={ shufflePlaylist }>
                <BiShuffle style={{ transform: 'scale(1.15)' }}/>
            </IconButton>
        </div>
        <div style={{ display: isMobile ? 'none' : '' }}>
            <input className={ "volSlider" } id="volume" type="range" min="0" max="100" step="1"></input>
        </div>
        <div className={ "musicButton" }>
        <IconButton 
          size='small'
          disableRipple
          sx={{
            background: 'white',
            color: 'black',
            border: 1.5,
            borderColor: 'black'}}
          onClick={
            function() {
            if(musicOpen) {
              toggleMusic();
              document.getElementById("musicBox").className="musicClose";
              }
              else {
              toggleMusic();
              document.getElementById("musicBox").className="music";
              }
            }
          }>
          <FaMusic style={{ transform: 'scale(0.85)' }}/>
        </IconButton>
      </div>
        <div id="musicBox" className={ "musicClose" }>
          <iframe id="bgm" title="soundcloud"
            allow="autoplay" 
            src={
                `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${randPlaylist.current}${trackParams}`
            }
          />
        </div>
      </>
    );
  });
  