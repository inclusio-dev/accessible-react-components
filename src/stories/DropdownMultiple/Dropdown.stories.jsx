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
  label: 'Gruppo',
  placeholder: 'Seleziona il Gruppo',
  optionsList: [
    'Matematica',
    'Geografia',
    'Educazione Civica',
    'Storia',
    'Filosofia',
    'Informatica',
    'Biologia',
    'Fisica',
  ],
  multiple: false,
}

export const Multiple = Template.bind({})
Multiple.args = {
  label: 'Gruppo',
  placeholder: 'Seleziona il Gruppo',
  optionsList: [
    'Matematica',
    'Geografia',
    'Educazione Civica',
    'Storia',
    'Filosofia',
    'Informatica',
    'Biologia',
    'Fisica',
  ],
}
