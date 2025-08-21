import { ForControlAuthenticating, ForRepoQuerying } from "../ports/drivens";
import { ForAuthenticating } from "../ports/drivers";
import { AuthenticatedUser, User } from "./schemas";

export class DashboardApi implements ForAuthenticating {
    constructor(
        private readonly controlAuthenticator: ForControlAuthenticating,
        private readonly repoQuerier: ForRepoQuerying,
    ){};

    async login(email: string, password: string): Promise<AuthenticatedUser> {

        // get the user authenticated from control panel
        const authDetails = await this.controlAuthenticator.getAuthDetails(email, password);

        // get the user permissions from control panel
        const permissions = await this.controlAuthenticator.getPermissions(email, password);

        // get the user form repository
        const user = await this.repoQuerier.getUser(email);

        const result = {
            ...user,
            ...authDetails,
            ...permissions,
        }  
        console.log(`LOGIN: ${result}`);
        return result;
    };

    async register(user: User, password: string): Promise<AuthenticatedUser> {

        // create the user in the repository
        const newUser = await this.repoQuerier.createUser(user, password);

        // get the user authenticated from control panel
        const userAuthentication = await this.controlAuthenticator.getAuthDetails(newUser.email, password);

        // get the user permissions from control panel
        const permissions = await this.controlAuthenticator.getPermissions(newUser.email, password);

        const result = {
            ...newUser,
            ...userAuthentication,
            ...permissions
        }
        console.log(`REGISTER: ${result}`);
        return result;
    }

}