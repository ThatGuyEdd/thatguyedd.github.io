import '../styles/App.css';
import React, { useState } from 'react';
import soundcloud from '../api/soundcloud';

//import "@cloudscape-design/global-styles";
import Select from "@cloudscape-design/components/select";
import { YouTubeEmbed } from './video';
import { BGM } from './bgm';
import { FaAlignJustify, FaQuestion, FaVolumeMute, FaYoutube, FaCoffee } from 'react-icons/fa';
import { BiShuffle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { IconContext } from 'react-icons';

function App() {
  const [city, setCity] = useState("Tokyo");
  
  const tokyoVideos     = ["YWPbaHNajbs","mHO8mJSZdJ0","s-rhii6znMU","0yEJWXLg7Qk","ZCVu6MDQZdg"];
  const osakaVideos     = ["GJZLXiNOqqA","ThenfmXRbkQ","pu9BorxYjBQ","XHD2KtDXClc","ahZbCdrUVaQ"];
  const kyotoVideos     = ["Se15xH-IuMQ","rAeN7TdGq4o","yqf4pUWzP4Q","kd-OLM-6GRE","aaaxRIBPbXE"];
  const sapporoVideos   = ["aDCwZIUop6s","f6E1rTfwIWc","w46op-H-TsQ"];
  const sendaiVideos    = ["cHjKckxsOCs","Mo31lwe_gv4"];
  const fukushimaVideos = ["gOkDSGzt07M","z5KoGXkECPg"];
  const hiroshimaVideos = ["NxXevpGGFBM","9UMn6CVizOw"];

  const cityVideos = new Map();
  cityVideos.set('Tokyo'      ,   tokyoVideos);
  cityVideos.set('Osaka'      ,   osakaVideos);
  cityVideos.set('Kyoto'      ,   kyotoVideos);
  cityVideos.set('Sapporo'    ,   sapporoVideos);
  cityVideos.set('Sendai'     ,   sendaiVideos);
  cityVideos.set('Fukushima'  ,   fukushimaVideos);
  cityVideos.set('Hiroshima'  ,   hiroshimaVideos);

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

const Menu = ({ setCity }) => {
  const [localCity, setLocalCity] = useState({ label: "Tokyo", value: "Tokyo" });  

  const [isOpen, setIsOpen] = useState(true);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const [menuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
                selectedOption={localCity}
                placeholder="Select City"
                onChange={(e) => {
                  setLocalCity(e.detail.selectedOption);
                  setCity(e.detail.selectedOption.value);
                }}
                options={[
                  { label: "Tokyo", value: "Tokyo" },
                  { label: "Osaka", value: "Osaka" },
                  { label: "Kyoto", value: "Kyoto" },
                  { label: "Sapporo", value: "Sapporo" },
                  { label: "Sendai", value: "Sendai" },
                  { label: "Fukushima", value: "Fukushima" },
                  { label: "Hiroshima", value: "Hiroshima" },
                ]}
                selectedAriaLabel="Selected"
              />
            </div>       
          </>
        }
        handleClose={toggleMenu}  
      />}
      <button className={"helpBox"}
        type="button"
        value="?"
        onClick={togglePopup}
      ><FaQuestion/></button>
      {isOpen && <Popup
        content={<>
          <h3 className={ "helpBoxTitle" }>Japan Walkaround 🗾 日本に歩き回る</h3>
          <b>How to Use</b>
          <IconContext.Provider
            value={{style: { verticalAlign: 'middle'}}}
          >
          <ul><b>Controls are on the upper right of the screen.</b></ul>
          <ul>
            <FaAlignJustify/> <b>- Opens City Menu</b>
          </ul>
          <ul>
            <BiShuffle/> <b>- Changes SoundCloud Playlist</b>
          </ul>
          <ul>
            <FaVolumeMute/> <b>- Mutes/Unmutes Video</b>
          </ul>
          <ul>
            <FaYoutube/> <b>- Current Video YouTube Link</b>
          </ul>
          <ul>
            <b>
              Hover over the music player on the upper left to play/pause and view the current playlist.
              Use the slider below the control buttons to change the music volume.
            </b>
          </ul>
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
          <sub>
            <FaCoffee/> Want to buy me a <a href="https://ko-fi.com/thatguyedd" 
                                          target="_blank" rel="noopener noreferrer">
            <b><u>coffee</u></b>
            </a>?
            </sub>
          </IconContext.Provider>
        </>}
        handleClose={togglePopup}
      />}
    </div>
  );
};

export default App;
