import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, FormGroup, Input, Label, Table } from 'reactstrap';
import moment from 'moment';
import AppNavbar from './AppNavbar';
import { NumberMode, TextMode, DateMode } from "./constants/classifiers";
import FilterEdit from "./components/FilterEdit";

const FilterList = () => {

    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [useModal, setUseModal] = useState(false);
    const [editOrAddFilter, setEditOrAddFilter] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [filterIdInEdit, setFilterIdInEdit]  = useState(null);


    const stopEditOrAddFilter = (dataWasUpdated) => {
        setEditOrAddFilter(false);
        if (dataWasUpdated) {
            setLoadData(true);
        }
    }

    const editFilter = (id) => {
        setFilterIdInEdit(id);
        setEditOrAddFilter(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('api/filters');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setFilters(data);
                setLoading(false);
                setLoadData(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        if (!editOrAddFilter && loadData) {
            fetchData();
        }
    }, [editOrAddFilter, loadData]);

    const removeFilter = async (id) => {
        try {
            await fetch(`/api/filter/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setFilters(filters => filters.filter(filter => filter.id !== id));
        } catch (error) {
            console.error('Error removing filter:', error);
        }
    }

    const addNewFilter = () => {
        setFilterIdInEdit(null);
        setEditOrAddFilter(true);
    }

    const criteriaString = (type, filterMode, text, number, date) => {
        let {filterModeString, value} = "";
        switch (type) {
            case 'AMOUNT':
                filterModeString = NumberMode[filterMode];
                value = number || '';
                break;
            case 'TITLE':
                filterModeString = TextMode[filterMode];
                value = text || '';
                break;
            case 'DATE':
                filterModeString = DateMode[filterMode];
                value = date ? moment(date).format('YYYY-MM-DD') : '';
                break;
            default:
                break;
        }
        return filterModeString + ': ' + value;
    }
    const filterList = filters.map(filter => (
        <tr key={filter.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{filter.name}</td>
            <td>{filter.criterias.map(criteria => {
                const {type, filterMode, text, number, date} = criteria;
                return <div key={criteria.id}>{criteriaString(type, filterMode, text, number, date)}</div>
            })}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" onClick={() =>  editFilter(filter.id)}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => removeFilter(filter.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));

    return (
        <div>
            <AppNavbar/>
            {!loading && (
                <Container fluid>
                    { editOrAddFilter && (
                        <FilterEdit
                            useModal={useModal}
                            id={filterIdInEdit}
                            editOrAddFilter={editOrAddFilter}
                            stopEditOrAddFilter={stopEditOrAddFilter}
                        />
                    )}
                    { (!editOrAddFilter || useModal) && (
                        <div className="float-end">
                            <FormGroup switch className="d-flex">
                                <Input
                                    id="modalCheckbox"
                                    type="switch"
                                    checked={useModal}
                                    onChange={() => {
                                        setUseModal(!useModal);
                                    }}
                                />
                                <Label htmlFor="modalCheckbox" check>Filter add/edit as modal</Label>
                                <Button color="success" onClick={addNewFilter} style={{ marginLeft: '10px' }}>Add filter</Button>
                            </FormGroup>
                        </div>
                    )}
                    <h3>Filters</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Criterias</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filterList}
                        </tbody>
                    </Table>
                </Container>
            )}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default FilterList;