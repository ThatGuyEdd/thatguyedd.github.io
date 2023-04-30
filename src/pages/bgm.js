import '../styles/App.css';
import React, { useState } from "react";
import { BiShuffle } from "react-icons/bi";
import soundcloud from "../api/soundcloud";

export const BGM = React.memo(() => {    
    const playlist = ["263367934","300494469","483718232","545610837","783832791",
                      "655383102","305665701","799182711","1234281943","356635769"];
    let randPlaylist = playlist[Math.floor(Math.random() * playlist.length)];
    
    const trackParams = 
        "&color=%23000000&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true";
    
    const[shuffle, setShuffle] = useState(randPlaylist);
    
    const shufflePlaylist = () => {
        vol = document.getElementById("volume");
        soundcloud().setVolume(vol.value);
        setShuffle(playlist[Math.floor(Math.random() * playlist.length)]);
        randPlaylist = shuffle;
    };

    let vol;
    let volume;
    setTimeout
    (
        function() {
            vol = document.getElementById("volume");
            let update = () => { 
                volume = vol.value;
                soundcloud().setVolume(volume);
            }
            vol.addEventListener('input', update);
            if(vol) {
                update();
            }
        }
    ,1000);
    return (
        <>
        <div className="menuWrapper">
            <button className="shuffleButton" onClick={ shufflePlaylist }>
                <BiShuffle className="shuffleIcon"/>
            </button>
            <input className="volSlider" id="volume" type="range" min="0" max="100" step="1"></input>
        </div>
        <div className="music">
            <iframe id="bgm" title="bgmiframe"
                allow="autoplay" 
                src={
                    `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${randPlaylist}${trackParams}`
                }
                />
        </div>
        </>
    );
  });