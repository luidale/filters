import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = ({ isOpen, toggle, title, content, onPrimaryClick, primaryButtonText, secondaryButtonText }) => {
    const [height] = useState(500);
    const [maxWidthValue] = useState(800);

    const handlePrimaryClick = () => {
        onPrimaryClick(false);
    };

    const handleToggle = () => {
        toggle(false);
    };

    return (
        <Modal isOpen={isOpen} toggle={handleToggle} style={{ maxWidth: `${maxWidthValue}px`}}>
            <ModalHeader toggle={handleToggle}>{title}</ModalHeader>
            <ModalBody className="resizable-content" style={{ height }}>
                {content}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handlePrimaryClick}>
                    {primaryButtonText}
                </Button>{' '}
                <Button color="secondary" onClick={handleToggle}>
                    {secondaryButtonText}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.node,
    onPrimaryClick: PropTypes.func.isRequired,
    primaryButtonText: PropTypes.string.isRequired,
    secondaryButtonText: PropTypes.string.isRequired,
};

export default CustomModal;