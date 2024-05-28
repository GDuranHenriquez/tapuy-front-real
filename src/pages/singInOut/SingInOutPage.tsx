import styles from './singInOutPage.module.css'
import React, { useState } from "react"


import RegisterComponent from "../../components/singInOut/register/register"
import SingInComponent from '../../components/singInOut/singIn/SingInComponent'

const PageSingInOut : React.FC = () => {

  const [isSingIn, setIsSingIn] = useState<boolean>(false)

  return <div className={styles.containerPegeRegister}>
    {
      isSingIn ? <div className={styles.container}>
        <h1>Inicio de sesion</h1>
        <SingInComponent isSingIn = {isSingIn} setIsSingIn={setIsSingIn}/>
      </div> : 
      <div className={styles.container}>
        <h1>Registrarse</h1>
        <RegisterComponent isSingIn = {isSingIn} setIsSingIn={setIsSingIn}/>
      </div>
      
    }
  </div>

}

export default PageSingInOut