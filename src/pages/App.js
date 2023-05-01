import '../styles/App.css';
import React, { useState } from 'react';
import soundcloud from '../api/soundcloud';

//import "@cloudscape-design/global-styles";
import Select from "@cloudscape-design/components/select";
import { YouTubeEmbed } from './video';
import { BGM } from './bgm';
import { FaAlignJustify, FaQuestion, FaVolumeUp, FaYoutube, FaTwitterSquare, 
         FaYoutubeSquare, FaCoffee, FaGripLinesVertical } from 'react-icons/fa';
import { BiShuffle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { IconContext } from 'react-icons';


function App() {
  const [city, setCity] = useState("Loading");
  
  const aomoriVideos    = ["kaB2sXvRqgY","MKyJdahuo-U"];
  const fukuokaVideos   = ["IzvoQ8fcgNU"];
  const fukushimaVideos = ["gOkDSGzt07M","z5KoGXkECPg"];
  const hiroshimaVideos = ["NxXevpGGFBM","9UMn6CVizOw"];
  const kobeVideos      = ["mHXp_o0beOE"];
  const kyotoVideos     = ["Se15xH-IuMQ","rAeN7TdGq4o","yqf4pUWzP4Q","kd-OLM-6GRE","aaaxRIBPbXE"];
  const naraVideos      = ["JO9RgHdg9S8"];
  const osakaVideos     = ["GJZLXiNOqqA","ThenfmXRbkQ","pu9BorxYjBQ","XHD2KtDXClc","ahZbCdrUVaQ"];
  const sapporoVideos   = ["aDCwZIUop6s","f6E1rTfwIWc","w46op-H-TsQ"];
  const sendaiVideos    = ["cHjKckxsOCs","Mo31lwe_gv4"];
  const tokyoVideos     = ["YWPbaHNajbs","mHO8mJSZdJ0","s-rhii6znMU","0yEJWXLg7Qk","ZCVu6MDQZdg"];
  const loading = ["-pdVUsCqd2U"];

  const cityVideos = new Map();
  cityVideos.set('Aomori'     ,   aomoriVideos);
  cityVideos.set('Fukuoka'    ,   fukuokaVideos);
  cityVideos.set('Fukushima'  ,   fukushimaVideos);
  cityVideos.set('Hiroshima'  ,   hiroshimaVideos);
  cityVideos.set('Kobe'       ,   kobeVideos);
  cityVideos.set('Kyoto'      ,   kyotoVideos);
  cityVideos.set('Nara'       ,   naraVideos);
  cityVideos.set('Osaka'      ,   osakaVideos);
  cityVideos.set('Sapporo'    ,   sapporoVideos);
  cityVideos.set('Sendai'     ,   sendaiVideos);
  cityVideos.set('Tokyo'      ,   tokyoVideos);
  cityVideos.set('Loading'    ,   loading);

  setTimeout(function() { soundcloud() }, 500);

  return (
    <>
      <div className="wrapper">
        <Menu setCity={ setCity } cityName={ city }/>
        <YouTubeEmbed videoList={ cityVideos.get(`${city}`)??[] }/>
      </div>
      <BGM/>
    </>
  );
}

const PopupMenu = props => {
  return (
    <div className={ "popupMenu" }>
      <div className={ "boxMenu" }>
        <span className={ "closeMenuIcon" } onClick={props.handleClose}>
        <IconContext.Provider
            value={{style: { verticalAlign: 'middle', scale: '0.75'}}}>
            <GrClose/>
        </IconContext.Provider>
        </span>
        {props.content}
      </div>
    </div>
  );
};

const Popup = props => {
  return (
    <div className={ "popupBox" }>
      <div className={ "box" }>
        <span className={ "closeIcon" } onClick={props.handleClose}>
        <IconContext.Provider
            value={{style: { verticalAlign: 'middle', scale: '0.75'}}}>
            <GrClose/>
        </IconContext.Provider>
        </span>
        {props.content}
      </div>
    </div>
  );
};

const PopupCredits = props => {
  return (
    <div className={ "popupCredits" }>
      <div className={ "boxCredits" }>
        <span className={ "closeCreditsIcon" } onClick={props.handleClose}>
        <IconContext.Provider
            value={{style: { verticalAlign: 'middle', scale: '0.75'}}}>
            <GrClose/>
        </IconContext.Provider>
        </span>
        {props.content}
      </div>
    </div>
  );
};

const Menu = ({ setCity }) => {
  const [localCity, setLocalCity] = useState({ label: "Select City", value: "Loading" });  

  const [isOpen, setIsOpen] = useState(localStorage.getItem("showPopup") === "true");
  const togglePopup = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("showPopup", "true");
  }
  const toggleShowPopup = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("showPopup", "false");
    }
  
  const [menuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const [creditsOpen, setCreditsOpen] = useState(false);
  const toggleCredits = () => {
    setCreditsOpen(!creditsOpen);
  }

  return (
    <div className={ "menuWrapper" }>
      <button className={ "menuButton" }
        type="button"
        onClick={ toggleMenu }
      ><FaAlignJustify/></button>
      {menuOpen && <PopupMenu
        content={
          <>
            <div className={ "menu" }>
              <label><b>Choose City</b></label>
              <Select
                className="citySelector"
                placeholder="Select City"
                selectedOption={localCity}
                onChange={(e) => {
                  soundcloud().play();
                  setLocalCity(e.detail.selectedOption);
                  setCity(e.detail.selectedOption.value);
                }}
                options={[
                  { label: "Aomori", value: "Aomori"},
                  { label: "Fukuoka", value: "Fukuoka"},
                  { label: "Fukushima", value: "Fukushima" },
                  { label: "Hiroshima", value: "Hiroshima" },
                  { label: "Kobe", value: "Kobe"},
                  { label: "Kyoto", value: "Kyoto" },
                  { label: "Nara", value: "Nara"},
                  { label: "Osaka", value: "Osaka" },
                  { label: "Sapporo", value: "Sapporo" },
                  { label: "Sendai", value: "Sendai" },
                  { label: "Tokyo", value: "Tokyo" },
                ]}
              />
              <button className={"creditsBox"}
                type="button"
                onClick={toggleCredits}
              >
                <b><u>Credits</u></b>
              </button>
            </div>       
          </>
        }
        handleClose={toggleMenu}  
      />}
      {creditsOpen && <PopupCredits
        content={
          <div className="credits">
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
        handleClose={toggleCredits}
      />}
      <button className={"helpBox"}
        type="button"
        value="?"
        onClick={togglePopup}
      ><FaQuestion/></button>
      {isOpen && localStorage.getItem("showPopup") && <Popup
        content={<>
          <h3 className={ "helpBoxTitle" }>Japan Walkaround 🗾 日本に歩き回る</h3>
          <ul>
            <i>
              Lofi music with videos of Japan.
            </i>
          </ul>
          <b>How to Use</b>
          <IconContext.Provider
            value={{style: { verticalAlign: 'middle'}}}
          >
          <ul><b>Controls</b> are on the upper right of the screen.</ul>
          <ul>
              Mouseover the <b>music player</b> on the upper left to play/pause and view the current playlist.
              Use the <b>slider</b> below the control buttons to change the music volume.
          </ul>
          <ul>
            <FaQuestion/> <b>- Opens Help Menu</b>
          </ul>
          <ul>
            <FaAlignJustify/> <b>- Opens City Menu</b>
          </ul>
          <ul>
            <BiShuffle/> <b>- Changes SoundCloud Playlist</b>
          </ul>
          <ul>
            <FaVolumeUp/> <b>- Mutes/Unmutes Video</b>
          </ul>
          <ul>
            <FaYoutube/> <b>- Current Video YouTube Link</b>
          </ul>
          <sub>
            <FaCoffee/> Want to buy me a <a href="https://ko-fi.com/thatguyedd" 
                                          target="_blank" rel="noopener noreferrer">
            <b><u>coffee</u></b>
            </a>?
          </sub>
          <sub>
            <button className="dontShowPopup"
            onClick={ toggleShowPopup }>
              <b>Close & Don't Show Again</b>
            </button>
          </sub>
          </IconContext.Provider>
        </>}
        handleClose={togglePopup}
      />}
    </div>
  );
};

export default App;
