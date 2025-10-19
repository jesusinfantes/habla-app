import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    HablaClass: a
        .model({
            name: a.string(),
            description: a.string(),
            teacher: a.string(),
        })
        .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        // Use the user pool token for authenticated requests
        defaultAuthorizationMode: "userPool"
    }
});