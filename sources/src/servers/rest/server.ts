import {
    inject,
    lifeCycleObserver,
    CoreBindings,
    Application
} from "@loopback/core";

import * as path from "path";

/** Swagger binding imports */
import { RestServer, RestComponent } from "@loopback/rest";
import { RestExplorerComponent } from "@loopback/rest-explorer";

/** Authentication binding imports */
import { AuthenticationComponent } from "@loopback/authentication";

import { ACLBindings } from "@acl/keys";
import { ACLRestServerConfig } from "@acl/types";

import { Sequence } from "@acl/servers/rest/sequence";

@lifeCycleObserver("servers.REST")
export class ACLRestServer extends RestServer {
    constructor(
        @inject(CoreBindings.APPLICATION_INSTANCE)
        app: Application,
        @inject(ACLBindings.REST_SERVER_CONFIG)
        options: ACLRestServerConfig = {}
    ) {
        super(app, options);

        // Set up the custom sequence
        this.sequence(Sequence);

        // Set up default home page
        this.static("/", path.join(__dirname, "../../../public"));

        // fix rest application to rest server bug
        (this as any).restServer = this;

        this.bindAuthentication(app);
        this.bindSwagger(app);
    }

    private bindAuthentication(app: Application) {
        app.component(AuthenticationComponent);
    }

    private bindSwagger(app: Application) {
        app.component(RestComponent);
        app.bind("RestExplorerComponent.KEY").to(
            new RestExplorerComponent(this as any, {
                path: "/explorer"
            })
        );
    }

    async start() {
        await super.start();

        console.log(`REST Server is running on url ${this.url}`);
    }
    async stop() {
        await super.stop();

        console.log(`REST Server is stopped!`);
    }
}
