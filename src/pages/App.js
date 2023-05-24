import '../styles/App.css';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import soundcloud from '../api/soundcloud';
import { YouTubeEmbed } from './video';
import { BGM } from './bgm';

import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { FaAlignJustify, FaQuestion, FaVolumeMute, 
         FaYoutube, FaTwitter } from 'react-icons/fa';
import { BiCoffeeTogo } from 'react-icons/bi';
import { BiShuffle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { IconContext } from 'react-icons';

let init = true;

function App() {
  const [city, setCity] = useState("Loading");
  const cityVideos = new Map();
  
  const aomoriVideos    = ["kaB2sXvRqgY","MKyJdahuo-U"];
  const fukuokaVideos   = ["IzvoQ8fcgNU"];
  const fukushimaVideos = ["gOkDSGzt07M","z5KoGXkECPg"];
  const hiroshimaVideos = ["NxXevpGGFBM","9UMn6CVizOw"];
  const kobeVideos      = ["mHXp_o0beOE"];
  const kyotoVideos     = ["Se15xH-IuMQ","rAeN7TdGq4o","yqf4pUWzP4Q","kd-OLM-6GRE","aaaxRIBPbXE"];
  const nagoyaVideos    = ["w0SJgbALym8","e1J6DYeJFas"];
  const naraVideos      = ["JO9RgHdg9S8"];
  const niigataVideos   = ["0lY98l3tOrM","tVCHthFQEUY","uxzdurP56U0"];
  const osakaVideos     = ["GJZLXiNOqqA","ThenfmXRbkQ","pu9BorxYjBQ","XHD2KtDXClc","ahZbCdrUVaQ"];
  const sapporoVideos   = ["aDCwZIUop6s","f6E1rTfwIWc","w46op-H-TsQ"];
  const sendaiVideos    = ["cHjKckxsOCs","Mo31lwe_gv4"];
  const tokyoVideos     = ["YWPbaHNajbs","mHO8mJSZdJ0","s-rhii6znMU","0yEJWXLg7Qk","ZCVu6MDQZdg"];
  const loading         = ["-pdVUsCqd2U"];

  cityVideos.set('Aomori'     ,   aomoriVideos);
  cityVideos.set('Fukuoka'    ,   fukuokaVideos);
  cityVideos.set('Fukushima'  ,   fukushimaVideos);
  cityVideos.set('Hiroshima'  ,   hiroshimaVideos);
  cityVideos.set('Kobe'       ,   kobeVideos);
  cityVideos.set('Kyoto'      ,   kyotoVideos);
  cityVideos.set('Nara'       ,   naraVideos);
  cityVideos.set('Nagoya'     ,   nagoyaVideos);
  cityVideos.set('Niigata'    ,   niigataVideos);
  cityVideos.set('Osaka'      ,   osakaVideos);
  cityVideos.set('Sapporo'    ,   sapporoVideos);
  cityVideos.set('Sendai'     ,   sendaiVideos);
  cityVideos.set('Tokyo'      ,   tokyoVideos);
  cityVideos.set('Loading'    ,   loading);

  setTimeout(function() { soundcloud() }, 500);

  return (
    <>
      <div className={ "siteWrapper" }>       
        <Menu setCity={ setCity }/>
        <BGM/>
        <div>
          <YouTubeEmbed videoList={ cityVideos.get(`${city}`)??[] }/>
        </div>
      </div>
    </>
  );
}

const PopupHelp = props => {
  return (
    <div id="helpWrapper" className={ "helpWrapper" }>
      <div id="help" className={ "boxHelp" }>
        <span className={ "closeHelpIcon" } onClick={function() {
            document.getElementById("help").className="boxHelpClose";
            document.getElementById("helpWrapper").className="helpWrapperClose";
            setTimeout(function() { props.handleClose(); }, 650); }}>
          <IconContext.Provider
            value={{style: { verticalAlign: 'middle', scale: '0.75' }}}>
            <GrClose/>
          </IconContext.Provider>
        </span>
        { props.content }
      </div>
    </div>
  );
};

const PopupMenu = props => {
  return (
    <div className={ "menuWrapper" }>
      <div id="menu" className={ "boxMenu" } style={{ top: isMobile ? '40px' : '' }}>
        <div className={ "twitterLink" }>
          <a href="https://twitter.com/ThatGuyEdd" 
           target="_blank" rel="noopener noreferrer">
          <FaTwitter/></a>
        </div>
        <div className={ "kofiLink" }>
          <a href="https://ko-fi.com/thatguyedd" 
           target="_blank" rel="noopener noreferrer">
          <BiCoffeeTogo/></a>
        </div>
        <button className={ "creditsButton" }
          onClick={function() {
            if(document.getElementById("credits")) {
              document.getElementById("credits").className="boxCreditsClose";
              setTimeout(function() { props.handleCredits(); }, 700); 
            }
            else {
              props.handleCredits();
            }
          }}>
          <b>Credits</b>
        </button>
        <span className={ "closeMenuIcon" } onClick={function() {
            document.getElementById("menu").className="boxMenuClose";
            setTimeout(function() { props.handleClose(); }, 700); }}>
          <IconContext.Provider
            value={{style: { verticalAlign: 'middle', scale: '0.75' }}}>
            <GrClose/>
          </IconContext.Provider>
        </span>
        { props.content }
      </div>
    </div>
  );
};


const PopupCredits = props => {
  return (
    <div className={ "creditsWrapper" }>
      <div id="credits" className={ "boxCredits" }>
        <span className={ "closeCreditsIcon" } onClick={function() {
            document.getElementById("credits").className="boxCreditsClose";
            setTimeout(function() { props.handleClose(); }, 700); }}>
          <IconContext.Provider
            value={{style: { verticalAlign: 'middle', scale: '0.75' }}}>
            <GrClose/>
          </IconContext.Provider>
        </span>
        { props.content }
      </div>
    </div>
  );
};

const Menu = ({ setCity }) => {
  const [localCity, setLocalCity] = useState("Select City");  
  const [helpOpen, setHelpOpen] = useState(localStorage.getItem("showHelp") === "true");
  const [menuOpen, setMenuOpen] = useState(true);
  const [creditsOpen, setCreditsOpen] = useState(false);

  const toggleHelpPopup = () => {
    setHelpOpen(!helpOpen);
    localStorage.setItem("showHelp", "true");
  }

  const toggleShowHelp = () => {
    setHelpOpen(!helpOpen);
    localStorage.setItem("showHelp", "false");
  }
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toggleCredits = () => {
    setCreditsOpen(!creditsOpen);
  }

  return (
    <div>
      <div className={ "helpButton" }>
        <IconButton 
          size='small'
          disableRipple
          sx={{
            background: 'white',
            color: 'black',
            border: 1.5,
            borderColor: 'black'}}
          onClick={ toggleHelpPopup }>
          <FaQuestion style={{ transform: 'scale(0.9)' }}/>
        </IconButton>
      </div>
      <div className={ "menuButton" }>
        <IconButton 
          size='small'
          disableRipple
          sx={{
            background: 'white',
            color: 'black',
            border: 1.5,
            borderColor: 'black'}}
          onClick={function() {
            if(document.getElementById("menu")) {
              document.getElementById("menu").className="boxMenuClose";
              setTimeout(function() { toggleMenu(); }, 700); 
            }
            else {
              toggleMenu();
            }
          }}>
          <FaAlignJustify style={{ transform: 'scale(0.85)' }}/>
        </IconButton>
      </div>
      {menuOpen && <PopupMenu
        content={
          <>
            <div className={ "menu" }>
              <Select sx={{ 
                height: 35, 
                marginTop: '20px', 
                color: 'black', 
                fontWeight: 'bold',
                backgroundColor: 'rgb(255,255,255,0.5)',
                outline: '1px solid black'}}
                MenuProps={{ PaperProps: { sx: { maxHeight: 300 }} }}
                value={ localCity }
                onClick={(e) => { 
                  if (e.target.dataset.value === localCity) { 
                    setCity("Loading");
                    setTimeout(function() { setCity(localCity); }, 1000); 
                  } 
                }}
                onChange={(e) => {
                  if (init && !isMobile) {
                    soundcloud().play();
                    init = false;
                  }
                  if (isMobile) {
                    soundcloud().pause();
                  }
                  setLocalCity(e.target.value);
                  setCity(e.target.value);
                }}
              >
                <MenuItem style={{ display: "none" }} value={ "Select City" } disabled>Select City</MenuItem>
                <MenuItem value={ "Aomori" }>Aomori</MenuItem>
                <MenuItem value={ "Fukuoka" }>Fukuoka</MenuItem>
                <MenuItem value={ "Fukushima" }>Fukushima</MenuItem>
                <MenuItem value={ "Hiroshima" }>Hiroshima</MenuItem>
                <MenuItem value={ "Kobe" }>Kobe</MenuItem>
                <MenuItem value={ "Kyoto" }>Kyoto</MenuItem>
                <MenuItem value={ "Nagoya" }>Nagoya</MenuItem>
                <MenuItem value={ "Nara" }>Nara</MenuItem>
                <MenuItem value={ "Niigata" }>Niigata</MenuItem>
                <MenuItem value={ "Osaka" }>Osaka</MenuItem>
                <MenuItem value={ "Sapporo" }>Sapporo</MenuItem>
                <MenuItem value={ "Sendai" }>Sendai</MenuItem>
                <MenuItem value={ "Tokyo" }>Tokyo</MenuItem>
              </Select>
            </div>       
          </>
        }
        handleCredits={ toggleCredits }
        handleClose={ toggleMenu }
      />}
      {helpOpen && localStorage.getItem("showHelp") && <PopupHelp
        content={
          <>
            <h3 className={ "helpBoxTitle" }>Japan Walkaround 🗾 日本に歩き回る</h3>
            <ul>
              <i>Lofi music with videos of Japan.</i>
            </ul>
            <ul>
              <Typography
              variant='subtitle2' 
              sx={{ display: 'none',...(isMobile && { display: 'inline' }), 
              paddingTop: '10px' }}>
                <b>Mobile Browsers:</b> Changing city will pause the music and mute video audio.
                If video is not playing, tap the button on the bottom right.
              </Typography>
            </ul>
            <b>How to Use</b>
            <IconContext.Provider
              value={{style: { verticalAlign: 'middle'}}}>
              <ul><b>Controls</b> are on the upper right of the screen.</ul>
              <Typography sx={{ display: 'inline',...(isMobile && { display: 'none' })}}>
              <ul>
                  Hover over the <b>music player</b> on the upper left to play/pause and view the current playlist.
                  Use the <b>slider</b> below the controls to change the music volume.
              </ul>
              </Typography>
              <Typography sx={{ display: 'inline',...(!isMobile && { display: 'none' })}}>
              <ul>
                  Tap the <b>music player</b> on the upper left to expand the music player window, 
                  play/pause the current song, and view the playlist.
              </ul>
              </Typography>
              <ul>
                <FaQuestion/> <b>- Opens How to Use Menu</b>
              </ul>
              <ul>
                <FaAlignJustify/> <b>- Opens Select City Menu</b>
              </ul>
              <ul>
                <BiShuffle/> <b>- Changes Music Playlist</b>
              </ul>
              <ul>
                <FaVolumeMute/> <b>- Unmutes/Mutes Video</b>
              </ul>
              <ul>
                <FaYoutube/> <b>- Current Video Source</b>
              </ul>
              <sub>
                <BiCoffeeTogo  
                  style={{ paddingBottom: 2, transform: 'scale(1.2)' }}/>
                  Want to buy me a <a href="https://ko-fi.com/thatguyedd" 
                                    target="_blank" rel="noopener noreferrer">
                <b><u>coffee</u></b>
                </a>?
              </sub>
              <sub>
                <button className={ "dontShowPopup" }
                  onClick={function() {
                    document.getElementById("help").className="boxHelpClose";
                    document.getElementById("helpWrapper").className="helpWrapperClose";
                    setTimeout(function() { toggleShowHelp(); }, 700); }}>
                  <b>Close & Don't Show Again</b>
                </button>
              </sub>
            </IconContext.Provider>
          </>
        }
        handleClose={ toggleHelpPopup }
      />}
      {creditsOpen && <PopupCredits
        content={
          <div className={ "credits" }>
            <b>Credits</b>
            <ul>
              <p>
                Website by <a href="https://twitter.com/ThatGuyEdd" 
                            target="_blank" rel="noopener noreferrer">
                <b><u>@ThatGuyEdd</u></b>
                </a> 
              </p>
              <p>
                Videos from <a href="https://www.youtube.com/@Rambalac" 
                             target="_blank" rel="noopener noreferrer">
                <b><u>@Rambalac</u></b>
                </a>
              </p>
              <p>
                Music player widget courtesy of SoundCloud.
              </p>
              <p>
                All music are properties of their respective artists.
              </p>
            </ul>
          </div>
        }
        handleClose={ toggleCredits }
      />}
    </div>
  );
};

export default App;
