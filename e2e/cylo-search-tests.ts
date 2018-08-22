import {NavigationRoutes} from "./configuration/navigation-routes";
import {browser, by, element} from "protractor";
import {ResultsPage} from "./pages/results-page";
import {CurrentPage} from "./helpers/current-page";

let loadingTimeout = 5000;

function rand(min: number, max: number): number {
    return (Math.random() * (max - min + 1) | 0) + min;

}


function isThereMoreThanZeroResults(searchParameter) {
    return element(by.css('.axr-search-box input')).sendKeys(searchParameter).then(() => {
        return element(by.css('.axr-search-box__icon-search')).click().then(() => {
            return browser.sleep(loadingTimeout).then(() => {
                return element(by.css('.results-filter div div span')).getText().then((resultElement) => {
                    let result: number = parseInt(resultElement.split(' ', 2)[1]);
                    if (result > 0) {
                        return true;
                    } else {
                        return false;
                    }
                })
            })
        })
    })
}

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

    it('Search for existing artist. Expect more than 0 results', () => {
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Filters Verification - Filter: Genres, SubFilter:Pop', () => {
        let filterType = 'Genres';
        let filterSubtype = 'Pop';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Filters Verification - Filter: Genres, SubFilter:Classical', () => {
        let filterType = 'Genres';
        let filterSubtype = 'Classical';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Filters Verification - Filter: Artists, SubFilter:David Bowie', () => {
        let filterType = 'Artists';
        let filterSubtype = 'David Bowie';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Filters Verification - Filter: Product types, SubFilter:Album', () => {
        let filterType = 'Product types';
        let filterSubtype = 'Album';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.verifyFilteringFunctionality(filterType, filterSubtype).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });

    it('Multiple Filters Verification - Filter: Product types&Genres, SubFilter:Album&Pop', () => {
        let filterType1 = 'Genres';
        let filterType2 = 'Genres';
        let filterSubtype1 = 'Classical';
        let filterSubtype2 = 'Pop';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.multipleFiltersVerification(filterType1, filterType2, filterSubtype1, filterSubtype2).then((filteringVerified) => {
                expect(filteringVerified).toBeTruthy();
            })

        });
    });


    it('Search for non-existing artist. Expect 0 results', () => {
        let artistName = 'gfsgsdgsgfsgfdgsdgsfgsfgsfgsgsfgg';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });

    it('Search by existing ISRC. Expect more than 0 results', () => {
        let isrc = 'USNRS1434135';
        isThereMoreThanZeroResults(isrc).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });


    it('Search for non-existing ISRC. Expect 0 results', () => {
        let isrc = 'USNRS143B135';
        isThereMoreThanZeroResults(isrc).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });

    it('Search by existing Song. Expect more than 0 results', () => {
        let song = 'White horse';
        isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Attempt SQL injection', () => {
        let song = 'or \'1\'=\'1 ';
        isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Test Short string search,Expect that she search does not execute', () => {
        let shortString = 'a';
        CurrentPage.getPageTitle().then((initialPageTitle) => {
            fillSearchFormAndClickSearch(shortString).then(() => {
                CurrentPage.getPageTitle().then((afterSearchPageTitle) => {
                })
            })
        })

    });

    it('Test Chinease Han Characters string search. Expect 0 results', () => {
        let song = '漢字';
        isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });

    it('Test is there a max number of characters in search string. Expect that the search limits the searched string size', () => {
        let song = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
        isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeFalsy();
        });
    });


});
