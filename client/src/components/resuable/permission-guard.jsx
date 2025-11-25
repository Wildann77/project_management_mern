import React from "react";
import { useAuthContext } from "@/context/auth-provider";

const PermissionsGuard = ({ requiredPermission, children, showMessage = false }) => {
  const { hasPermission } = useAuthContext();

  if (!hasPermission(requiredPermission)) {
    return showMessage ? (
      <div
        className="text-center 
          text-sm pt-3
          italic
          w-full
          text-muted-foreground"
      >
        You do not have the permission to view this
      </div>
    ) : null;
  }

  return <>{children}</>;
};

export default PermissionsGuard;
