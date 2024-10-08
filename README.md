<div align="center">

# 🎓 MCLASS

</div>

![App Screenshoot](/public/screenshot-home.png)

**MCLASS** is a comprehensive LMS platform that connects students and teachers. It provides features for joining classes, accessing course materials, submitting assignments, and managing classes. MCLASS streamlines the learning process and promotes engagement within a secure digital environment. It is designed to transform online and blended learning.

## ✨ Inspiration Design

[Google Classroom](https://classroom.google.com/)

## 🚀 Features

### Seamless Class Management

- **Join Classes**: Students can easily join classes by entering unique access codes provided by their teachers
- **Create Classes**: Educators can effortlessly set up new virtual classrooms with customizable settings and information.

### Interactive Learning Experience

- **Access Course Materials**: Students can access a wide range of course materials, including documents, presentations, videos, and interactive content.
- **Submit Assignments**: Students can submit their assignments directly through the MCLASS platform, ensuring a streamlined workflow.
- **File Support**: MCLASS supports a variety of file formats, including PDF, DOC/DOCX, PPT/PPTX, XLS/XLSX, images, and videos, allowing for a diverse range of learning resources.
- **Grade Submissions**: Teachers can efficiently evaluate and provide feedback on student assignments within the MCLASS interface.

### Personalized and Accessible

- **Light/Dark Mode**: Users can toggle between light and dark mode, providing a customized viewing experience for comfort and accessibility.
- **Update Profile**: Users can personalize their profiles and keep their information up-to-date.

## 🛠 Techstack

- **NextJs**
- **TypeScript**
- **Drizzle ORM**
- **React Query**
- **TailwindCSS**
- **NextAuth**
- **Shadcn/UI**
- **Uploadthing**

## 🏁 Getting Started

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

<div align="center">Don't forget to gift ⭐ for this repo, Thanks y'all 😃</div>
