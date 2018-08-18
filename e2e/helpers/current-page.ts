import {browser} from "protractor";

export class CurrentPage{

    public static getPageTitle(){
       return browser.getTitle();
    }

    public static waitForPageToLoad(timeout){
        return browser.sleep(timeout)
    }
}