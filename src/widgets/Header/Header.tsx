import React, { FC } from 'react';
import styles from './Header.module.css';
import Logo from 'src/shared/ui/Logo/Logo';
import ThemeSwitcher from 'src/widgets/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from 'src/widgets/LanguageSwitcher/LanguageSwitcher';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store/store';

const Header: FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <NavLink to="/operations" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Операции
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Профиль
        </NavLink>
      </nav>

      <div className={styles.controls}>
        {profile && <span className={styles.username}>{profile.email}</span>}
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
