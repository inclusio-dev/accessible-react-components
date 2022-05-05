import React from 'react'
import DropdownMultiple from './DropdownMultiple'

export default {
  title: 'DropdownMultiple',
  component: DropdownMultiple,
  argTypes: {},
}

const Template = (args) => <DropdownMultiple {...args} />

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
}
