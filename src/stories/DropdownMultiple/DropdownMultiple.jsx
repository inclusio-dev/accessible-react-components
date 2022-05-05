import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

const DropdownMultiple = ({ optionsList, placeholder }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState([])
  const [isFocused, setIsFocused] = useState(null)
  const optionsRef = useRef([])
  const ref = useRef(null)

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

  const refreshSelectedOption = useCallback(() => {
    setSelectedOption((selectedOption) =>
      selectedOption.map((optionElement) => optionElement)
    )
  }, [setSelectedOption])

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }
  const deleteOption = (option) => {
    const index = selectedOption.indexOf(option)
    selectedOption.splice(index, 1)
    setSelectedOption(selectedOption)
    refreshSelectedOption()
  }
  const setSelectedThenCloseDropdown = (option) => {
    if (!selectedOption.includes(option)) {
      setSelectedOption([...selectedOption, option])
      refreshSelectedOption()
    } else {
      deleteOption(option)
    }
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
          isFocused === optionsList.length - 1 || isFocused == null
            ? 0
            : isFocused + 1
        )
        break
      default:
        break
    }
    refreshSelectedOption()
  }

  const onHoverOption = (index) => {
    setIsFocused(index)
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOptionsOpen(false)
    }
  }

  return (
    <div ref={ref}>
      <button
        aria-expanded={isOptionsOpen}
        aria-haspopup="listbox"
        onClick={toggleOptions}
        onKeyDown={handleListKeyDown}
        className="flex w-full items-center rounded border border-solid border-black bg-white px-4 py-2 font-sans text-black focus:bg-zinc-200"
      >
        <div className="flex w-5/6 flex-row flex-wrap gap-2">
          {selectedOption.length > 0 ? (
            selectedOption.map((option, index) => {
              return (
                <div
                  tabIndex="-1"
                  key={index}
                  className="flex flex-row items-center justify-center rounded border border-solid border-black px-2"
                >
                  {option}
                  <svg
                    onClick={() => deleteOption(option)}
                    className="flex items-center pl-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    width="15px"
                    height="15px"
                    aria-hidden={true}
                  >
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                  </svg>
                </div>
              )
            })
          ) : (
            <div className=" flex justify-start">{placeholder}</div>
          )}
        </div>
        <div id="arrow" className="flex w-1/6 justify-end">
          {isOptionsOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="15px"
              height="15px"
              aria-hidden={true}
            >
              <path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="15px"
              height="15px"
              aria-hidden={true}
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
          aria-activedescendant={'button' + optionsList[isFocused]}
          className="mt-2 flex flex-col rounded border border-zinc-200 bg-white drop-shadow-md"
        >
          {optionsList.sort().map((option, index) => (
            <div key={index} role="option">
              <button
                key={index}
                id={'button' + option}
                aria-label={option}
                role="checkbox"
                aria-checked={Boolean(selectedOption.includes(option))}
                tabIndex="0"
                ref={(el) => (optionsRef.current[index] = el)}
                onClick={() => setSelectedThenCloseDropdown(option)}
                onMouseEnter={() => onHoverOption(index)}
                value={option}
                className="flex w-full items-center gap-2 px-4 py-2 focus:bg-zinc-200"
              >
                {selectedOption.includes(option) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15px"
                    height="15px"
                    viewBox="0 0 512 512"
                    className="fill-zinc-500"
                    aria-hidden={true}
                  >
                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                  </svg>
                ) : (
                  ' '
                )}
                {option}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default DropdownMultiple

DropdownMultiple.propTypes = {
  optionsList: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
}

DropdownMultiple.defaultProps = {
  optionsList: [],
  placeholder: '',
}
