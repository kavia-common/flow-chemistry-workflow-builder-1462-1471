import React from "react";

/**
 * PUBLIC_INTERFACE
 * WarningBanner shows a soft warning about configuration issues (e.g., missing backend URL).
 */
export default function WarningBanner({ message }) {
  if (!message) return null;
  return (
    <div role="status" className="banner">
      {message}
    </div>
  );
}
