import React from 'react';
import {act, render, screen, userEvent} from '@testing-library/react';
import Select from './Select';
import {BrowserRouter as Router} from "react-router-dom"
import FilterList from "../FilterList"

describe('Select component', () => {
    const options = {
        option1: 'Option 1',
        option2: 'Option 2',
        option3: 'Option 3',
    };
    const handlePropertyChange = jest.fn();
    const renderSelect = () => {
        return render(
            <Select
                property="option1"
                propertyName="testProperty"
                handlePropertyChange={handlePropertyChange}
                options={options}
            />
        );
    };

    test('renders select input with options', () => {
        renderSelect();

        const selectInput = screen.getByRole('combobox');
        expect(selectInput).toBeInTheDocument();

        Object.values(options).forEach((optionText) => {
            expect(screen.getByText(optionText)).toBeInTheDocument();
        });
    });

    test('calls handlePropertyChange when select input value changes', () => {
        renderSelect();

        // Get the select element
        const selectElement = document.querySelector('.form-select');

        // Get the first option element
        const firstOption = selectElement.querySelector('option:first-child');

        // Set the selected property of the first option to true
        firstOption.selected = true;

        // Dispatch the change event on the select element
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));

        expect(handlePropertyChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: 'option1'
                })
            })
        );
    });
});