import { ArtieBot } from "@/components/artie-bot";
import Introduction from "@/components/intro";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

/* estilado condicional: if signed in, tal
Quizá incluso todo esto debería ser la página de sign in a la que se redirige si estás out, 
y la Home es la Home que ya tengo ahorita. Por ahora, solución provisional. */

export default function Home() {
  
  return (
    <main className="flex flex-col md:flex-row gap-6 min-h-screen p-4 pt-14 md:p-12">
      <SignedOut>
        <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-6 md:space-y-20">
          <Introduction />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="md:w-1/3 flex flex-col order-2 md:order-1 space-y-6 md:space-y-20">
          <Introduction />
        </div>
        <div className="md:w-2/3 flex order-1 md:order-2">
          <ArtieBot />
        </div>
      </SignedIn>
    </main>
  );
}


/* Landing page obliga a registrarse. No aparece nav, no aparece artie, no hay acceso a otras páginas. 
Rutas protegidas. De fondo quizá un carrusel de imágenes, la presentación y el sign in. 
Con log, actual landing page. El usuario que habla con nuestra AI ya está loggeado. 
El usuario que accede al date picker del formulario ya está loggeado y por lo tanto el mail se puede coger de ahí. 
TODO: hay problemas con la configuración actual de la llamada a la db: el hook useAuth... rerenderiza a menudo porque retorna un null
repensar y simplificar. 
TODO: Comunicar ambas tablas (usuarios y citas) para que a) las citas se asocien a un usuario y b) un usuario pueda tener varias citas

La solución parece ser: generar un componente SignUpPage que opera con 'use client' y que importo aquí para Sign out.
Aunque esa lógica igual puede estar contenida en el componente Introduction
(o sustituir introduction por una sign up page personalizada)


*/