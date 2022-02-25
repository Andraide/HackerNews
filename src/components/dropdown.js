import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from 'react-redux';

class BasicSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            age: 10
        }

        this.handleChange = this.handleChange.bind(this)
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
        const { age } = this.state
        const { value } = this.props
        console.log("Value", value)

        return (
            true ? 
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={this.handleChange}
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

const mapStateToProps = (state) => ({
  value: state.value,
});

export default connect(mapStateToProps)(BasicSelect)