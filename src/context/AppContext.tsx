import { IContextComponent } from '../interfaces'
import { createContext, useRef, useState } from 'react'

interface CtxProps {
  maxNumber: number
  secretNumber: number
  attemps: number
  lowerNumber: number
  higherNumber: number
  currentNumber: number
  showModal: boolean
  changeMaxNumber(e: React.ChangeEvent<HTMLInputElement>): void
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void
  moveLabel(): void
  inputRef: React.RefObject<HTMLInputElement> | null
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void
  resetApp(): void
}

const initialState = {
  maxNumber: 500,
  attemps: 0,
  secretNumber: Math.floor(Math.random() * 500 + 1),
  lowerNumber: 0,
  higherNumber: 500,
  currentNumber: 0,
  showModal: false,
  changeMaxNumber: () => {},
  handleSubmit: () => {},
  moveLabel: () => {},
  inputRef: null,
  handleInputChange: () => {},
  resetApp: () => {}
}

export const CtxApp = createContext<CtxProps>(initialState)
// export const CtxApp = createContext(null)

export default function AppContext({ children }: IContextComponent) {
  const [maxNumber, setMaxNumber] = useState(500)

  const initialState = {
    secretNumber: Math.floor(Math.random() * maxNumber + 1),
    number: 0,
    modal: false
  }

  const [secretNumber, setSecretNumber] = useState(initialState.secretNumber)

  const [attemps, setAttemps] = useState(initialState.number)

  const [lowerNumber, setLowerNumber] = useState(initialState.number)
  const [higherNumber, setHigherNumber] = useState(500)
  const [currentNumber, setCurrentNumber] = useState(initialState.number)

  const [showModal, setShowModal] = useState(initialState.modal)

  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const input = inputRef.current
    if (!input) return
    const number = Number(input.value)

    const numberIsLower = number < secretNumber
    const numberIsHigher = number > secretNumber

    // Move circle
    const form = e.currentTarget
    form.classList.toggle('lower', numberIsLower)
    form.classList.toggle('higher', numberIsHigher)

    form.reset()

    // Update label and attemps
    setCurrentNumber(number)
    setAttemps(attemps + 1)

    // Check if number is correct
    if (numberIsLower) {
      setTimeout(() => setLowerNumber(number), 300)
    } else if (numberIsHigher) {
      setTimeout(() => setHigherNumber(number), 300)
    } else {
      input.blur()
      input.style.backgroundColor = '#eb8c17'

      setTimeout(() => setShowModal(true), 500)
    }
  }

  function moveLabel() {
    const input = inputRef.current
    const label = document.querySelector('label')

    if (input?.value) return
    label?.classList.toggle('selected')
  }

  function resetStates() {
    const { number } = initialState

    setAttemps(number)
    setLowerNumber(number)
    setCurrentNumber(number)
  }

  function resetApp() {
    resetStates()
    setHigherNumber(maxNumber)
    setSecretNumber(initialState.secretNumber)
    setShowModal(initialState.modal)

    const input = inputRef.current
    if (!input) return
    input.focus()
    input.style.backgroundColor = 'white'
  }

  function changeMaxNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value)

    if (!e.target.value) value = 1

    setMaxNumber(value)
    setHigherNumber(value)
    setSecretNumber(Math.floor(Math.random() * value + 1))

    document.querySelector('#form-currentNumber')?.classList.remove('higher', 'lower')

    resetStates()
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const number = e.target.value

    const digitsHigher = String(higherNumber).length
    const auxNumber = number.slice(0, digitsHigher)

    if (number.length > digitsHigher) e.target.value = auxNumber
  }

  const value = {
    attemps,
    maxNumber,
    changeMaxNumber,
    secretNumber,
    lowerNumber,
    higherNumber,
    currentNumber,
    showModal,
    handleSubmit,
    moveLabel,
    resetApp,
    inputRef,
    handleInputChange
  }

  return <CtxApp.Provider value={value}>{children}</CtxApp.Provider>
}
