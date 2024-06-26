import React from "react";
import "../../styles/ui/BaseContainer.scss";
import PropTypes from "prop-types";

const FormField = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};


export default FormField;