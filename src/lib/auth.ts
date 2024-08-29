import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { UserTable } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "",
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Ensure to return an object that includes the required 'id' property
        const user = await db.query.UserTable.findFirst({
          where: eq(UserTable.email, email),
          columns: {
            id: true,
            name: true,
            role: true,
            password: true,
            avatar: true,
            email: true,
          },
        });

        if (!user) throw new Error("User not found");

        const confirm = await bcrypt.compare(password, user.password);

        if (!confirm) throw new Error("Passwords do not match");

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (!auth && pathname === "settings") {
        return false;
      }
      request.headers.set(
        "Authorization",
        `Bearer ${auth?.accessToken as string}`
      );
      return true;
    },
    async jwt({ token, user, account }) {
      const userCustom = user as {
        id: string;
        name: string;
        password: string;
        avatar: string | null;
        email: string;
        role: "Student" | "Teacher";
      };

      if (account?.provider === "credentials") {
        token.name = userCustom.name;
        token.role = userCustom.role;
        token.id = userCustom.id;
        token.image = userCustom.avatar;
        token.email = userCustom.email;
      }

      return token;
    },
    async session({ session, token }: any) {
      // Check if session.user is defined before accessing its properties
      if (session.user) {
        if ("role" in token) {
          session.user.role = token.role as string;
        }

        session.user.id = token.id
        session.user.name = token.name;
        session.user.image = token.avatar as string;
        session.user.email = token.email;
      }
      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.accessToken = accessToken;

      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "Student" | "Teacher";
    } & DefaultSession["user"];
    accessToken?: string;
  }
}
