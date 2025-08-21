import { ControlAuthenticatorStub } from '../adapters/drivens/control-authenticator-stub-adapter';
import { RepoQuerierStub } from '../adapters/drivens/repo-queries-stub-adapter';
import { AuthenticatorProxyAdapter } from '../adapters/drivers';
import { DashboardApi } from './dashboard-api';

const compositionMock = () => {

    const controlAuthenticatiorStub = new ControlAuthenticatorStub();
    const repoQuerierStub = new RepoQuerierStub();

    const dashboardApiMock = new DashboardApi(controlAuthenticatiorStub, repoQuerierStub);

    const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(dashboardApiMock);

    return {
        authenticatorProxyAdapter,
    }
}

export const { authenticatorProxyAdapter } = compositionMock();


const registerMock = {
    email: 'shewin@gmail.com',
    name: 'Shewin',
}

authenticatorProxyAdapter.login('shewin@gmail.com', '123456');
authenticatorProxyAdapter.register(registerMock, '123456');