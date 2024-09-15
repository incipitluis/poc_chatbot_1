This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Ink Spot POC

## Overview
Ink Spot is a Proof of Concept (POC) web application designed to demonstrate the integration of an OpenAI chatbot, an automated appointment system, Drizzle ORM for database management and Clerk for user management. This POC aims to showcase the seamless interaction between these components in a fake and a bit nonsense tattoo studio setting.

## Features
- **Chatbot Integration**: A responsive chatbot to assist users with inquiries and provide information.
- **Automated Appointment System**: Users can schedule and manage their appointments with ease.
- **Clerk Integration**: Secure user authentication and management using Clerk.
- **Database Integration**: Using Drizzle and Neon Postgres for database management.

## Technologies Used
- **Next.js**: React framework for server-rendered applications.
- **TypeScript**: Static type checking for JavaScript.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Clerk**: User authentication and management service.
- **OpenAI API**: Integrated chatbot for user interaction.
- **Automated Appointment System**: System for managing user appointments.
- **Drizzle**: Type-safe ORM for managing database operations.
- **Neon Postgres**: Serverless Postgres database.

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- npm or yarn
- Clerk account
- Neon Postgres account
- OpenAI account

### Installation
1. Clone the repository

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root of the project and add your API keys and database URLs:
    ```
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
    CLERK_API_KEY=<your-clerk-api-key>
    OPENAI_API_KEY=<your-openai-api-key>
    NEXT_PUBLIC_DATABASE_URL=<your-neon-postgres-database-url>
    DATABASE_URL=<your-neon-postgres-database-url>
    ```

4. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure
- Building it

## Key Components
- Designing them

## Usage
- Defining it

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


## Acknowledgements
- Thanks to the developers of Next.js, TypeScript, TailwindCSS, Clerk, Drizzle, and Neon Postgres for their amazing tools and services.

## Contact
For any inquiries or feedback, please contact [luisperianezllorente@gmail.com].

---

Enjoy using Ink Spot POC!
