import { FC, useState } from 'react'
import { Link } from "react-router-dom";
import CreateBoard from '../CreateBoard/CreateBoard';

import styles from '../Header/Header.module.scss'

const Header: FC = () => {

  const [isOpen, setIsOpen] = useState(false)

  type mouseEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>

  function clickHandler(event?: mouseEvent){
    if(event){
      event.preventDefault()
    }
    setIsOpen(!isOpen)
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
              <button onClick={(event) => clickHandler(event)}>Create new board</button>
            </li>
            <div className={styles.rightSide}>
              <li>
                <Link to='/registration'>sign up</Link>
              </li>
              <li>
                <Link to='/login'>login</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
        {isOpen && <CreateBoard handler={clickHandler}/>}
    </header>
  )
}

export default Header