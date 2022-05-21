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
  label: 'Seleziona il tuo genere letterario preferito',
  placeholder: 'Seleziona il genere letterario',
  optionsList: [
    'Avventura e Azione',
    'Giallo',
    'Fantascienza',
    'Distopia',
    'Thriller',
    'Fantasy',
    'Horror',
    'Rosa',
    'Storico',
    'Umoristico',
  ],
  multiple: false,
}

export const Multiple = Template.bind({})
Multiple.args = {
  label: 'Seleziona i tuoi generi letterari preferiti',
  placeholder: 'Seleziona i generi letterari',
  optionsList: [
    'Avventura e Azione',
    'Giallo',
    'Fantascienza',
    'Distopia',
    'Thriller',
    'Fantasy',
    'Horror',
    'Rosa',
    'Storico',
    'Umoristico',
  ],
}
