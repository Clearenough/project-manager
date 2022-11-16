import styles from '../Footer/Footer.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <div className={styles.footer}>
      <a className={styles.githubLink} href="https://github.com/Clearenough" target="blank">
        <GitHubIcon />
        Github
      </a>
    </div>
  );
}

export default Footer;
