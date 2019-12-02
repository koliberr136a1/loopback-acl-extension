import { Entity, DefaultCrudRepository, Filter } from "@loopback/repository";
import { PermissionsList } from "loopback-authorization-extension";
import { ACLController } from "@acl/servers/rest/controller";
import { InvocationContext } from "@loopback/context";

/**
 * Default Permissions
 */
export class ACLPermissions extends PermissionsList {
    /** Users */
    USERS_READ = "Read users";
    USERS_WRITE = "Write users";
    USERS_READ_SELF = "Read self user";
    USERS_WRITE_SELF = "Write self user";

    /** Groups */
    GROUPS_READ = "Read groups";
    GROUPS_WRITE = "Write groups";

    /** Groups - Users */
    GROUPS_ADD_USER = "Add any user to any group";
    GROUPS_REMOVE_USER = "Add any user to any group";

    /** Roles */
    ROLES_READ = "Read roles";
    ROLES_WRITE = "Write roles";

    /** Roles - Users */
    ROLES_ADD_USER = "Add any user to any role";
    ROLES_REMOVE_USER = "Add any user to any role";

    /** Roles - Groups */
    ROLES_ADD_GROUP = "Add any group to any role";
    ROLES_REMOVE_GROUP = "Add any group to any role";

    /** Roles - Permissions */
    ROLES_ADD_PERMISSION = "Add any permission to any role";
    ROLES_REMOVE_PERMISSION = "Add any permission to any role";

    /** Permissions */
    PERMISSIONS_READ = "Read permissions";
    PERMISSIONS_WRITE = "Write permissions";
}

/** Get Repository From Controller */
export type RepositoryGetter<Model extends Entity> = (
    controller: ACLController
) => DefaultCrudRepository<Model, any, any>;

/** Get Model Ctor From Controller */
export type ModelGetter<Model extends Entity> = (
    controller: ACLController
) => typeof Entity & { prototype: Model };

/** Filter Handler */
export type FilterMethod<Model extends Entity> = (
    context: InvocationContext,
    filter: Filter<Model>
) => Filter<Model>;
