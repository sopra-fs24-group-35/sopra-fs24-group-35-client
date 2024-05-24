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

            <p>Risk is a classic and popular board game that has been enjoyed by players worldwide for decades. The game is a strategic conquest game where the objective is to dominate the world by capturing all territories on the board. Players must employ a combination of strategy, diplomacy, and luck to outmaneuver their opponents, build armies, and engage in battles to expand their empires. Each player starts with a number of territories and armies, and through a series of phases, including reinforcement, attack, and fortification, they aim to control more regions and ultimately achieve global domination.</p>


            <h1>Reinforcement Phase</h1>

            <p>You get into the reinforcement phase as soon as your turn starts. In this phase you fortify the territories you possess and get ready to attack other players. In the bottom middle of the screen the player sees how many troops he can place. To place a troop you have to click on the button of a territory you own. In this phase you can also trade in the cards that you have gathered. For this you click on your avatar which opens a trade screen. There multiple trades you can do:<br/>
            <br/>
            Three of the same card<br/>
            or one of every card.<br/>
            You can have at most five cards, after that, you are forced to trade.<br/>
            On each card a territory is depicted. If that territory belongs to you, you get even more troops.<br/>
            You have to place all the troops that are available to you.<br/>
            When you are done with this phase, you click on the “go to attack” button</p>

            <h1>Attack Phase</h1>

            <p>After placing your troops in the reinforcement phase you now enter the attack phase. The object of an attack is to capture a territory by defeating all the opposing armies already on it. The battle is fought by a roll of the dice. Study the board for a moment. Do you want to attack? If you choose not to attack, press the GO TO TROOP MOVEMENT button . You may still fortify your position, if you wish (see Move Phase). If you choose to attack, you must follow these rules: 
            You may only attack a territory that’s adjacent (touching) to one of your own, or connected to it by a dashed line. Examples: Greenland may attack the Northwest Territory, Ontario, Quebec and Iceland. North Africa may attack Egypt, Western Europe and Brazil. At the western and eastern edges of the board, Alaska is considered adjacent to, and may attack, Kamchatka.<br/>
            <br/>
            You must always have at least two armies in the territory you’re attacking from. <br/>
            <br/>
            You may continue attacking one territory until you have eliminated all armies on it, or you may shift your attack from one territory to another, attacking each as often as you like and attacking as many territories as you like during one turn.
            To attack you first press on one of your own territories and then press one of the highlighted adjacent enemy territories, doing so will open the attack screen where you can set the amount of troops you want to use to attack and the number of times you would like to attack the chosen territory.</p>

            <h1>Move Phase</h1>

            <p>In the moving phase of Risk, players have the opportunity to fortify their positions by transferring troops between their territories. This phase occurs after the attack phase and allows players to strengthen their defenses or prepare for future offensives. To move troops, a player selects one of their territories and chooses a connected territory that they also control. Troops can then be moved from the selected territory to the connected one, ensuring that a minimum of one troop remains in the original territory. This strategic movement is crucial for maintaining strongholds, reinforcing front lines, and setting the stage for subsequent attacks. Proper troop movement can make the difference between holding a key position or losing it to an opponent in the next turn.
            </p>

            <h1>Trade Mechanic</h1>

            <p>
            To trade, press on your avatar.<br/>
            Earning Cards: At the end of any turn in which you have captured at least one territory, you will earn one (and only one) RISK card. You are trying to collect sets of 3 cards in any of the following combinations:<br/>
            <br/>
            Three of a kind<br/>
            One of each kind<br/>
            <br/>
            If you have collected a set of 3 RISK cards, you may turn them in at the beginning of your next turn, or you may wait. But if you have 5 or 6 cards at the beginning of your turn, you must trade in at least one set, and may trade in a second set if you have one.<br/>
            <br/>
            When you have selected three cards that are valid for a trade (jokers count as any card), you will be shown how many troops you will receive after the trade. The trades give a specified amount of troops:<br/>
            <br/>
            Three infantries = 4 troops<br/>
            Three cavaleries = 6 troops<br/>
            Three artilleries = 8 topps<br/>
            One of each kind = 10 troops<br/>
            <br/>
            Also, if you own the territory written on the card, the card will be highlighted with a white border. Depending on how many of the three selected cards for the trade you own, you get more bonus troops. Plus 1 troop for owning one territory, plus 2 troops for owning two territories and plus 6 troops for owning all three territrories, so make sure to own most countries you are planning to trade the respective card for.
            </p>
            <img src={require(`../../styles/views/Pictures/Cavallery.png`)} style={{ width: '180px', position: 'relative', top: '-20px'}} alt="My Image" />
            <img src={require(`../../styles/views/Pictures/Artillery.png`)} style={{ width: '180px', position: 'relative', top: '-20px'}} alt="My Image" />
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