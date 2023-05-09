import '../styles/App.css';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import YouTube from 'react-youtube';

import { FaVolumeUp, FaVolumeMute, FaYoutube } from 'react-icons/fa';

let vidMute;
let player;

const MuteButton = () => {
    const[isMute, setIsMute] = useState(true);
    vidMute = isMute;

    const toggleMute = () => {
        if (player)
        {
            if (isMute) {
                setIsMute(false);
                player.unMute();
            } else {
                setIsMute(true);
                player.mute();
            } 
        }
    }

    return (
        <button className={ "muteButton" } onClick={ toggleMute }>
        {
            isMute ?
            <FaVolumeMute className={ "muteIcon" }/> :
            <FaVolumeUp className={ "muteIcon" }/>
        }
        </button>
    );
};

export const YouTubeEmbed = ({ videoList }) => {  
    let currVideo = videoList[Math.floor(Math.random() * videoList.length)];
    
    let opts = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            mute: isMobile ? 1 : vidMute,
        }
    }

    const onPlayerReady = (event) => {  
        player = event.target;
        player.getIframe().autoplay = "allow";
        player.setVolume(10);
        player.playVideo();
        currVideo = player.getVideoUrl();
    }
  
    const onEnd = (event) => {
        currVideo = videoList[Math.floor(Math.random() * videoList.length)];
        player = event.target;
        player.loadVideoById(currVideo);
        currVideo = player.getVideoUrl();
    }

    const videoDebug = () => {
        if (player) {
            player.playVideo();
        }
    }
  
    return (
        <>
        <MuteButton/>
        <div className={ "embedWrapper" }>
            <div className={ "videoWrapper" }>
                <div className={ "videoResponsive" }>        
                <YouTube id="player"
                videoId={ currVideo } 
                opts={ opts } 
                onReady={ onPlayerReady }
                onEnd={ onEnd }
                />
                </div>
            </div>
        </div>
        <div>
            <a className={ "vidLink" } 
             href={ 'https://www.youtube.com/watch?v=' + currVideo }
             target="_blank" rel="noopener noreferrer">
            <button className={ "vidLinkButton" }>
                <FaYoutube className={ "vidLinkIcon" }/>
            </button>
            </a>
        </div>
        <div style={{ display: !isMobile ? 'none' : '' }}>
            <button className={ "videoDebug" } 
             onClick={ videoDebug }>
                Video paused? Tap here.
            </button>
        </div>
        </>
    );
};
