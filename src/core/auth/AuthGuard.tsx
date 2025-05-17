import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { getSecureCookie } from "../../utils/storages/cookies";

export default function AuthGuard({
  children,
}: {
  children: ReactNode;
}): ReactNode | null {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(getSecureCookie("user"));

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/login" });
  }, [isLoggedIn]);

  return isLoggedIn ? <>{children}</> : null;
}
