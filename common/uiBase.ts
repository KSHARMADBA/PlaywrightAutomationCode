import nilgiriModule from "nilgirihub";
import  { test, expect } from "@playwright/test";
import { uiCommonUtils } from "../utils/uiCommonMethodModule";
import { elementFactoryUtils } from "../utils/uiElementFactoryModule";
import * as testData from "../resource/uiTestData/uiTestData.json";
import * as personJsonData from "../resource/MacroTestData/userData.json";
import * as path from 'path';
import pageOne from "../elementFactory/pageOne";
import { url } from "inspector";
import { generateRandomPhoneNumber, getRandomTestData, generateRandomHubData } from "./randomData";
import { TIMEOUT } from "dns";

const adminPage = elementFactoryUtils.admin.pageOne
const homePage = elementFactoryUtils.home.pageTwo

type PersonData = {
    Full_Name: string;
    Contact_No: string;
    Email: string;
};

// const personData = getRandomTestData(personJsonData.userData);
//creating const for person incharge
const personData = personJsonData.userData;

interface NavigationParams {
    page?: any;
    url?: string;

}
const applicationHome = {

    async validateHomePage({ page, url }: NavigationParams): Promise<void> {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    },
    async validatemenuItems({ page }: NavigationParams): Promise<void> {
        const menuItems = await this.assertMenu({ page })
        await expect(await page.locator(homePage.homePageMenu)).not.toHaveCount(0)
        for (let i = 0; i <= menuItems.lenght; i++) {
            expect(await menuItems[i].isVisible()).toBeTruthy();
        }
    },

    async loginPage(page, userlogin: string) {
        // async loginPage({ page, url }: NavigationParams): Promise<void> {
        // await this.validateHomePage({ page, url });
        // await page.fill(adminPage.user_name, testData.loginPayLoad.username);
        await page.fill(adminPage.user_name, userlogin);
        await page.fill(adminPage.password, testData.loginPayLoad.password);
        await page.click(adminPage.login_button);
        // await expect(page).toHaveURL(testData.loginPayLoad.logInAssert);
        const timeout = 5000
        if (await page.isVisible(adminPage.loginSuccess, { timeout })) {
            // await page.pause();
            const loginSuccessMsg = await page.locator(adminPage.loginSuccess).innerText();
            // console.log(loginSuccessMsg);
            console.log("Login to the application with user id: ", "'", userlogin, "'", ":", loginSuccessMsg);

        }

    },


    async logOut({ page, url }: NavigationParams): Promise<void> {

        await page.locator(adminPage.logout_drop1).click();
        await expect(page.locator(adminPage.logout_drop1)).toBeVisible();
        // await page.click(adminPage.logoutDrop);
        // await page.click(adminPage.logoutButton);
        await page.getByText(testData.logOut.logout).click();
        await expect(page).toHaveURL(testData.logOut.logOutAssert);
    },
    // Define method for Hub Registration

    // Define an asynchronous function for hub registration, accepting 'page' and 'hub_name' as parameters

    // async hubRegistration({ page, url }: NavigationParams): Promise<void> {
    async hubRegistration(page, hub_name: string)  { // to pass execution argument
        const registrationData = generateRandomHubData();
        // const pincodeData = getRandomTestData(testData.hubRegister.pincode);

        // Click on the dashboard link
        await page.waitForTimeout(6000);
        await page.locator(adminPage.dashBoard).click();
        // Click on the hub register button
        await page.locator(adminPage.hUbResiter_button).click();
        // Click on the new register button
        await page.locator(adminPage.newRegister).click();
        // Define a CSS selector for the input field
        const hubNameInputSelector = 'input[placeholder="Enter Hub Name"]';
        // Wait for the input field to be present and visible
        await page.waitForSelector(hubNameInputSelector);
        // Fill the input field with the desired value
        await page.fill(hubNameInputSelector, hub_name);
        // Clear the input field
        await page.locator(hubNameInputSelector).clear();
        await page.waitForTimeout(3000);
        // Fill the input field with the hub name again
        await page.fill(hubNameInputSelector, hub_name);
        await page.waitForTimeout(5000);
        await page.waitForLoadState('domcontentloaded');
        const hubdropdown = page.locator(adminPage.hubNameDropdown);
        await hubdropdown.selectOption("Virtual Hub");
        const yearDropDown = page.locator(adminPage.yearofEstablishment);
        // await yearDropDown.selectOption("2019");
        // select a random year from the drop-down
        const yearOptions = await yearDropDown.evaluate((dropdown: any) => {
            return Array.from(dropdown.options)
                .map((option: any) => option.textContent)
                .filter((text: string | null, index: number) => index !== 0 && text !== null && text.trim() !== ""); // Filter out null and empty options and the first option
        });

        // Select a random option if there are any options left
        if (yearOptions.length > 0) {
            const randomYearIndex = Math.floor(Math.random() * yearOptions.length);
            await yearDropDown.selectOption({ index: randomYearIndex + 1 }); // Add 1 to the index to skip the first option
        } else {
            console.error("No valid options found in the year dropdown");
        }
        // fill all the attributes 
        await page.fill(adminPage.visionName, registrationData.visionName);
        await page.fill(adminPage.mission, registrationData.missionValue);
        await page.fill(adminPage.contactNo, registrationData.contactNo);
        await page.click(adminPage.personInchargeDrop);

        // Find all elements matching the 'empValue' selector on the page

        const empValueElement = await page.$$(adminPage.empValue);
        console.log("empvalue:", empValueElement.length);

        // If no 'empValue' elements are found, click on the 'personIncharge Close' button

        if (empValueElement.length == 0) {
            await page.click(adminPage.personInchargeClose);
        }
        // If 'empValue' elements are found, click on the first one
        else {
            await page.click(adminPage.empValue);
        }

        await page.fill(adminPage.address, registrationData.address);
        await page.fill(adminPage.pincode, testData.hubRegister.pincode);
        await page.click(adminPage.doneButton);
        await page.waitForTimeout(2000);
        const placeDropDown = page.locator(adminPage.placeDropDown);
        // await placeDropDown.selectOption('Darbhanga City SO');

        // Evaluate and retrieve options from the place dropdown list, excluding the first empty option

        const placeOptions = await placeDropDown.evaluate((dropdown: any) => {
            return Array.from(dropdown.options)
                .map((option: any) => option.textContent)
                .filter((text: string | null, index: number) => index !== 0 && text !== null && text.trim() !== ""); // Filter out null and empty options and the first option
        });

        // Select a random option from the place dropdown list if there are any options available

        if (placeOptions.length > 0) {
            const randomPlaceIndex = Math.floor(Math.random() * placeOptions.length);
            await placeDropDown.selectOption({ index: randomPlaceIndex + 1 }); // Add 1 to the index to skip the first option
        } else {
            console.error("No valid options found in the place dropdown");
        }
        await page.fill(adminPage.emailId, registrationData.email.toString());
        await page.click(adminPage.nextButton);
        await page.waitForTimeout(3000);

        // New code for hub name validation- Check Field level validation
        if (await page.isVisible(adminPage.enterHubName)) {
            const hubNameValidationMsg = await page.locator(adminPage.hubNameError).innerText();
            // Scroll up on the page using keyboard input
            await page.keyboard.press('Home');  
            await page.waitForTimeout(5000);       
            const inputValue = hub_name;
            console.log("input value:", inputValue);
            await page.keyboard.press('Home');
            let expectedErrorMessage: string;
            // Check if input value exceeds 200 characters
            if (inputValue.length > 200) {
                expectedErrorMessage = "Input is exceeding 200 characters limit";


            } else if ((inputValue.trim()).length === 1) {
                // Check if input value has only one character
                expectedErrorMessage = "Please enter more than one character";
                console.log("inside loop2: ", expectedErrorMessage);

            } else if (inputValue.startsWith(' ') || inputValue.endsWith(' ')) {
                // Check if input value contains leading or trailing spaces
                expectedErrorMessage = "Space cannot be first or last character";

            }
            else if ((inputValue.trim()).length === 0) {
                // Check if input value is blank
                expectedErrorMessage = "Please enter hub name"

            }
            if (hubNameValidationMsg === expectedErrorMessage) {
                await page.keyboard.press('Home'); 
                console.log("\n Hub name validation passed with expected error message:", expectedErrorMessage);
            }
            if (hubNameValidationMsg !== expectedErrorMessage) { //expected
                await page.keyboard.press('Home');
                console.error("Hub name validation failed. Expected error message:", expectedErrorMessage, "\n but Actual Error Message Found:", hubNameValidationMsg);
                console.error("Please raise a defect");
                test.fail(); // actual
                 // when if conditions(expected) satisfies and test.fail(actual) doesn't match the test fails and displays error message as 
                             //Expected to fail, but passed.   

                return; // Exit the function

            }
        }

        // Check if an error message for entering hub name is visible

        // if (await page.isVisible(adminPage.enterHubName) && (inputValue.trim()).length === 0) {
        //     const enterHubNameMsg = await page.locator(adminPage.enterHubName).innerText();
        //     // Scroll up on the page using keyboard input
        //     await page.keyboard.press('Home');

        //     // Wait for a brief moment to ensure scrolling is complete
        //     await page.waitForTimeout(3000); // Adjust the timeout as needed

        //     console.error("Hub Registration with: ", hub_name, "failed due to error:", enterHubNameMsg);
        //     console.log("exiting the test");
        //     // Gracefully exit the test if the specified condition satisfies
        //     return; // Exit the function
        // }
        // Check if an error message for person in charge is visible

        else if (await page.isVisible(adminPage.personInchargeError)) {
            const personInChargeMsg = await page.locator(adminPage.personInchargeError).innerText();
            console.log(personInChargeMsg);
            console.error("Hub Registration with: ", hub_name, "failed due to error:", personInChargeMsg);
            console.log("exiting the test");

        }

        else {
            // Upload a file using the 'upLoad' locator, file is placed under given folder location.

            await page.locator(adminPage.upLoad).setInputFiles('./upload/image2.jpg');
            await page.click(adminPage.submit);
            console.log("Values entered successfully");
            await page.waitForTimeout(5000);
            // Increase timeout for message visibility
            const timeout = 5000; // Adjust timeout duration as needed

            // Check if the success message is visible within the specified timeout duration

            if (await page.isVisible(adminPage.successMsg, { timeout })) {
                // await page.screenshot({ path: './test-results/SuccessMsg.png' });
                const successUpdate = await page.locator(adminPage.successMsg).innerText();
                // Gracefully exit the test if the specified condition satisfies
                console.log("Hub Registration with:", hub_name, successUpdate);
                console.log("exiting the test");

                // return; // Exit the function
                // await page.pause();
            }

            // Check if the 'alreadyExist' message is visible within the specified timeout duration
            if (await page.isVisible(adminPage.alreadyExist, { timeout })) {
                // await page.screenshot({ path: './test-results/alreadyExist.png' });
                const alreadyExistUpdate = await page.locator(adminPage.alreadyExist).innerText();
                console.log("Hub Registration with:", hub_name, "failed due to error:", alreadyExistUpdate);
                // Gracefully exit the test if the specified condition satisfies
                console.error("Mandatory: ", alreadyExistUpdate);
                console.log("exiting the test");

            }
        }
    },

    // method for staff registration module using excel macro

    async staffRegistrationwithJson({ page }: NavigationParams): Promise<void> {
        // const personJsonData = personData;

        await page.locator(adminPage.adminPannel).click();
        //Click on the staff registration link
        await page.locator(adminPage.staffRegistration).click();
        // Click on the register staff button
        await page.locator(adminPage.registerStaffButton).click();

        // Select a random option from the dropdown
        await page.click(adminPage.memberType);
        // Find the checkbox element by its value attribute
        const checkboxSelector = `input[type="checkbox"][value="Staff"]`;
        const checkbox = page.locator(checkboxSelector);

        // Check if the checkbox exists and is visible
        if (await checkbox.isVisible()) {
            // Click the checkbox to select it
            await checkbox.click();
        } else {
            console.error("Checkbox not found or not visible");
        }
        await page.click(adminPage.memberType);
        await page.waitForTimeout(3000);
        // Fill in the form fields
        //await page.click(adminPage.fullNameInput);
        await page.fill(adminPage.fullname, testData.staffRegisterJson.fullName);
        //await page.pause();
        await page.fill(adminPage.mobileNumberInput, testData.staffRegisterJson.Contact_No);
        await page.fill(adminPage.personalEmailInput, testData.staffRegisterJson.Email);
        await page.click(adminPage.submitButton);
        await page.waitForTimeout(5000);
        //await page.pause();

        if (await page.isVisible(adminPage.successMessageSelector, { TIMEOUT })) {
            const staffSuccessMessage = await page.locator(adminPage.successMessageSelector).innerText();
            console.log('Entered Staff Name is:', "'", testData.staffRegisterJson.fullName, "'", staffSuccessMessage);
        }

        else if

            (await page.isVisible(adminPage.errorMessageSelector, { TIMEOUT })) {
            const staffErrorMessage = await page.locator(adminPage.errorMessageSelector).innerText();
            console.log('Entered Staff Name is:', "'", testData.staffRegisterJson.fullName, "'", staffErrorMessage);
        }

        else console.log('No Error Message Displayed');
    },
    async staffRegistrationMacro({ page }: NavigationParams): Promise<void> {
        console.log("length", personJsonData.userData.length);
        await page.locator(homePage.adminPannel).click();
        await page.locator(homePage.staffRegistration).click();
        for (let i = 0; i < personJsonData.userData.length; i++) {

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
            await page.locator(adminPage.fullname).clear();
            await page.fill(adminPage.fullname, personData[i].Full_Name);
            await page.locator(adminPage.mobileNumberInput).clear();
            await page.locator(adminPage.aadhar).clear();
            await page.locator(adminPage.disability).clear();
            await page.locator(adminPage.addressStreet).clear();
            await page.fill(adminPage.mobileNumberInput, personData[i].Contact_No);
            await page.locator(adminPage.personalEmailInput).clear();
            await page.fill(adminPage.personalEmailInput, personData[i].Email);
            await page.click(adminPage.submitButton);
            await page.waitForTimeout(5000);

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
                }
            }

            if (!await page.isVisible(adminPage.successMessageSelector, { TIMEOUT })) {
                await page.click(homePage.backButton);
            }
        }


        // const successMessageSelector = '[class="ng-tns-c1-6 toast-message ng-star-inserted"]';
        // const errorMessageSelector = '[class="ng-tns-c1-10 toast-message ng-star-inserted"]';

        // try {
        //     await page.waitForSelector(successMessageSelector, { timeout: 5000 });
        //     await page.screenshot({ path: 'success-message.png' });
        //     console.log("Staff registered successfully");
        // } catch (error) {
        //     try {
        //         await page.waitForSelector(errorMessageSelector, { timeout: 5000 });
        //         console.error("Error registering staff: Duplicate staff");
        //     } catch (error) {
        //         console.error("Error registering staff:", error);
        //     }
        // }
        // return;
    },

    async assertMenu({ page }: NavigationParams): Promise<void> {
        const menuItems = await page.locator(homePage.homePageMenu)
        return menuItems
    },
    async scrollDownToLastOfPage({ page }: NavigationParams): Promise<void> {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    },
    async validateConactUsSection({ page }: NavigationParams): Promise<void> {
        await page.waitForSelector(homePage.conatactUsPagelast, { state: 'visible' });
        const contactUs = await page.locator(homePage.contactUsText).getByText("Contact us");
        expect(contactUs).toBeTruthy();
    }

}
export default { applicationHome }



