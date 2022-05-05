import React from 'react'
import Dropdown from './Dropdown'

export default {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {},
}

const Template = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Seleziona la tipologia',
  optionsList: ['Horror', 'Commedia', 'Romantico', 'Giallo'],
}
