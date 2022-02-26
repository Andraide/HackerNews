import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import angular from '../assets/icons/angular/image.jpg'
import react from '../assets/icons/react/image.jpg'
import vue from '../assets/icons/vue/image.jpg'
import { connect } from 'react-redux';
import store from '../redux/store/store';
import { change } from '../redux/actions/actions';
//import { change } from '../redux/actions/actions';



const friendOptions = [
    {
      key: 'Angular',
      text: 'Angular',
      value: 'Angular',
      image: { avatar: false, src: angular },
    },
    {
      key: 'React',
      text: 'React',
      value: 'React',
      image: { avatar: true, src: react },
    },
    {
      key: 'Vue',
      text: 'Vue',
      value: 'Vue',
      image: { avatar: true, src: vue },
    }
  ]
  
  class DropdownMenu extends Component {

    constructor(props)
    {
      super(props)
      this.state = {
        
      }

      this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event, { value }) =>
    {
      //this.setState({ library: value })
      store.dispatch({ type: 'CHANGE', payload: value })
      //change(value)
      
    }

    toogleAll()
    {
        store.dispatch({ type: 'ALL' })
    }

    toogleFaves()
    {
        store.dispatch({ type: 'FAVES' })
    }

    render()
    {
      //console.log("Value", this.props.value)
      return (
        <div>
          <div style={{ marginTop: '4vh' }}>
            <button onClick={this.toogleAll}>All</button>
            <button onClick={this.toogleFaves}>Faves</button>
          </div>
          <div style={{ height: '4vh' }}></div>
          <Dropdown
            placeholder='Select Friend'
            fluid
            selection
            options={friendOptions}
            onChange={this.handleChange}
            value={this.props.library}
          />
        </div>
      )

    }

  }

  const mapStateToProps = (state) => ({
    library: state.librarys.library,
    value: state.counter.value,
  });


  export default connect(mapStateToProps)(DropdownMenu)
  