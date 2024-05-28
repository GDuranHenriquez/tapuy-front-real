import styles from './register.module.css'
import React, { useEffect, useState } from "react"
import { emailRegex } from '../../../utils/expReg'

type DataFormRegister = {
  email: string,
  password: string,
  confirmPassword: string
}
type DataFormRegisterError = {
  email?: string,
  password?: string,
  confirmPassword?: string
}

interface Props {
  setIsSingIn:  React.Dispatch<React.SetStateAction<boolean>>;
  isSingIn: boolean
}

const RegisterComponent : React.FC<Props> = ({setIsSingIn, isSingIn}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)
  const [dataRegister, setDataRegister] = useState<DataFormRegister>({
    email: '', password: '', confirmPassword: ''
  })
  const [errorForm, setErrorForm] = useState<DataFormRegisterError>({})


  const handlePassWordVisible = (e: React.MouseEvent<HTMLButtonElement>) : void => {
    const {name} = e.currentTarget;
    switch (name) {
      case 'btnPassword':
        setIsPasswordVisible(!isPasswordVisible)        
        break;
      case 'btnConfirmPassword':
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
        break;    
      default:
        break;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    const name = e.target.name;
    const value = e.target.value;
    const newDataRegister = {...dataRegister};
    if(name === 'email'){
      newDataRegister[name] = value;
      setDataRegister(newDataRegister)
    }else if(name === 'password'){
      if(value.length<= 32){
        newDataRegister[name] = value;
        setDataRegister(newDataRegister)
      }
    }else if(name === 'confirmPassword'){
      if(value.length<= 32){
        newDataRegister[name] = value;
        setDataRegister(newDataRegister)
      }
    }
  }

  const handleError = () : number => {
    const keysDataForm = Object.keys(dataRegister);
    const newDataError = {...errorForm}

    keysDataForm.forEach(nameInp => {
      switch (nameInp) {
        case 'email':
          if(dataRegister.email === ''){
            newDataError.email = 'Campo requerido'
          }else if(!emailRegex.test(dataRegister.email) || dataRegister.email === ''){
            newDataError.email = 'El email no es valido'
          }else{
            delete newDataError.email
          } 
          break;

        case 'password':
          const pass = dataRegister.password;

          if(pass === ''){
            newDataError.password = 'Campo requerido'
          }else if(pass.length < 8 || (pass.length > 32)){
            newDataError.password = 'El password debe contener entre 8 y 32 caracteres'
          }else{
            delete newDataError.password
          } 
          break;
        case 'confirmPassword':
          const password = dataRegister.password;
          const confirmPass = dataRegister.confirmPassword;

          if(confirmPass === ''){
            newDataError.confirmPassword = 'Campo requerido'
          }else if(password !== confirmPass){
            newDataError.confirmPassword = 'No coinden los password'
          }else{
            delete newDataError.confirmPassword
          }
          break      
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
      console.log(dataRegister)
      
    } catch (error) {
      
    }
  }

  const cleanData = () : void => {
    setDataRegister({
      email: '', password: '', confirmPassword: ''
    })
  }

  const swicthToSingIn = () : void =>{
    setIsSingIn(!isSingIn)
  }

  useEffect(() => {
    if(Object.keys(errorForm).length){
      handleError()
    }
  }, [dataRegister])

  return <div className={styles.containerFormRegister}>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Dirección de Email</label>
        <input type="email" name='email' className="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" value={dataRegister.email} onChange={handleInputChange} />
        {errorForm.email ? <div className={styles.invalidInput}>
            <span>{errorForm.email}</span>
          </div>: null}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <div className='input-group mb-3'>
          <input type={isPasswordVisible ? 'text' : 'password'} name='password' className="form-control" 
          id="password" value={dataRegister.password} onChange={handleInputChange} />
          <button className={styles.btnEye} type="button" id="btnPassword" name='btnPassword' onClick={handlePassWordVisible}>
            <i className={isPasswordVisible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'} ></i>
          </button>
        </div>
        {errorForm.password ? <div className={styles.invalidInput}>
            <span>{errorForm.password}</span>
          </div>: null}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirmar Password</label>
        <div className='input-group mb-3 has-validation'>
          <input type={isConfirmPasswordVisible ? 'text' : 'password'} name='confirmPassword' className="form-control" 
          id="confirmPassword" value={dataRegister.confirmPassword} onChange={handleInputChange} />
          <button className={styles.btnEye} type="button" id="btnConfirmPassword" name='btnConfirmPassword' onClick={handlePassWordVisible}>
            <i className={isConfirmPasswordVisible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'} ></i>
          </button>
        </div>
        {errorForm.confirmPassword ? <div className={styles.invalidInput}>
            <span>{errorForm.confirmPassword}</span>
          </div>: null}
      </div>

      <div className={`mb-3 ${styles.containerButton}`}>
        <button type="button" className="btn btn-light" onClick={cleanData}>Limpiar</button>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </div>      
    </form>

    <div>
      <span>Si tienes cuenta inicia sesión <button onClick={swicthToSingIn}>aquí</button></span>
    </div>
  </div>

}

export default RegisterComponent;