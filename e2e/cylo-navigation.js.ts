import {browser} from "protractor";
import {NavigationRoutes} from "./configuration/navigation-routes";
import {CurrentPage} from "./helpers/current-page";

let loadingTimeout = 5000;

function expectPageTitleToContain(matcherTitle: any) {
    CurrentPage.waitForPageToLoad(loadingTimeout).then(() => {
        CurrentPage.getPageTitle().then((title) => {
            expect(title).toContain(matcherTitle)
        })
    })

}

describe('Cylo web-app Navigation Tests', function () {

    let navigationRoutes: NavigationRoutes = new NavigationRoutes();

    beforeAll(function () {
        browser.waitForAngularEnabled(false);
    });


    beforeEach(() => {
        navigationRoutes.goToLandingPage();
    });


    it('Navigate to the Allexis landing page - Test Case 17', function () {
        navigationRoutes.goToLandingPage();
        expect(browser.getTitle()).toEqual('Welcome | MegaMusic');
    });

    it('Navigate to "Get the apps" page - Test Case 18', () => {
        navigationRoutes.goToGetTheAppPage().then(() => {
            expectPageTitleToContain('Get the apps')
        })
    });

    it('Navigate to the "Subscription" page - Test Case 19', () => {
        navigationRoutes.goToSubscriptionsPage().then(() => {
            expectPageTitleToContain('Subscriptions')
        })
    });


    it('Navigate to the "My Basket" page - Test Case 20', () => {
        navigationRoutes.goToMyBasketPage().then(() => {
            expectPageTitleToContain('Basket')
        })
    });

    it('Navigate to "Sign in" page - Test Case 21', () => {
        navigationRoutes.goToSignInPage().then(() => {
            expectPageTitleToContain('Sign in')
        })
    })

});