import {NavigationRoutes} from "./configuration/navigation-routes";
import {browser, by, element} from "protractor";
import {ResultsPage} from "./pages/results-page";

let loadingTimeout = 5000;



function fillSearchFormAndClickSearch(searchParameter) {
    return element(by.css('.axr-search-box input')).sendKeys(searchParameter).then(() => {
        return element(by.css('.axr-search-box__icon-search')).click().then(() => {
            return browser.sleep(loadingTimeout);
        })
    })
}

describe('Allexis search field tests', () => {
    let artistName = 'David Guetta';
    let navigationRoutes: NavigationRoutes = new NavigationRoutes();

    beforeAll(function () {
        browser.waitForAngularEnabled(false);
    });

    beforeEach(() => {
        navigationRoutes.goToLandingPage();
        ResultsPage.totalNumberOfFilteredElements = 0;

    });

    it('Search for existing artist. Expect more than 0 results - Test Case 1', () => {
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Filters Verification - Filter: Genres, SubFilter:Pop - Test Case 2', () => {
        let filterType = 'Genres';
        let filterSubtype = 'Pop';
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Filters Verification - Filter: Genres, SubFilter:Classical - Test Case 3', () => {
        let filterType = 'Genres';
        let filterSubtype = 'Classical';
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Filters Verification - Filter: Artists, SubFilter:David Bowie - Test Case 4', () => {
        let filterType = 'Artists';
        let filterSubtype = 'David Bowie';
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Filters Verification - Filter: Product types, SubFilter:Album - Test Case 5', () => {
        let filterType = 'Product types';
        let filterSubtype = 'Album';
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Multiple Filters Verification - Filter: Product types&Genres, SubFilter:Album&Pop - Test Case 6', () => {
        let filterType1 = 'Genres';
        let filterType2 = 'Genres';
        let filterSubtype1 = 'Classical';
        let filterSubtype2 = 'Pop';
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.multipleFiltersVerification(filterType1, filterType2, filterSubtype1, filterSubtype2).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });


    it('Search for non-existing artist. Expect 0 results - Test Case 7', () => {
        let artistName = 'gfsgsdgsgfsgfdgsdgsfgsfgsfgsgsfgg';
        ResultsPage.isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });

    it('Search by existing ISRC. Expect more than 0 results - Test Case 8', () => {
        let isrc = 'USNRS1434135';
        ResultsPage.isThereMoreThanZeroResults(isrc).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });


    it('Search for non-existing ISRC. Expect 0 results - Test Case 9', () => {
        let isrc = 'USNRS143B135';
        ResultsPage.isThereMoreThanZeroResults(isrc).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });

    it('Search by existing Song. Expect more than 0 results - Test Case 10', () => {
        let song = 'White horse';
        ResultsPage.isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Attempt SQL injection - Test Case 11', () => {
        let song = 'or \'1\'=\'1 ';
        ResultsPage.isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Test Short string search,Expect that she search does not execute - Test Case 12', () => {
        let shortString = 'a';
        fillSearchFormAndClickSearch(shortString).then(() => {
            browser.sleep(loadingTimeout).then(() => {
                expect(element(by.cssContainingText('span','Search results for')).isPresent()).toBe(false);
            })
        })


    });

    it('Test Chinease Han Characters string search. Expect 0 results - Test Case 13', () => {
        let song = '漢字';
        ResultsPage.isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });



});
