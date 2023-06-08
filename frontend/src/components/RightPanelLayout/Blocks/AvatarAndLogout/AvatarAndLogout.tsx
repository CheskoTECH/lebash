import React from 'react';
import css from './AvatarAndLogout.module.css';
import { Link } from 'wouter';

import avatar from './../../../../static/avatar.png';
import logout from './../../../../static/logout.svg';

interface IAvatarAndLogout {
  isShowLogout?: boolean;
}

export const AvatarAndLogout: React.FC<IAvatarAndLogout> = ({
  isShowLogout,
}) => {
  return (
    <div className={css.profileSection}>
      <img src={avatar} alt="avatar" />
      <p className={css.username}>username</p>
      {isShowLogout && (
        <Link href="/">
          <img src={logout} alt="logout" className={css.logout} />
        </Link>
      )}
    </div>
  );
};
