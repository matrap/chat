import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const SelectInput = ({ name, label, onChange, value, error, options }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control">
                    {options.map((option) => {
                        return <option key={options.indexOf(option)} value={option}>{option}</option>;
                    })
                    }
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.array.isRequired
};

export default SelectInput;
