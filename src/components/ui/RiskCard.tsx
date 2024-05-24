import React from "react";
import "../../styles/ui/BaseContainer.scss";
import "../../styles/ui/RiskCard.scss";
import PropTypes from "prop-types";



const RiskCard = ({ troop, territoryName, isOwned}) => {
    let imageFileName;
    let color;

    // Define the image file name based on the word
    if (troop === 0) {
        imageFileName = 'Joker.png';
    } else if (troop === 1) {
        imageFileName = 'Infantery.png';
    } else if (troop === 2) {
        imageFileName = 'Cavallery.png';
    } else if (troop === 3) {
        imageFileName = 'Artillery.png';
    } else {
        // Default image if word doesn't match any condition
        imageFileName = 'Infantery.png';
    }

    if (territoryName === "Joker1" || territoryName === "Joker2") {
        color = "linear-gradient(in hsl longer hue 45deg, red 0 0)";
    }
    else if (['Alaska', 'Northwest Territory', 'Greenland', 'Quebec', 'Ontario', 'Alberta', 'Western United States', 'Eastern United States', 'Central America'].includes(territoryName)) {
        color = "rgba(171, 209, 0, 1)";
    }
    else if (['Venezuela','Brazil', 'Peru', 'Argentina'].includes(territoryName)) {
        color = "rgba(224, 124, 47, 1)";
    }
    else if (['Ukraine','Northern Europe','Southern Europe', 'Western Europe', 'Scandinavia', 'Great Britain', 'Iceland'].includes(territoryName)) {
        color = "rgba(37, 101, 219, 1)";
    }
    else if (['Egypt','East Africa','North Africa', 'Central Africa', 'Madagascar', 'South Africa'].includes(territoryName)) {
        color = "rgba(166, 39, 0, 1)";
    }
    else if (['Indonesia','New Guinea','Western Australia', 'Eastern Australia'].includes(territoryName)) {
        color = "rgba(152, 87, 242, 1)";
    }
    else if (['Ural','Siberia','Yakutsk', 'Irkutsk', 'Kamchatka', 'Japan', 'Mongolia', 'China', 'Afghanistan', 'Middle East', 'India', 'Siam'].includes(territoryName)) {
        color = "rgba(5, 163, 76, 1)";
    }

    const cardStyle = {
        border: isOwned ? '3px solid white' : '1px solid #a18041',
    };

    return (
        <div className="risk-card" style={cardStyle}>
            <div className="border">
                
                <img src={require(`../../styles/views/Pictures/${imageFileName}`)} style={{ width: '120px', position: 'relative', top: '-20px'}} alt="My Image" />
                <p className="text" style={(territoryName === "Joker1" || territoryName === "Joker2") ? {background: color} : {'background-color': color}}> {(territoryName === "Joker1" || territoryName === "Joker2") ? "Joker" : territoryName} </p>
            </div>
        </div>
    );
};

RiskCard.propTypes = {
    troop: PropTypes.number.isRequired,
    territoryName: PropTypes.string.isRequired,
    isOwned: PropTypes.bool.isRequired
};

export default RiskCard;