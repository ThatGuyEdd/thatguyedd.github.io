import '../styles/App.css';
import React, { useState } from 'react';
import soundcloud from '../api/soundcloud';

//import "@cloudscape-design/global-styles";
import Select from "@cloudscape-design/components/select";
import { YouTubeEmbed } from './video';
import { BGM } from './bgm';

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
        <span className={ "closeMenuIcon" } onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

const Popup = props => {
  return (
    <div className={ "popupBox" }>
      <div className={ "box" }>
        <span className={ "closeIcon" } onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

const Menu = ({ setCity, cityName }) => {
  const [localCity, setLocalCity] = useState({ label: "Tokyo", value: "Tokyo" });  

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const [menuOpen, setMenuOpen] = useState(true);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={ "menuWrapper" }>
      <input className={ "menuButton" }
        type="button"
        value="Menu"
        onClick={ toggleMenu }
      />
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
      <input className={"helpBox"}
        type="button"
        value="?"
        onClick={togglePopup}
        />
      {isOpen && <Popup
        content={<>
          <b>Credits</b>
          <p>
          <ul>
            Website by <a href="https://twitter.com/ThatGuyEdd" 
                          target="_blank" rel="noopener noreferrer">
            @ThatGuyEdd
            </a> 
          </ul>
          <ul>    
            Videos from <a href="https://www.youtube.com/@Rambalac" 
                           target="_blank" rel="noopener noreferrer">
            @Rambalac
            </a>
          </ul>
          <ul>
            Music player widget courtesy of SoundCloud.
          </ul>
          </p>
        </>}
        handleClose={togglePopup}
      />}
      <span className={ "ytRef" }>
        <b>
        Videos from <a className={ "ytRefLink" } 
                      href="https://www.youtube.com/@Rambalac" 
                      target="_blank" rel="noopener noreferrer">
        @Rambalac
        </a>
        </b>
      </span>
      <span className={ "socials" }>
        <b>
        Website by <a className={ "socialsLink" } 
                      href="https://twitter.com/ThatGuyEdd" 
                      target="_blank" rel="noopener noreferrer">
        @ThatGuyEdd
        </a>
        </b>
      </span>
    </div>
  );
};

export default App;
