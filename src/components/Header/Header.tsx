import { FC, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setToken } from '../../store/reducers/appSlice';
import { logout } from '../../utils';
import CreateBoard from '../CreateBoard/CreateBoard';

import styles from '../Header/Header.module.scss'

const Header: FC = () => {


  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const token = useAppSelector(state => state.app.token)

  type mouseEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>

  function clickHandler(event?: mouseEvent){
    if(event){
      event.preventDefault()
    }
    setIsOpen(!isOpen)
  }

  function onLogout(){
    logout()
    dispatch(setToken(null))
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav>
          <ul className={styles.navigation}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              {token && <button onClick={(event) => clickHandler(event)}>Create new board</button>}
            </li>
            <div className={styles.rightSide}>
              { !token ?
                <li>
                  <Link to='/registration'>sign up</Link>
                </li>
                :
                ''
              }
              { !token ?          
                <li>
                  <Link to='/login'>login</Link>
                </li>
                :
                ''
              }
              { token && 
                <li>
                  <button onClick={onLogout}>Logout</button>
                </li>
              }
            </div>
          </ul>
        </nav>
      </div>
        {isOpen && <CreateBoard handler={clickHandler}/>}
    </header>
  )
}

export default Header