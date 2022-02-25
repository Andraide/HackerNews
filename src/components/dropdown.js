import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class BasicSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            age: null
        }
    }


    componentDidMount()
    {
        console.log("Mounted")
    }

    handleChange(event) {
        this.setState({ age: event.target.value});
    };

    render()
    {
        return (
            true ? 
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
                onChange={() => this.handleChange()}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </Box>
            : null
        );
    }
}
