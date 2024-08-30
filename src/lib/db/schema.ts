import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// All enum table
export const UserRole = pgEnum("userRole", ["Student", "Teacher"]);
export const SubmissionType = pgEnum("submissionType", [
  "material",
  "task",
  "test",
  "presence",
]);

export const UserTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    nisn: bigint("nisn", { mode: "number" }),
    avatar: varchar("avatar", { length: 255 }),
    role: UserRole("userRole").default("Student").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      idIndex: index("idUserIndex").on(table.id),
    };
  }
);

export type TUser = typeof UserTable.$inferSelect;
export type TUserInsert = typeof UserTable.$inferInsert;

export const userRelation = relations(UserTable, ({ many }) => ({
  class: many(ClassTable),
  doneTask: many(DoneTaskTable),
}));

export const ClassTable = pgTable(
  "class",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    className: varchar("class_name", { length: 255 }).notNull(),
    code: varchar("code", { length: 255 }).unique().notNull(),
    instructorId: uuid("instructor_id")
      .references(() => UserTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    header_photo: varchar("header_photo", { length: 255 }),
    room: varchar("room", { length: 255 }).notNull(),
    subject: text("Subject"),
    students: uuid("students")
      .array()
      .notNull()
      .default(sql`ARRAY[]::uuid[]`),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      idIndex: index("idClassIndex").on(table.id),
      codeIndex: index("codeIndex").on(table.code),
    };
  }
);

export type TClass = typeof ClassTable.$inferSelect;

export const classRelation = relations(ClassTable, ({ one, many }) => ({
  instructor: one(UserTable, {
    fields: [ClassTable.instructorId],
    references: [UserTable.id],
  }),
  submission: many(SubmissionTable),
}));

export const SubmissionTable = pgTable(
  "submission",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    classId: uuid("class_id")
      .references(() => ClassTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    files: jsonb("files")
      .array()
      .default(sql`ARRAY[]::jsonb[]`),
    deadline: date("deadline"),
    type: SubmissionType("submissionType").default("material").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      idIndex: index("idSubmissionIndex").on(table.id),
      classIdIndex: index("classIdIndex").on(table.classId),
      typeIndex: index("typeIndex").on(table.type),
    };
  }
);

export type TSubmission = typeof SubmissionTable.$inferSelect;

export const submissionRelation = relations(
  SubmissionTable,
  ({ one, many }) => ({
    class: one(ClassTable, {
      fields: [SubmissionTable.classId],
      references: [ClassTable.id],
    }),
    doneTask: many(DoneTaskTable),
  })
);

export const DoneTaskTable = pgTable(
  "done_task",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    files: jsonb("files")
      .array()
      .default(sql`ARRAY[]::jsonb[]`),
    submissionId: uuid("submission_id")
      .references(() => SubmissionTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    student_id: uuid("student_id")
      .references(() => UserTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    idIndex: index("idDoneTaskIndex").on(table.id),
    submissionIdIndex: index("submissionIdIndex").on(table.submissionId),
    studentIdIndex: index("studentIdIndex").on(table.student_id),
  })
);

export type TDoneTask = typeof DoneTaskTable.$inferSelect;

export const doneTaskRelation = relations(DoneTaskTable, ({ one }) => ({
  submission: one(SubmissionTable, {
    fields: [DoneTaskTable.submissionId],
    references: [SubmissionTable.id],
  }),
  student: one(UserTable, {
    fields: [DoneTaskTable.student_id],
    references: [UserTable.id],
  }),
}));
