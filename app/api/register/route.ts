import { NextResponse } from 'next/server';
import { currentUser } from "@clerk/nextjs/server";
import { createUser } from '../../queries';

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userData = {
    clerkUserId: user.id,
    firstName: user.firstName || 'N/A',  
    lastName: user.lastName || 'N/A',    
    email: user.emailAddresses[0].emailAddress,
  };

  try {
    await createUser(userData);
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 400 });
    } else {
      return new NextResponse('An unknown error occurred', { status: 400 });
    }
  }
}
