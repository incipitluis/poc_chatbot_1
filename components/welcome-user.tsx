"use client";
import React from 'react';
import { useUser } from "@clerk/nextjs";

interface WelcomeUserProps {
  className?: string;
}

const WelcomeUser: React.FC<WelcomeUserProps> = ({ className }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div className={className}>Let&apos;s explore creativity together at Ink Spot, {user.firstName}!</div>;
};

export default WelcomeUser;
