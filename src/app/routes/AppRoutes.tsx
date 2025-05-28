import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { OperationsPage } from 'src/pages/OperationsPage/OperationsPage';
import ProfilePage from 'src/pages/ProfilePage/ProfilePage';
import { OperationFormModal } from 'src/features/add-operation/ui/OperationFormModal';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from 'src/pages/RegisterPage/RegisterPage';

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const state = (location.state as { backgroundLocation?: Location }) || {};

  return (
    <>
      <Routes location={state.backgroundLocation || location}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <OperationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operations"
          element={
            <ProtectedRoute>
              <OperationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {state.backgroundLocation && (
        <Routes>
          <Route
            path="/operations/:id"
            element={
              <ProtectedRoute>
                <OperationFormModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};
