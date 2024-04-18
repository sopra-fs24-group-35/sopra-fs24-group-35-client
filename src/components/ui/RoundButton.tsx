import React from "react";
import PropTypes from "prop-types";
import "../../styles/ui/Button.scss";
import "../../styles/ui/RoundButton.scss";
export const RoundButton = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`round-button ${props.className}`}>
        {props.children}
    </button>
);


RoundButton.propTypes = {
    width: PropTypes.number,
    style: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};