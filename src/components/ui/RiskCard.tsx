import React from "react";
import "../../styles/ui/BaseContainer.scss";
import "../../styles/ui/RiskCard.scss";
import PropTypes from "prop-types";



const RiskCard = ({ troop, territoryName}) => {
    let imageFileName;
    let color;

    // Define the image file name based on the word
    if (troop === '0') {
        imageFileName = 'Infantery.png';
    } else if (troop === '1') {
        imageFileName = 'Cavallery.png';
    } else if (troop === '2') {
        imageFileName = 'Artillery.png';
    } else {
        // Default image if word doesn't match any condition
        imageFileName = 'Infantery.png';
    }

    if (['Alaska', 'Northwest Territory', 'Greenland', 'Quebec', 'Ontario', 'Alberta', 'Western US', 'Eastern US', 'Central America'].includes(territoryName)) {
        color = "rgba(171, 209, 0, 1)";
    }
    else if (['Venezuela','Brazil', 'Peru', 'Argentina'].includes(territoryName)) {
        color = "rgba(224, 124, 47, 1)";
    }
    else if (['Ukraine','Northern Europe','Southern Europe', 'Western Europe', 'Scandinavia', 'Great Britain'].includes(territoryName)) {
        color = "rgba(37, 101, 219, 1)";
    }
    else if (['Egypt','Congo','North Africa', 'Madagascar', 'South Africa'].includes(territoryName)) {
        color = "rgba(166, 39, 0, 1)";
    }
    else if (['Indonesia','New Guinea','Western Australia', 'Eastern Australia'].includes(territoryName)) {
        color = "rgba(152, 87, 242, 1)";
    }
    else if (['Ural','Siberia','Yakutsk', 'Irkutsk', 'Kamchatka', 'Japan', 'Mongolia', 'China', 'Afghanistan', 'Middle East', 'India', 'Siam'].includes(territoryName)) {
        color = "rgba(5, 163, 76, 1)";
    }

    return (
        <div className="risk-card">
            <div className="border">
                
                <img src={require(`../../styles/views/Pictures/${imageFileName}`)} style={{ width: '120px', position: 'relative', top: '-20px'}} alt="My Image" />
                <p className="text" style={{'background-color': color}}> {territoryName} </p>
            </div>
        </div>
    );
};

RiskCard.propTypes = {
    troop: PropTypes.string.isRequired,
    territoryName: PropTypes.string.isRequired
};

export default RiskCard;