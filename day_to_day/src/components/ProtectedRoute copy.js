import React from "react";
import { Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  // Check if the user is authenticated (you can replace this with your actual check)
  const isAuthenticated = true;

  return isAuthenticated ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
