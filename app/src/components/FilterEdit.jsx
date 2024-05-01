import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomModal from "./CustomModal"
import FilterEditForm from "./FilterEditForm"
import {CriteriaType, NumberMode} from "../constants/classifiers"

const FilterEdit = ({ useModal, id, editOrAddFilter, stopEditOrAddFilter }) => {
    const initialFormState = {
        name: '',
        criterias: [
            {type: Object.keys(CriteriaType)[0],
            filterMode: Object.keys(NumberMode)[0],
            text: '',
            date: '',
            number: ''}
        ]
    };
    const [filter, setFilter] = useState(initialFormState);

    useEffect(() => {
        if (id) {
            fetch(`/api/filter/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch filter data');
                    }
                    return response.json();
                })
                .then(data => setFilter(data))
                .catch(error => {
                    console.error('Error fetching filter data:', error);
                });
        }
    }, [id]);

    const title = id ? 'Edit filter' : 'Add filter';

    const handleSubmit = async (event) => {
        if (!useModal)
            event.preventDefault();

        try {
            const response = await fetch(`/api/filter${filter.id ? `/${filter.id}` : ''}`, {
                method: (filter.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            });

            if (!response.ok) {
                throw new Error('Failed to save the filter');
            }

            setFilter(initialFormState);
            stopEditOrAddFilter(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return useModal ? (
        <CustomModal
            isOpen={useModal && editOrAddFilter}
            toggle={stopEditOrAddFilter}
            title={title}
            content={
                <FilterEditForm
                    modalMode={useModal}
                    filter={filter}
                    setFilter={setFilter}
                />
            }
            onPrimaryClick={handleSubmit}
            primaryButtonText={'SAVE'}
            secondaryButtonText={'CANCEL'}
        />
    ) : (
        <FilterEditForm
            className="resizable-content"
            title={<h2>{title}</h2>}
            saveAction={handleSubmit}
            cancelAction={stopEditOrAddFilter}
            modalMode={useModal}
            filter={filter}
            setFilter={setFilter}
        />
    );
};

FilterEdit.propTypes = {
    useModal: PropTypes.bool.isRequired,
    id: PropTypes.number,
    editOrAddFilter: PropTypes.bool.isRequired,
    stopEditOrAddFilter: PropTypes.func.isRequired
};

export default FilterEdit;