import {browser, by, element} from "protractor";

export class ResultsPage {
    static totalNumberOfFilteredElements = 0;

    public static selectByFilter(selectedFilter, subfilter) {
        return element(by.cssContainingText('.ax-aggregator', selectedFilter))
            .element(by.cssContainingText('li', subfilter))
            .element(by.css('input'));
    }

    public static numberOfFilteredElements(selectedFilter, subfilter) {
        let numberOfFilteredElements;
        return element(by.cssContainingText('.ax-aggregator', selectedFilter))
            .element(by.cssContainingText('li', subfilter)).getText().then((filteredElement) => {
                    numberOfFilteredElements = filteredElement.toString();
                    numberOfFilteredElements = numberOfFilteredElements.substring(numberOfFilteredElements.indexOf('(') + 1,
                        numberOfFilteredElements.indexOf(')'));
                    return parseInt(numberOfFilteredElements);
                }
            )
    }

    public static numberOfResults() {
        return element(by.css('.fake-btn-link.pull-left')).getText().then((searchResultCount) => {
            return parseInt(searchResultCount.split(" ")[1]);
        })
    }

    public static verifyFilteringFunctionality(filterType, filterSubtype) {
        return ResultsPage.numberOfResults().then((initialResults) => {
            let filterElement = ResultsPage.selectByFilter(filterType, filterSubtype);

            return this.clickFilter(filterType, filterSubtype, filterElement).then(() => {
                return ResultsPage.numberOfResults().then((numberOfResults) => {
                    return (this.totalNumberOfFilteredElements == numberOfResults) && (initialResults > this.totalNumberOfFilteredElements);
                })

            });
        })
    }

    static addElementsToTotal(numberOfFilteredElements) {
        this.totalNumberOfFilteredElements += numberOfFilteredElements;
    }

    static clickFilter(filterType, filterSubtype, filterElement1) {
        return ResultsPage.numberOfFilteredElements(filterType, filterSubtype).then((filteredNumberOfResults) => {
            this.addElementsToTotal(filteredNumberOfResults);
            return filterElement1.getLocation().then(function (location) {
                return browser.executeScript('window.scrollTo(0,' + (location.y - 70) + ');').then(() => {
                    browser.sleep(3000)
                }).then(function () {
                    browser.actions().mouseMove(filterElement1).click();
                    filterElement1.click();
                    return browser.sleep(3000)
                });
            })
        })

    }

    static multipleFiltersVerification(filterType1: string, filterType2: string, filterSubtype1: string, filterSubtype2: string) {
        return ResultsPage.numberOfResults().then((initialResults) => {
            let filterElement1 = ResultsPage.selectByFilter(filterType1, filterSubtype1);
            let filterElement2 = ResultsPage.selectByFilter(filterType2, filterSubtype2);

            return this.clickFilter(filterType1, filterSubtype1, filterElement1).then(() => {
                return this.clickFilter(filterType2, filterSubtype2, filterElement2).then(() => {
                    return ResultsPage.numberOfResults().then((numberOfResults) => {
                        return (numberOfResults < initialResults)
                            && (this.totalNumberOfFilteredElements == numberOfResults);
                    });
                })
            })
        })

    }

}

