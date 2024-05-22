import React from "react";
import "../../styles/ui/HowToPlay.scss";
import PropTypes from "prop-types";


const HowToPlay = ({ isOpen, onClose }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="scrollable-box-overlay">
        <div className="scrollable-box">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div className="scrollable-content">
          <div>
          <img src={require(`../../styles/views/Pictures/Infantery.png`)} style={{ width: '180px', position: 'relative', top: '-20px'}} alt="My Image" />
            <h1>Introduction</h1>
            <p>This is some scrollable content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel sapien nec nunc cursus feugiat. Sed vel dapibus odio. Integer non orci nec felis vehicula tempor. Phasellus ac odio a dolor blandit suscipit. Mauris non lacinia ligula. Sed euismod eros ut nisl luctus, nec consequat elit posuere. Nulla facilisi. Donec scelerisque felis non ex facilisis, vel ultricies nunc tincidunt. Morbi convallis orci ut quam gravida pharetra. Vivamus volutpat tortor eu nunc pharetra, ut malesuada ante interdum. Integer ac nunc odio. Curabitur auctor sollicitudin libero, sed finibus lacus efficitur non. Nam bibendum augue vitae magna bibendum tincidunt. Aliquam erat volutpat.</p>
            <h1>Reinforcement Phase</h1>
            <p>Another paragraph of content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel sapien nec nunc cursus feugiat. Sed vel dapibus odio. Integer non orci nec felis vehicula tempor. Phasellus ac odio a dolor blandit suscipit. Mauris non lacinia ligula. Sed euismod eros ut nisl luctus, nec consequat elit posuere. Nulla facilisi. Donec scelerisque felis non ex facilisis, vel ultricies nunc tincidunt. Morbi convallis orci ut quam gravida pharetra. Vivamus volutpat tortor eu nunc pharetra, ut malesuada ante interdum. Integer ac nunc odio. Curabitur auctor sollicitudin libero, sed finibus lacus efficitur non. Nam bibendum augue vitae magna bibendum tincidunt. Aliquam erat volutpat.</p>
            <h1>Attack Phase</h1>
            <p>More content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel sapien nec nunc cursus feugiat. Sed vel dapibus odio. Integer non orci nec felis vehicula tempor. Phasellus ac odio a dolor blandit suscipit. Mauris non lacinia ligula. Sed euismod eros ut nisl luctus, nec consequat elit posuere. Nulla facilisi. Donec scelerisque felis non ex facilisis, vel ultricies nunc tincidunt. Morbi convallis orci ut quam gravida pharetra. Vivamus volutpat tortor eu nunc pharetra, ut malesuada ante interdum. Integer ac nunc odio. Curabitur auctor sollicitudin libero, sed finibus lacus efficitur non. Nam bibendum augue vitae magna bibendum tincidunt. Aliquam erat volutpat.</p>
            <h1>Move Phase</h1>
            <p>More content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel sapien nec nunc cursus feugiat. Sed vel dapibus odio. Integer non orci nec felis vehicula tempor. Phasellus ac odio a dolor blandit suscipit. Mauris non lacinia ligula. Sed euismod eros ut nisl luctus, nec consequat elit posuere. Nulla facilisi. Donec scelerisque felis non ex facilisis, vel ultricies nunc tincidunt. Morbi convallis orci ut quam gravida pharetra. Vivamus volutpat tortor eu nunc pharetra, ut malesuada ante interdum. Integer ac nunc odio. Curabitur auctor sollicitudin libero, sed finibus lacus efficitur non. Nam bibendum augue vitae magna bibendum tincidunt. Aliquam erat volutpat.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  HowToPlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  
  export default HowToPlay;