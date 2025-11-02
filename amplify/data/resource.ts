import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    // Class or Subject to study
    HablaClass: a
        .model({
            name: a.string(),
            description: a.string(),
            classSessions: a.hasMany("HablaClassSession", "hablaClassId")
        })
        .authorization((allow) => [allow.authenticated()]),

    // Teacher
    HablaTeacher: a
        .model({
            firstName: a.string(),
            lastName: a.string(),
            email: a.string(),
            classSessions: a.hasMany("HablaClassSession", "hablaTeacherId")
        })
        .authorization((allow) => [allow.authenticated()]),

    // Student
    HablaStudent: a
        .model({
            firstName: a.string(),
            lastName: a.string(),
            email: a.string(),
            enrollments: a.hasMany("Enrollment", "hablaStudentId"),
        })
        .authorization((allow) => [allow.authenticated()]),

    HablaClassSession: a
        .model({
            hablaClassId: a.id(),
            hablaTeacherId: a.id(),
            startDate: a.datetime(),
            endDate: a.datetime(),
            hablaClass: a.belongsTo("HablaClass", "hablaClassId"),
            hablaTeacher: a.belongsTo("HablaTeacher", "hablaTeacherId"),
            enrollments: a.hasMany("Enrollment", "hablaClassSessionId"),
        })
        .authorization((allow) => [allow.authenticated()]),

    Enrollment: a
        .model({
            hablaClassSessionId: a.id(),
            hablaStudentId: a.id(),
            hablaClassSession: a.belongsTo("HablaClassSession", "hablaClassSessionId"),
            hablaStudent: a.belongsTo("HablaStudent", "hablaStudentId"),
        })
        .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        // Use the user pool token for authenticated requests
        defaultAuthorizationMode: "userPool",
    },
});
