import {browser} from 'protractor';

export class NavigationRoutes {
    static HOST_BASE = 'https://store.demo.allexis.digital';
    static GET_THE_APPS = '/apps';
    static SUBSCRIPTIONS = '/subscriptions';
    static MY_BASKET = '/basket';
    static SIGN_IN = '/signin';

    goToLandingPage() {
        return browser.get(NavigationRoutes.HOST_BASE);
    }

    goToGetTheAppPage() {
        return browser.get(NavigationRoutes.HOST_BASE + NavigationRoutes.GET_THE_APPS);
    }

    gotoGetTheAppsString() {
        return NavigationRoutes.GET_THE_APPS;
    }

    goToSubscriptionsPage() {
        return browser.get(NavigationRoutes.HOST_BASE + NavigationRoutes.SUBSCRIPTIONS);
    }

    goToMyBasketPage() {
        return browser.get(NavigationRoutes.HOST_BASE + NavigationRoutes.MY_BASKET);
    }

    goToSignInPage() {
        return browser.get(NavigationRoutes.HOST_BASE + NavigationRoutes.SIGN_IN);
    }
}
