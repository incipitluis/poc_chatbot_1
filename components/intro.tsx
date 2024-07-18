'use client'
import { SignedIn, SignedOut, SignInButton, useAuth, useUser } from "@clerk/nextjs";
import TextCard from "./ui/text-card";
import { Button } from "./ui/button";
import WelcomeUser from "./welcome-user";
import { useEffect } from "react";

export default function Introduction() {
    const { isLoaded, userId } = useAuth();
    const { user } = useUser();
  
    useEffect(() => {
      if (isLoaded && userId && user) {
        fetch('/api/register', {
          method: 'POST',
        });
      }
    }, [isLoaded, userId, user]);
 
return (

    <TextCard>
            <div className="space-y-4">
                <p>Welcome to Ink Spot, an artistic community and tattoo studio where creativity flows freely.</p>
                <p>Here, we share ideas, designs, and finished masterpieces, host engaging workshops, and, of course, create stunning tattoos.</p>  
            <SignedOut>
            <p>Join us and be part of a vibrant network of artists and enthusiasts.</p>
            <SignInButton>
                <div className="flex flex-col space-y-4">
                <Button variant={"secondary"}>Register now </Button>
                <p>and let your imagination take flight!</p>
                </div>
            </SignInButton>
            </SignedOut>
            <SignedIn>
            <WelcomeUser className="text-secondary"/>
            <div className="mt-6 flex flex-row items-center gap-4">
                <Button variant={"secondary"}>
                <a href="/gallery">Meet our artists</a> 
                </Button>
                <Button variant={"secondary"}> 
                <a href="">Explore the community</a>
                </Button>
                <Button variant={"secondary"}> 
                <a href="/user-gallery">Share your art</a>
                </Button>
            </div>
            </SignedIn>
                <p></p>
            </div>
           
    </TextCard>
    )
}