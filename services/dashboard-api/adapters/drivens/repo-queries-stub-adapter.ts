import { User as RepoUser } from "../../../repository/app/schemas";
import { ForRepoQuerying } from "../../ports/drivens";
import { User } from "../../app/schemas";

const userMock: RepoUser = {
    id: 'id',
    name: 'Shewin',
    email: 'shewin@gmail.com',
}

export class RepoQuerierStub implements ForRepoQuerying {
    getUser(_email: string):Promise<RepoUser> {
        return Promise.resolve(userMock);
    }

    createUser(_user: User, _password: string): Promise<RepoUser> {
        return Promise.resolve(userMock);
    }
}