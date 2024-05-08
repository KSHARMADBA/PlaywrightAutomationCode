import { readExcel } from "./macro";
import { expect } from "@playwright/test";
import { elementFactoryUtils } from "../utils/uiElementFactoryModule";
import * as testData from "../resource/uiTestData/uiTestData.json";
import * as personJsonData from "../resource/Test Data/userData.json";
import * as path from 'path';
import * as xlsx from 'xlsx';
import { generateRandomPhoneNumber, getRandomTestData, generateRandomHubData } from "./randomData";
import { TIMEOUT } from "dns";

const adminPage = elementFactoryUtils.admin.pageOne
const homePage = elementFactoryUtils.home.pageTwo

const personData = getRandomTestData(personJsonData.userData);
type PersonData = {
    Full_Name: string;
    Contact_No: string;
    Email: string;
};

interface NavigationParams {
    page?: any;
    url?: string;

}
async staffRegistrationExcel({ page }: NavigationParams): Promise < void> {
    console.log("length", personJsonData.userData.length);
    await page.locator(homePage.adminPannel).click();
    await page.locator(homePage.staffRegistration).click();
    for(let i = 0; i <personJsonData.userData.length; i++) {

    await page.locator(homePage.registerStaffButton).click();
    await page.click(adminPage.memberType);
    const checkboxSelector = '[value="Staff"]';
    const checkbox = page.locator(checkboxSelector);

    if (await checkbox.isVisible()) {
        await checkbox.click();
    }
    else {
        console.error("Checkbox not found or not visible");
    }

    await page.click(adminPage.memberType);
    await page.waitForTimeout(3000);
    await page.fill(adminPage.fullname, personJsonData.userData[i].Full_Name);
    await page.fill(adminPage.mobileNumberInput, personJsonData.userData[i].Contact_No);
    await page.fill(adminPage.personalEmailInput, personJsonData.userData[i].Email);
    await page.click(adminPage.submitButton);
    await page.waitForTimeout(5000);

    // const formErrorElements = await page.$$('p.ng-star-inserted');
    // if (formErrorElements.length > 0) {
    //     for (const errorElement of formErrorElements) {
    //         const errorMessage = await errorElement.innerText();
    //         console.log(`Error on form field: ${errorMessage}`);
    //     }
    // }

    if (await page.isVisible(adminPage.successMessageSelector, { TIMEOUT })) {
        const staffSuccessMessage = await page.locator(adminPage.successMessageSelector).innerText();
        console.log('SL.NO.', i, 'Entered Staff Name is:', "'", personData[i].Full_Name, "'", staffSuccessMessage);
    } else if (await page.isVisible(adminPage.errorMessageSelector, { TIMEOUT })) {
        const staffErrorMessage = await page.locator(adminPage.errorMessageSelector).innerText();
        console.log('SL.NO.', i, 'Entered Staff Name is:', "'", personData[i].Full_Name, "'", 'Error displayed:', staffErrorMessage);
    }

    const formErrorElements = await page.$$('p.ng-star-inserted');
    if (formErrorElements.length > 0) {
        for (const errorElement of formErrorElements) {
            const errorMessage = await errorElement.innerText();
            console.log(`Error on form field: ${errorMessage}`);
            // Take a screenshot and log the path
            // const screenshotPath = `error-screenshot-${i}-${errorMessage.replace(/\s+/g, '-')}.png`;
            // await page.screenshot({ path: screenshotPath });
            // console.log(`Screenshot saved: ${screenshotPath}`);
        }
    }

    if (!await page.isVisible(adminPage.successMessageSelector, { TIMEOUT })) {
        await page.click(homePage.backButton);
    }
}
}