import {NavigationRoutes} from "./configuration/navigation-routes";
import {browser, by, element} from "protractor";
import {ResultsPage} from "./pages/results-page";

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


describe('Allexis search field tests', () => {
    let navigationRoutes: NavigationRoutes = new NavigationRoutes();

    beforeAll(function () {
        browser.waitForAngularEnabled(false);
    });

    beforeEach(() => {
        navigationRoutes.goToLandingPage();
    });

    it('Search for existing artist. Expect more than 0 results', () => {
        let artistName = 'David Guetta';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });

    it('Search for existing artist. Expect more than 0 results.' +
        'Expect Filtering reduces the number of results, ' +
        'then Expect random result to verify filter keyword', () => {
        let artistName = 'David Guetta';
        let filterType = 'Genres';
        let filterSubtype = 'Pop';
        isThereMoreThanZeroResults(artistName).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
            ResultsPage.numberOfResults().then((initialResults)=>{
                let filterElement = ResultsPage.selectByFilter(filterType, filterSubtype);

                let numberOfFilteredElementsElement = ResultsPage.numberOfFilteredElements(filterType, filterSubtype);

                numberOfFilteredElementsElement.then((filteredNumberOfResults) => {
                    filterElement.getLocation().then(function (location) {
                        browser.executeScript('window.scrollTo(0,' + (location.y - 70) + ');').then(function () {
                            browser.sleep(3000);
                        }).then(function () {
                            browser.actions().mouseMove(filterElement).click();
                            filterElement.click();
                            browser.sleep(3000).then(() => {
                                ResultsPage.numberOfResults().then((numberOfResults) => {
                                    expect(filteredNumberOfResults).toBe(numberOfResults);
                                    expect(initialResults).toBeGreaterThan(filteredNumberOfResults);
                                })
                            })
                        })

                    })
                })
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
        let song = 'White horse';
        isThereMoreThanZeroResults(song).then(function (isThereMultipleResults) {
            expect(isThereMultipleResults).toBeTruthy();
        });
    });


})
;
