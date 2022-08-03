import { createContext, useRef, useState } from 'react'
import { CtxProps, IContextComponent } from 'interfaces'

export const CtxApp = createContext({} as CtxProps)

export default function AppContext({ children }: IContextComponent) {
  const [maxNumber, setMaxNumber] = useState(500)

  const initialState = {
    secretNumber: Math.floor(Math.random() * maxNumber) + 1,
    higherNumber: maxNumber + 1
  }

  const [attemps, setAttemps] = useState(0)
  const [secretNumber, setSecretNumber] = useState(initialState.secretNumber)
  const [lowerNumber, setLowerNumber] = useState(0)
  const [higherNumber, setHigherNumber] = useState(initialState.higherNumber)
  const [currentNumber, setCurrentNumber] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  function resetStates() {
    setAttemps(0)
    setLowerNumber(0)
    setCurrentNumber(0)
  }

  function changeMaxNumber(e?: React.ChangeEvent<HTMLInputElement>) {
    let number

    if (e) {
      number = Number(e.target.value)
    } else {
      number = 2
    }

    setMaxNumber(number)
    setHigherNumber(number + 1)
    setSecretNumber(Math.floor(Math.random() * number) + 1)

    document.querySelector('form')?.classList.remove('higher', 'lower')

    resetStates()
  }

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
      input.classList.add('winner')

      const dialog = document.querySelector('dialog')
      setTimeout(() => dialog?.showModal(), 500)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const number = e.target.value

    const digitsHigher = String(higherNumber).length
    const auxNumber = number.slice(0, digitsHigher)

    if (number.length > digitsHigher) e.target.value = auxNumber
  }

  function resetApp() {
    resetStates()
    setSecretNumber(initialState.secretNumber)
    setHigherNumber(initialState.higherNumber)

    const dialog = document.querySelector('dialog')
    dialog?.close()

    const input = inputRef.current
    if (!input) return
    input.focus()
    input.classList.remove('winner')
  }

  const value = {
    attemps,
    maxNumber,
    secretNumber,
    lowerNumber,
    higherNumber,
    currentNumber,
    inputRef,
    changeMaxNumber,
    handleSubmit,
    handleInputChange,
    resetApp
  }

  return <CtxApp.Provider value={value}>{children}</CtxApp.Provider>
}
