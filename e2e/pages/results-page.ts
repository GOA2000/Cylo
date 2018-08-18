import {by, element} from "protractor";

export class ResultsPage {

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
                    return numberOfFilteredElements;
                }
            )
    }

    public static numberOfResults() {
        return element(by.css('.fake-btn-link.pull-left')).getText().then((searchResultCount) => {
            return searchResultCount.split(" ")[1];
        })
    }
}

