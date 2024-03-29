"use client";

import { useEffect } from "react";
import { EmptyState } from "./components/alerts/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error, "aca");
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
