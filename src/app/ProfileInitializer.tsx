import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/store/store';
import { fetchProfile } from 'src/shared/api/otus';
import { clearProfile, setProfile } from 'src/entities/Profile/model/profileSlice';
import { logout } from 'src/entities/Auth/model/authSlice';

const ProfileInitializer: FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      dispatch(clearProfile());
      return;
    }

    fetchProfile()
      .then((profile) => {
        dispatch(
          setProfile({
            ...profile,
            isAdmin: profile.email === 'admin@site.com',
          })
        );
      })
      .catch(() => {
        dispatch(clearProfile());
        dispatch(logout());
      });
  }, [token]);

  return null;
};

export default ProfileInitializer;
