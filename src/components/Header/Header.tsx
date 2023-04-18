import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setToken } from '../../store/reducers/appSlice';
import { logout } from '../../utils';
import CottageIcon from '@mui/icons-material/Cottage';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import CreateBoard from '../CreateBoard/CreateBoard';

import styles from '../Header/Header.module.scss';
import { Button } from '@mui/material';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const token = useAppSelector(state => state.app.token)
  const token = localStorage.getItem('TOKEN_AUTH_LOCALSTORAGE');

  type mouseEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>;

  function clickHandler(event?: mouseEvent) {
    if (event) {
      event.preventDefault();
    }
    setIsOpen(!isOpen);
  }

  function onLogout() {
    logout();
    dispatch(setToken(null));
    navigate('/');
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav>
          <ul className={styles.navigation}>
            <li>
              <Link to="/">
                <CottageIcon sx={{ color: 'white' }} />
                Home
              </Link>
            </li>
            <li>
              {token && <Button onClick={(event) => clickHandler(event)}>Create new board</Button>}
            </li>
            <div className={styles.rightSide}>
              {!token ? (
                <li>
                  <Link to="/registration">
                    <AppRegistrationIcon sx={{ color: 'white' }} />
                    sign up
                  </Link>
                </li>
              ) : (
                ''
              )}
              {!token ? (
                <li>
                  <Link to="/login">
                    <LoginIcon sx={{ color: 'white' }} />
                    login
                  </Link>
                </li>
              ) : (
                ''
              )}
              {token && (
                <li>
                  <Button variant="text" onClick={onLogout}>
                    <LogoutIcon sx={{ color: 'white' }} />
                    Logout
                  </Button>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </div>
      {isOpen && <CreateBoard handler={clickHandler} />}
    </header>
  );
};

export default Header;
