import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FilterList from './FilterList';
import CustomModal from "./components/CustomModal"

describe('FilterList Component', () => {
    const renderFilterList = () => {
        return render(
            <Router>
                <FilterList />
            </Router>
        );
    };

    test('renders filter list correctly', async () => {
        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([
                { id: 1, name: 'Filter 1', criterias: [] },
                { id: 2, name: 'Filter 2', criterias: [] },
            ]),
        });

        renderFilterList();

        // Check if loading message is displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for the data to be loaded and check if filter list is displayed
        await waitFor(() => {
            expect(screen.getByText('Filters')).toBeInTheDocument();
            expect(screen.getByText('Filter 1')).toBeInTheDocument();
            expect(screen.getByText('Filter 2')).toBeInTheDocument();
        });

        // Check if Add filter button is present
        expect(screen.getByText('Add filter')).toBeInTheDocument();
    });

    test('opens edit view in non modal-mode when Edit button is clicked', async () => {
        const filterData = { id: 1, name: 'Filter 1', criterias: [] };
        global.fetch = jest.fn().mockImplementation((url) => {
            if (url.includes('api/filters')) {
                // Mock fetching list of filters
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, name: 'Filter 1', criterias: [] },
                        { id: 2, name: 'Filter 2', criterias: [] },
                    ]),
                });
            } else {
                // Mock fetching filter data
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(filterData),
                });
            }
        });

        renderFilterList();

        // Wait for the data to be loaded
        await waitFor(() => screen.getByText('Filters'));
        // Click on the Edit button for the first filter
        act(() => {
            userEvent.click(screen.getAllByText('Edit')[0]);
        });
        // Wait for the filter data to be fetched
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        // Check if the edit is displayed
        expect(screen.getByText('Edit filter')).toBeInTheDocument();
        // Check if the modal dialog class is not present
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('opens edit view in modal-mode when Edit button is clicked', async () => {
        const filterData = { id: 1, name: 'Filter 1', criterias: [] };
        global.fetch = jest.fn().mockImplementation((url) => {
            if (url.includes('api/filters')) {
                // Mock fetching list of filters
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: 1, name: 'Filter 1', criterias: [] },
                        { id: 2, name: 'Filter 2', criterias: [] },
                    ]),
                });
            } else {
                // Mock fetching filter data
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(filterData),
                });
            }
        });

        renderFilterList();

        // Wait for the data to be loaded
        await waitFor(() => screen.getByText('Filters'));
        // Simulate clicking on the modal switch
        const modalCheckbox = screen.getByLabelText('Filter add/edit as modal');
        act(() => {
            userEvent.click(modalCheckbox);
        });
        // Check if the checkbox is checked after clicking
        expect(modalCheckbox).toBeChecked();

        // Click on the Edit button for the first filter
        act(() => {
            userEvent.click(screen.getAllByText('Edit')[0]);
        });
        // Wait for the filter data to be fetched
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        // Check if the edit is displayed
        expect(screen.getByText('Edit filter')).toBeInTheDocument();
        // Check if the modal dialog class is not present
        expect(screen.queryByRole('dialog')).toBeInTheDocument();
    });
    // TODO
    //     delete Filter
});