import React, { useRef } from "react";
import RiskCard from "../ui/RiskCard";
import "../../styles/ui/CardScrollbar.scss";

const CardScrollbar = () => {
    const containerRef = useRef(null);

    const handleWheelScroll = (e) => {
        const container = containerRef.current;
        if (container) {
            container.scrollTo({
                left: container.scrollLeft + e.deltaY*3,
                behavior: "smooth"
            });
        }
    };

    return (
        <div
            className="card-scrollbar"
            ref={containerRef}
            onWheel={handleWheelScroll}
        >
            <div className="card-scroll">
                <div className="space"/>
                <RiskCard troop="0" territoryName = 'Southern Europe'/>
                <RiskCard troop="1" territoryName = 'Yakutsk'/>
                <RiskCard troop="2" territoryName = 'Northwest Territory'/>
                <RiskCard troop="2" territoryName = 'Western US'/>
                <RiskCard troop="1" territoryName = 'New Guinea'/>
                <RiskCard troop="0" territoryName = 'Ukraine'/>
                <RiskCard troop="0" territoryName = 'Brazil'/>
                <RiskCard troop="2" territoryName = 'Madagascar'/>
                <RiskCard troop="2" territoryName = 'China'/>
                <RiskCard troop="1" territoryName = 'Alaska'/>
                <RiskCard troop="0" territoryName = 'Western Europe'/>
                
            </div>
        </div>
    );
};

export default CardScrollbar;