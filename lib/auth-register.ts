'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function useAuthRegister() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && userId && user) {
      fetch('/api/register', {
        method: 'POST',
      });
    }
  }, [isLoaded, userId, user]);
}
