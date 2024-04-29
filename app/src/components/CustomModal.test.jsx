import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomModal from './CustomModal';

describe('CustomModal', () => {

    // Common render function
    const toggleMock = jest.fn();
    const primaryClickMock = jest.fn();
    const title = "Test Modal";

    const renderCustomModal = () => {
        return render(
            <CustomModal
                isOpen={true}
                toggle={toggleMock}
                title={title}
                content={<div>Modal Content</div>}
                onPrimaryClick={primaryClickMock}
                primaryButtonText="Save"
                secondaryButtonText="Cancel"
            />
        );
    };

    test('renders modal with title and content', () => {
        renderCustomModal();

        // Assert modal title
        expect(screen.getByText(title)).toBeInTheDocument();

        // Assert modal content
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    test('calls toggle function when secondary button is clicked', () => {
        renderCustomModal();

        // Click secondary button
        fireEvent.click(screen.getByText('Cancel'));

        // Expect toggle function to be called
        expect(toggleMock).toHaveBeenCalledWith(false);
    });

    test('calls onPrimaryClick function when primary button is clicked', () => {
        renderCustomModal();

        // Click primary button
        fireEvent.click(screen.getByText('Save'));

        // Expect onPrimaryClick function to be called
        expect(primaryClickMock).toHaveBeenCalledWith(false);
    });
});