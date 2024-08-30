# MCLASS

MCLASS is a Learning Management System (LMS) designed to revolutionize the digital education landscape. This comprehensive platform seamlessly connects students and teachers in a dynamic virtual environment. Students can easily join classes using unique access codes, access course materials, and submit assignments through an intuitive interface. Meanwhile, educators benefit from robust tools to create and manage classes, design and distribute tailored coursework, and efficiently evaluate student submissions. MCLASS streamlines the entire learning process, fostering engagement and collaboration within a secure, integrated digital ecosystem. With its user-friendly design and powerful features, MCLASS is poised to transform the way educational institutions approach online and blended learning, making it an indispensable tool for modern education.

## Inspiration Design

[Google Classroom](https://classroom.google.com/)

## Features

- **Light/dark mode toggle**: Customize your viewing experience for comfort and accessibility.
- **Create or Join Class**: Easily create new virtual classrooms or join existing ones using unique access codes.
- **Create and Submit Tasks**: Teachers can create assignments, while students can submit their work directly through the platform.
- **Authentication**: Secure user authentication system to protect user data and ensure privacy.
- **Update Profile**: Users can personalize their profiles and keep their information up-to-date.

## Techstack

- **NextJs**
- **TypeScript**
- **Drizzle ORM**
- **React Query**
- **TailwindCSS**
- **NextAuth**
- **Shadcn/UI**

## Getting Started

To get started with MCLASS, follow these steps:

1. Clone the repository

   ```
   git clone https://github.com/Ibaliqbal/mclass.git
   ```

2. Install dependencies

   ```
   cd mclass
   npm install
   ```

3. Set up environment variables

   ```
   cp .env.example .env.local
   ```

4. Set up the database
   Before running the project, it's essential to set up the database. This project utilizes a PostgreSQL database hosted on Supabase. Please follow these steps:

   a. Create a new project on Supabase.
   b. Once your Supabase project is set up, locate your database credentials.
   c. Open your `.env.local` file and fill in the following fields with your Supabase database credentials:

   ```
   DATABASE_CONNECTION_STRING =
   DATABASE_HOST =
   DATABASE_USER =
   DATABASE_PASSWORD =
   DATABASE_NAME =
   ```

5. Generate and migrate the database schema
   Run the following commands to generate the database client and migrate the schema to your database:

   ```
   npm run db:generate
   npm run db:migrate
   ```

6. Run the development server
   ```
   npm run dev
   ```

Your MCLASS application should now be running and connected to your Supabase PostgreSQL database.

## Usage

After logging in, users can:

- **Students**: Join classes, view assignments, submit work, and track progress.
- **Teachers**: Create classes, manage students, assign tasks, and grade submissions.

---

MCLASS - Empowering Education Through Technology

<div align="center">Don't forget to gift ⭐for this repo, Thnak y'all</div>
