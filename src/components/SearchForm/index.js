import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const SearchForm = ({ onSearch, onInputChange }) => {
    return (
        <InputGroup className='mb-3' size='lg'>
            <FormControl
                placeholder='Search For Artist'
                type='input'
                onKeyUp={event => {
                    if (event.key === 'Enter') {
                        onSearch();
                    }
                }}
                onChange={event => {
                    onInputChange(event.target.value)
                }}
            />
            <Button onClick={onSearch}>
                Search
            </Button>
        </InputGroup>
    );
};

export default SearchForm;
