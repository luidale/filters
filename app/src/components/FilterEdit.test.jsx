import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterEdit from './FilterEdit';

describe('FilterEdit', () => {

    const renderFilterEdit = (useModal) => {
        return render(
            <FilterEdit
                useModal={useModal}
                editOrAddFilter={true}
                stopEditOrAddFilter={() => {}}
            />
        );
    };

    test('renders CustomModal when useModal is true', () => {
        renderFilterEdit(true);

        // Assert that CustomModal is rendered
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('renders FilterEditForm when useModal is false', () => {
        renderFilterEdit(false);

        // Assert that FilterEditForm is rendered
        expect(screen.getByText('Add filter')).toBeInTheDocument();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});