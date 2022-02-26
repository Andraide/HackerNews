import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import angular from '../assets/icons/angular/image.jpg'
import react from '../assets/icons/react/image.jpg'
import vue from '../assets/icons/vue/image.jpg'


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
        library: 'Angular'
      }

      this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event, { value }) =>
    {
      console.log(value)
    }

    render()
    {
      return (
        <Dropdown
          placeholder='Select Friend'
          fluid
          selection
          options={friendOptions}
          onChange={this.handleChange}
          value={this.state.library}
        />
      )

    }

  }

  export default DropdownMenu
  