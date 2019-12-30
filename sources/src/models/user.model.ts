import { model, property, hasMany } from "@loopback/repository";

import {
    User as UserModel,
    UserRelations as UserModelRelations
} from "loopback-authorization-extension";

import { ModelAccess } from "../types";

import { UserRole, UserRoleWithRelations } from "./";

const access: ModelAccess<User> = {
    create: {
        permission: "USERS_WRITE"
    },
    read: {
        permission: "USERS_READ",
        filter: (context, filter) => filter
    },
    update: {
        permission: "USERS_WRITE",
        filter: (context, filter) => filter
    },
    delete: {
        permission: "USERS_WRITE",
        filter: (context, filter) => filter
    },
    history: {
        permission: "USERS_HISTORY",
        filter: (context, filter) => filter
    }
};

@model({
    settings: {
        access: access,
        hiddenProperties: ["password"]
    }
})
export class User extends UserModel {
    @property({
        type: "string",
        required: true,
        unique: true,
        jsonSchema: {
            pattern: `^[A-Za-z\\d#$@!%&*?]{6,}$`
        }
    })
    username: string;

    @property({
        type: "string",
        required: true,
        jsonSchema: {
            pattern: `^[A-Za-z\\d#$@!%&*?]{8,}$`
        }
    })
    password: string;

    @property({
        type: "string",
        required: true,
        unique: true,
        jsonSchema: {
            pattern: `^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$`
        }
    })
    email: string;

    @property({
        type: "string"
    })
    firstName: string;

    @property({
        type: "string"
    })
    lastName: string;

    @property({
        type: "string"
    })
    description: string;

    @property({
        type: "string"
    })
    picture: string;

    @property({
        type: "string"
    })
    country: string;

    @property({
        type: "string"
    })
    city: string;

    @property({
        type: "string"
    })
    location: string;

    @property({
        type: "string"
    })
    address: string;

    @property({
        type: "string",
        jsonSchema: {
            pattern: `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$`
        }
    })
    phone: string;

    @property({
        type: "string"
    })
    fax: string;

    @property({
        type: "string"
    })
    cellular: string;

    @property({
        type: "string"
    })
    zipCode: string;

    @property({
        type: "string"
    })
    position: string;

    @property({
        type: "string"
    })
    resume: string;

    @property({
        type: "date"
    })
    birthDate: Date;

    @property({
        type: "string",
        required: true,
        jsonSchema: {
            enum: ["Register", "Active", "Disable"]
        }
    })
    status: "Register" | "Active" | "Disable";

    /**
     * Begin relation overrides using models with access
     */
    @hasMany(() => UserRole, { keyFrom: "id", keyTo: "userId" } as any)
    userRoles: UserRoleWithRelations[];
    /**
     * End relation overrides using models with access
     */

    constructor(data?: Partial<User>) {
        super(data);
    }
}

export interface UserRelations extends UserModelRelations {}

export type UserWithRelations = User & UserRelations;
