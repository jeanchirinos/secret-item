import s from './Modal.module.scss'
import { MdReplay } from 'react-icons/md'
import { motion } from 'framer-motion'
import { CtxApp } from '../context/AppContext'
import { useContext } from 'react'

export default function Modal() {
  const { showModal, secretNumber, attemps, resetApp } = useContext(CtxApp)

  return showModal ? (
    <>
      <motion.dialog
        initial={{
          scale: 0,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 290,
          damping: 70
        }}
        className={s.modal}
        open
      >
        <p>Ganaste!</p>
        <p>#️⃣ secreto : {secretNumber}</p>
        <p>Intentos : {attemps}</p>
        <button autoFocus onClick={resetApp}>
          <MdReplay />
        </button>
      </motion.dialog>
    </>
  ) : (
    <></>
  )
}
