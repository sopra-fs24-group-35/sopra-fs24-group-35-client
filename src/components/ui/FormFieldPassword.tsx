import React from "react";
import "../../styles/ui/BaseContainer.scss";
import PropTypes from "prop-types";

const FormFieldPassword = (props) => {
    return (
        <div className="login field">
            <label className="login label">{props.label}</label>
            <input
                type = "password"
                className="login input"
                placeholder="enter here.."
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldPassword.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default FormFieldPassword;