import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Select = ({ property, propertyName, handlePropertyChange, options, index }) => {
    const handleChange = (event) => {
        if (index != null) {
            handlePropertyChange(event, index);
        } else {
            handlePropertyChange(event);
        }
    }

    return (
        <Input
            type="select"
            name={propertyName}
            value={property || ''}
            onChange={handleChange}
        >
            {options &&
                Object.entries(options).map(([key, value]) => (
                    <option key={key} value={key} defaultValue={property === key}>
                        {value}
                    </option>
                ))}
        </Input>
    );
};

Select.propTypes = {
    property: PropTypes.string.isRequired,
    propertyName: PropTypes.string.isRequired,
    handlePropertyChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    index: PropTypes.number
};

export default Select;
