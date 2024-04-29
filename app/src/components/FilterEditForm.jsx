import React, { useState } from 'react';
import moment from 'moment';
import { Button, Form, FormGroup, Col, Row, Input, Label } from 'reactstrap';
import { CriteriaType, NumberMode, TextMode, DateMode } from "../constants/classifiers";
import PropTypes from 'prop-types';
import Select from "./Select";


const FilterEditForm = ({ title, saveAction, cancelAction, modalMode, filter, setFilter }) => {

    const handleAddRow = () => {
        const newCriteria = {
            type: Object.keys(CriteriaType)[0],
            filterMode: Object.keys(NumberMode)[0],
            text: '',
            date: '',
            number: ''
        };
        const updatedCriterias = [...filter.criterias];
        updatedCriterias.push(newCriteria);
        setFilter({ ...filter, criterias: updatedCriterias });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleCriteriasChange = (event, index) => {
        const { name, value } = event.target;
        let secondaryValue = '';
        if (name === 'type') {
            switch (value) {
                case 'AMOUNT':
                    secondaryValue = Object.keys(NumberMode)[0];
                    break;
                case 'TITLE':
                    secondaryValue = Object.keys(NumberMode)[0];
                    break;
                case 'DATE':
                    secondaryValue = Object.keys(DateMode)[0];
                    break;
                default:
                    break;
            }
        }

        const updatedCriterias = [...filter.criterias];
        updatedCriterias[index] = {
            ...updatedCriterias[index],
            [name]: value,
            ...(secondaryValue && { 'filterMode': secondaryValue })
        };
        setFilter({ ...filter, criterias: updatedCriterias });
    };

    const handleDeleteRow = (indexToDelete) => {
        const updatedCriterias = filter.criterias.filter((_, index) => index !== indexToDelete);
        setFilter({ ...filter, criterias: updatedCriterias });
    };

    if (filter.criterias.length === 0) {
        handleAddRow();
    }

    const criteriaList = filter.criterias.map((criteria, index) => (
        <Row key={index}>
            <Col sm={4}>
                <Select
                    property={criteria.type}
                    propertyName="type"
                    handlePropertyChange={handleCriteriasChange}
                    options={CriteriaType}
                    index={index}
                />
            </Col>
            <Col sm={3}>
                <Select
                    property={criteria.filterMode}
                    propertyName="filterMode"
                    handlePropertyChange={handleCriteriasChange}
                    options={(criteria.type === 'AMOUNT' || criteria.type === '') ? NumberMode : criteria.type === 'TITLE' ? TextMode : criteria.type === 'DATE' ? DateMode : null}
                    index={index}
                />
            </Col>
            <Col sm={4}>
                {criteria.type === 'AMOUNT' || criteria.type === '' || criteria.type === null ? (
                    <Input
                        type="number"
                        name={`number`}
                        id="criteria.number"
                        value={criteria.number || ''}
                        onChange={(event) => handleCriteriasChange(event, index)}
                    />
                ) : criteria.type === 'TITLE' ? (
                    <Input
                        type="text"
                        name={`text`}
                        id="criteria.text"
                        value={criteria.text || ''}
                        onChange={(event) => handleCriteriasChange(event, index)}
                    />
                ) : criteria.type === 'DATE' ? (
                    <Input
                        type="date"
                        name={`date`}
                        id="criteria.date"
                        value={criteria.date ? moment(criteria.date).format('YYYY-MM-DD') : ''}
                        onChange={(event) => handleCriteriasChange(event, index)}
                    />
                ) : null}
            </Col>
            <Col sm={1}>
                <Button color="danger" onClick={() => handleDeleteRow(index)}>-</Button>
            </Col>
        </Row>
    ));

    const [height] = useState(500);

    return (
        <div className={!modalMode ? "resizable-content" : undefined} style={!modalMode ? { height } : undefined}>
            {title}
            <Form onSubmit={saveAction}>
                <FormGroup row>
                    <Label for="name" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Row>
                            <Col sm={4}>
                                <Input type="text" name="name" id="name" value={filter.name || ''}
                                       onChange={handleChange} autoComplete="name"/>
                            </Col>
                        </Row>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="name" sm={2}>Criteria</Label>
                    <Col sm={10}>
                        {criteriaList}
                        <Row>
                            <Col sm={4}/>
                            <Col sm={3}>
                                <Button color="secondary" onClick={handleAddRow}>+ ADD ROW</Button>
                            </Col>
                        </Row>
                    </Col>
                </FormGroup>
                {!modalMode && (
                    <div className="float-end">
                        <FormGroup>
                            <Button color="primary" type="submit">SAVE</Button>{' '}
                            <Button color="secondary" onClick={() => cancelAction(false)}>CANCEL</Button>
                        </FormGroup>
                    </div>
                )}
            </Form>
        </div>
    );
};

FilterEditForm.propTypes = {
    title: PropTypes.node,
    saveAction: PropTypes.func,
    cancelAction: PropTypes.func,
    modalMode: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default FilterEditForm;