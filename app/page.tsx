import { ArtieBot } from "@/components/artie-bot";
import { Button } from "@/components/ui/button";
import TextCard from "@/components/ui/text-card";
import WelcomeUser from "@/components/welcome-user";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <main className="flex flex-col md:flex-row gap-6 min-h-screen p-4 pt-14 md:p-12">
      <div className="md:w-1/3 flex flex-col order-2 md:order-1 space-y-6 md:space-y-20">
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
        </SignedIn>
            <p></p>
          </div>
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
        </TextCard>
      </div>
      <div className="md:w-2/3 flex order-1 md:order-2">
        <ArtieBot />
      </div>
    </main>
  );
}
