import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import '../../index.css'

const Dropdown = ({ optionsList, placeholder, width }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isFocused, setIsFocused] = useState(null)
  const optionsRef = useRef([])
  const ref = useRef(null)
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  useEffect(() => {
    if (isFocused != null) {
      optionsRef.current = optionsRef.current.slice(0, optionsList.length)
      optionsRef.current[isFocused].focus()
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isFocused, optionsList])

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }
  const deleteOption = (option) => {
    setSelectedOption(null)
    forceUpdate()
  }
  const setSelectedThenCloseDropdown = (option) => {
    setSelectedOption(option)
    setIsOptionsOpen(false)
    forceUpdate()
  }
  const handleListKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOptionsOpen(false)
        break
      case 'ArrowUp':
        e.preventDefault()
        setIsFocused(
          isFocused - 1 >= 0 ? isFocused - 1 : optionsList.length - 1
        )
        break
      case 'ArrowDown':
        e.preventDefault()
        setIsFocused(
          isFocused == optionsList.length - 1 || isFocused == null
            ? 0
            : isFocused + 1
        )
        break
      default:
        break
    }
    forceUpdate()
  }

  const onHoverOption = (index) => {
    setIsFocused(index)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOptionsOpen(false)
    }
  }

  return (
    <div
      ref={ref}
      width={width}
      className="bg-white font-sans text-black focus:bg-zinc-200"
    >
      <button
        aria-expanded={isOptionsOpen}
        aria-haspopup="listbox"
        onClick={toggleOptions}
        onKeyDown={handleListKeyDown}
        className="flex w-full items-center rounded border border-black px-4 py-2"
      >
        <span className="flex w-5/6 flex-wrap gap-2.5">
          {selectedOption ? selectedOption : placeholder}
        </span>
        <div className="mr-2 flex w-1/6 justify-end">
          {isOptionsOpen ? (
            <svg
              className="fill-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="10px"
              height="10px"
            >
              <path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z" />
            </svg>
          ) : (
            <svg
              className="fill-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="10px"
              height="10px"
            >
              <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
            </svg>
          )}
        </div>
      </button>
      {isOptionsOpen ? (
        <div
          role="listbox"
          aria-label="lista di opzioni"
          tabIndex="-1"
          onKeyDown={handleListKeyDown}
          withScrollbar={optionsList.length > 6 ? true : false}
          aria-activedescendant={optionsList[isFocused]}
          className="mt-2 flex flex-col rounded border border-zinc-200 bg-white drop-shadow-md"
        >
          {optionsList.map((option, index) => (
            <div key={index} role="option">
              <button
                key={index}
                id={'button' + option}
                aria-label={option}
                role="checkbox"
                aria-checked={Boolean(selectedOption == option)}
                tabIndex="0"
                ref={(el) => (optionsRef.current[index] = el)}
                onClick={() => setSelectedThenCloseDropdown(option)}
                onMouseEnter={() => onHoverOption(index)}
                value={option}
                className="flex w-full px-4 py-2 focus:bg-zinc-200"
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown

Dropdown.propTypes = {
  optionsList: PropTypes.array,
  placeholder: PropTypes.string,
  width: PropTypes.string,
}

Dropdown.defaultProps = {
  optionsList: [],
  placeholder: '',
  width: '600px',
}
