import { model, belongsTo } from "@loopback/repository";

import {
    UserRole as UserRoleModel,
    UserRoleRelations as UserRoleModelRelations
} from "loopback-authorization-extension";

import { ModelAccess } from "../types";

import { User, Role } from "./";

const access: ModelAccess<UserRole> = {
    create: {
        permission: "USER_ROLES_WRITE"
    },
    read: {
        permission: "USER_ROLES_READ",
        filter: (context, filter) => filter
    },
    update: {
        permission: "USER_ROLES_WRITE",
        filter: (context, filter) => filter
    },
    delete: {
        permission: "USER_ROLES_WRITE",
        filter: (context, filter) => filter
    },
    history: {
        permission: "USER_ROLES_HISTORY",
        filter: (context, filter) => filter
    }
};

@model({
    settings: {
        access: access
    }
})
export class UserRole extends UserRoleModel {
    /**
     * Begin relation overrides using models with access
     */
    @belongsTo(() => User, { keyFrom: "userId", keyTo: "id" })
    userId: string;

    @belongsTo(() => Role, { keyFrom: "roleId", keyTo: "id" })
    roleId: string;
    /**
     * End relation overrides using models with access
     */

    constructor(data?: Partial<UserRole>) {
        super(data);
    }
}

export interface UserRoleRelations extends UserRoleModelRelations {}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
