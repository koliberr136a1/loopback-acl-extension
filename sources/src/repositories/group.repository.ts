import { inject } from "@loopback/context";
import { juggler } from "@loopback/repository";
import { Ctor } from "loopback-history-extension";
import { GroupRepository as GroupModelRepository } from "loopback-authorization-extension";

import { PrivateACLBindings } from "@acl/keys";
import { Group, GroupRelations } from "@acl/models";

export class GroupRepository<
    Model extends Group,
    ModelRelations extends GroupRelations
> extends GroupModelRepository<Model, ModelRelations> {
    constructor(
        @inject(PrivateACLBindings.GROUP_MODEL)
        ctor: Ctor<Model>,
        @inject(PrivateACLBindings.RELATIONAL_DATASOURCE)
        dataSource: juggler.DataSource
    ) {
        super(ctor, dataSource);
    }
}
