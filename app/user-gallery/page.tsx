'use client'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="flex flex-col md:flex-row items-center bg-[color:var(--card)] dark:bg-[color:var(--secondary)] text-[color:var(--card-foreground)] dark:text-[color:var(--primary-foreground)] p-6 rounded-lg shadow-lg">
        <div className="md:mx-4 mb-6 md:mb-0">
          <Image
            src="/ink-spot.png"
            width={250}
            height={250}
            alt={user.fullName!}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:ml-4 w-full">
          <div className="overflow-x-auto px-4 py-4">
            <div className="inline-block w-full overflow-hidden rounded-lg">
              <table className="w-full leading-normal">
                <tbody>
                  {/* Firstname */}
                  <tr>
                    <td className="whitespace-nowrap border-b border-gray-300 bg-[color:var(--card)] px-5 py-5 text-sm font-bold">
                      First Name
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-300 bg-[color:var(--card)] px-5 py-5 text-sm">
                      {user.firstName}
                    </td>
                  </tr>
                  {/* Last Name */}
                  <tr>
                    <td className="whitespace-nowrap border-b border-gray-300 bg-[color:var(--card)] px-5 py-5 text-sm font-bold">
                      Last Name
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-300 bg-[color:var(--card)] px-5 py-5 text-sm">
                      {user.lastName}
                    </td>
                  </tr>
                  {/* Emails */}
                  <tr>
                    <td className="whitespace-nowrap border-b border-gray-300 bg-[color:var(--card)] px-5 py-5 text-sm font-bold">
                      Emails
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-300 bg-[color:var(--card)] px-5 py-5 text-sm">
                      {user.emailAddresses.map((email) => (
                        <div key={email.emailAddress}>{email.emailAddress}</div>
                      ))}
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Link href={'/additional'}>
              <button className="bg-[color:var(--primary)] text-[color:var(--primary-foreground)] px-4 py-2 font-bold rounded-lg shadow-md transition-all hover:bg-[color:var(--primary-hover)]">
                Update Additional Information
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
