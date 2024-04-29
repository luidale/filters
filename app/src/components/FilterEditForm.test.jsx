import React, { useState } from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import FilterEditForm from './FilterEditForm';
import FilterEdit from "./FilterEdit"

describe('FilterEditForm', () => {
    const setFilterMock = jest.fn();
    const filter = { name: '', criterias: [{"date": "",
            "filterMode": "MORE",
            "number": "",
            "text": "",
            "type": "AMOUNT"},
            {"date": "",
                "filterMode": "MORE",
                "number": "",
                "text": "",
                "type": "AMOUNT"}] };
    const renderFilterEditForm = (modalMode, filter) => {
        return render(
            <FilterEditForm
                title="Test Title"
                saveAction={() => {}}
                cancelAction={() => {}}
                modalMode={modalMode}
                filter={filter}
                setFilter={setFilterMock}
            />
        );
    };

    test('renders without crashing', () => {
        renderFilterEditForm(false, filter);

        expect(screen.getByText('Name')).toBeInTheDocument();
    });

    test('adds a row when add row button is clicked', () => {
        renderFilterEditForm(false, filter);

        // Click the "Add Row" button twice
        const addRowButton = screen.getByText('+ ADD ROW');
        fireEvent.click(addRowButton);
        fireEvent.click(addRowButton);

        // Expect setFilterMock to have been called twice
        expect(setFilterMock).toHaveBeenCalledTimes(2);

    });

    test('delete a row when add row button is clicked', () => {
        renderFilterEditForm(false, filter);

        // Click the "Add Row" button twice
        const deleteRowButton = screen.getAllByText('-')[0];
        fireEvent.click(deleteRowButton);

        // Expect setFilterMock to have been called twice
        expect(setFilterMock).toHaveBeenCalledTimes(1);

    });

    test('renders with Save button', () => {
        renderFilterEditForm(false, filter);

        expect(screen.getByText('SAVE')).toBeInTheDocument();
    });

    test('renders without Save button', () => {
        renderFilterEditForm(true, filter);

        expect(screen.queryByText('SAVE')).not.toBeInTheDocument();
    });
});