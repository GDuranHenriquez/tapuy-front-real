import styles from './singInComponent.module.css'
import React, { useEffect, useState } from "react"
import { emailRegex } from '../../../utils/expReg'

type DataFormSingIn = {
  email: string,
  password: string,
}
type DataFormSingInError = {
  email?: string,
  password?: string,
}

interface Props {
  setIsSingIn:  React.Dispatch<React.SetStateAction<boolean>>;
  isSingIn: boolean
}

const SingInComponent : React.FC<Props> = ({setIsSingIn, isSingIn}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [dataSingIn, setDataSingIn] = useState<DataFormSingIn>({
    email: '', password: ''
  })
  const [errorForm, setErrorForm] = useState<DataFormSingInError>({})


  const handlePassWordVisible = () : void => {
    setIsPasswordVisible(!isPasswordVisible)        
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    const name = e.target.name;
    const value = e.target.value;
    const newDataRegister = {...dataSingIn};
    if(name === 'email'){
      newDataRegister[name] = value;
      setDataSingIn(newDataRegister)
    }else if(name === 'password'){
      if(value.length<= 32){
        newDataRegister[name] = value;
        setDataSingIn(newDataRegister)
      }
    }
  }

  const handleError = () : number => {
    const keysDataForm = Object.keys(dataSingIn);
    const newDataError = {...errorForm}

    keysDataForm.forEach(nameInp => {
      switch (nameInp) {
        case 'email':
          if(dataSingIn.email === ''){
            newDataError.email = 'Campo requerido'
          }else if(!emailRegex.test(dataSingIn.email)){
            newDataError.email = 'El email no es valido'
          }else{
            delete newDataError.email
          } 
          break;

        case 'password':
          const pass = dataSingIn.password;

          if(pass === ''){
            newDataError.password = 'Campo requerido'
          }else if(pass.length < 8 || (pass.length > 32)){
            newDataError.password = 'El password debe contener entre 8 y 32 caracteres'
          }else{
            delete newDataError.password
          } 
          break;     
        default:
          break;
      }
      
    })

    setErrorForm(newDataError)
    return Object.keys(newDataError).length
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    try {
      const error = handleError();
      console.log(error)
      if(error){
        console.log(errorForm)
        return
      }
      console.log(dataSingIn)
      
    } catch (error) {
      
    }
  }

  const cleanData = () : void => {
    setDataSingIn({
      email: '', password: ''
    })
  }

  useEffect(() => {
    if(Object.keys(errorForm).length){
      handleError()
    }
  }, [dataSingIn])

  const swicthToRegister = () : void =>{
    setIsSingIn(!isSingIn)
  }


  return <div className={styles.containerFormSingIn}>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Dirección de Email</label>
        <input type="email" name='email' className="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" value={dataSingIn.email} onChange={handleInputChange} />
        {errorForm.email ? <div className={styles.invalidInput}>
            <span>{errorForm.email}</span>
          </div>: null}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <div className='input-group mb-3'>
          <input type={isPasswordVisible ? 'text' : 'password'} name='password' className="form-control" 
          id="exampleInputPassword1" value={dataSingIn.password} onChange={handleInputChange} />
          <button className={styles.btnEye} type="button" id="button-addon1" name='btnPassword' onClick={handlePassWordVisible}>
            <i className={isPasswordVisible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'} ></i>
          </button>
        </div>
        {errorForm.password ? <div className={styles.invalidInput}>
            <span>{errorForm.password}</span>
          </div>: null}
      </div>

      
      <div className={`mb-3 ${styles.containerButton}`}>
        <button type="button" className="btn btn-light" onClick={cleanData}>Limpiar</button>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </div>      
    </form>

    <div>
      <span>Si no tienes cuenta registrate <button onClick={swicthToRegister}>aquí</button></span>
    </div>
  </div>

}

export default SingInComponent;