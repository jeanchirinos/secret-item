export interface IContextComponent {
  children: JSX.Element
}

export interface CtxProps {
  attemps: number
  maxNumber: number
  secretNumber: number
  lowerNumber: number
  higherNumber: number
  currentNumber: number
  inputRef: React.RefObject<HTMLInputElement>
  changeMaxNumber(e: React.ChangeEvent<HTMLInputElement>): void
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void
  resetApp(): void
}
