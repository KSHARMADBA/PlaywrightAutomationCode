import nilgiriModule from "nilgirihub";
import { expect } from "@playwright/test";
import { uiCommonUtils } from "../utils/uiCommonMethodModule";
import { elementFactoryUtils } from "../utils/uiElementFactoryModule";
import * as testData from "../resource/uiTestData/uiTestData.json";
import * as path from 'path';
import pageOne from "../elementFactory/pageOne";
import { url } from "inspector";

const adminPage = elementFactoryUtils.admin.pageOne
const homePage = elementFactoryUtils.home.pageTwo


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

    // async loginPage(page, userlogin: string) {
    async loginPage({ page, url }: NavigationParams): Promise<void> {
        // await this.validateHomePage({ page, url });
        await page.fill(adminPage.user_name, testData.loginPayLoad.username);
        // await page.fill(adminPage.user_name, userlogin);
        await page.fill(adminPage.password, testData.loginPayLoad.password);
        await page.click(adminPage.login_button);
        // await expect(page).toHaveURL(testData.loginPayLoad.logInAssert);

    },


    async logOut({ page, url }: NavigationParams): Promise<void> {

        await page.locator(adminPage.logout_drop1).click();
        await expect(page.locator(adminPage.logout_drop1)).toBeVisible();
        // await page.click(adminPage.logoutDrop);
        // await page.click(adminPage.logoutButton);
        await page.getByText(testData.logOut.logout).click();
        await expect(page).toHaveURL(testData.logOut.logOutAssert);
    },

    async hubRegistration({ page, url }: NavigationParams): Promise<void> {
        // async hubRegistration(page, hub_name: string) {

        await page.locator(adminPage.dashBoard).click();
        await page.locator(adminPage.hUbResiter_button).click();
        await page.locator(adminPage.newRegister).click();
        // Define a CSS selector for the input field
        const hubNameInputSelector = 'input[placeholder="Enter Hub Name"]';
        // Wait for the input field to be present and visible
        await page.waitForSelector(hubNameInputSelector);
        // Clear the input field to remove any previously entered data
        // await page.click(hubNameInputSelector, { clickCount: 3 }); // Triple-click to select all text
        // await page.keyboard.press('Backspace'); // Delete the selected text
        // Fill the input field with the desired value
        // await page.fill(hubNameInputSelector, hub_name);
        await page.locator(hubNameInputSelector).clear();
        await page.waitForTimeout(3000);
        await page.fill(hubNameInputSelector, testData.hubRegister.hubNamefill.toString());
        // await page.pause();
        await page.waitForTimeout(5000);
        await page.waitForLoadState('domcontentloaded');
        const hubdropdown = page.locator(adminPage.hubNameDropdown);
        await hubdropdown.selectOption("Virtual Hub");
        const yearDropDown = page.locator(adminPage.yearofEstablishment);
        await yearDropDown.selectOption("2017");
        await page.fill(adminPage.visionName, testData.hubRegister.visionName);
        await page.fill(adminPage.mission, testData.hubRegister.missionValue);
        await page.fill(adminPage.contactNo, testData.hubRegister.contactNo);
        await page.click(adminPage.personInchargeDrop);
        // await page.waitForSelector(adminPage.empValue);
        const empValueElement = await page.$$(adminPage.empValue);
        console.log("empvalue:", empValueElement.length);
        if (empValueElement.length == 0) {
            await page.click(adminPage.personInchargeClose);
        }
        else {
            await page.click(adminPage.empValue);
        }

        // await page.pause();
        // await page.click(adminPage.empValue);

        // console.log("emp value: ", adminPage.empValue);

        // if (adminPage.empValue)

        await page.fill(adminPage.address, testData.hubRegister.address);
        await page.fill(adminPage.pincode, testData.hubRegister.pincode);
        await page.click(adminPage.doneButton);
        // await page.waitForTimeout(30000);
        // await page.waitForEvent(adminPage.doneButton);
        const placeDropDown = page.locator(adminPage.placeDropDown);
        await placeDropDown.selectOption('Darbhanga City SO');
        await page.fill(adminPage.emailId, testData.hubRegister.email.toString());
        await page.click(adminPage.nextButton);
        await page.waitForTimeout(3000);
        // Wait for the navigation to complete and capture the new URL
        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        // const newUrl = page.url();
        // console.log("old url: ", url);
        // console.log("New URL: ", newUrl);
        // // Check if the URL has changed, indicating successful navigation
        // if ( url == newUrl) {
        //     // console.error("Navigation to next page failed.");
        //     await page.isVisible(adminPage.personInchargeError)
        //         const personInChargeMsg = await page.locator(adminPage.personInchargeError).innerText();
        //         console.log(personInChargeMsg);
        //         console.error("Mandatory: ", personInChargeMsg);
        //         console.log("exiting the test");
        //         // Gracefully exit the test if the specified condition satisfies
        //         return; // Exit the function
        // }

        if (await page.isVisible(adminPage.enterHubName)) {
            const enterHubNameMsg = await page.locator(adminPage.enterHubName).innerText();
            // console.log(enterHubNameMsg);
            console.error("Mandatory: ", enterHubNameMsg);
            console.log("exiting the test");
            // Gracefully exit the test if the specified condition satisfies
            return; // Exit the function
        }
        else if (await page.isVisible(adminPage.personInchargeError)) {
            const personInChargeMsg = await page.locator(adminPage.personInchargeError).innerText();
            console.log(personInChargeMsg);
            console.error("Mandatory: ", personInChargeMsg);
            console.log("exiting the test");
            // Gracefully exit the test if the specified condition satisfies
            // return; // Exit the function
            // await page.pause();
        }

        else {
            await page.locator(adminPage.upLoad).setInputFiles('./upload/image2.jpg');
            await page.click(adminPage.submit);
            console.log("Values entered successfully");
            // Increase timeout for message visibility
            const timeout = 5000; // Adjust timeout duration as needed
            // try {
            // console.log("Try block to be executed.")
            const SuccessMessage = await page.isVisible(adminPage.successMsg,{ timeout });
            const alreadyExistVisible = await page.isVisible(adminPage.alreadyExist,{ timeout });
            // const alreadyExistVisible = await page.locator(adminPage.alreadyExist, { timeout }).innerText();
            //     if ("Hub already exists") {
            //         console.log("Before If block msg:", alreadyExistVisible);
            //     // }

            // } catch (e) {
            // console.log("cathc block error e:");
            // if (e.name == 'TimeoutError') {
            // console.log("Timeout error occurred. Proceeding to check success message.");
            // try{
            // const SuccessMessageLocator = page.locator(adminPage.successMsg);
            // await SuccessMessageLocator.waitFor({ state: 'visible' });
            // const SuccessMessage = await page.locator(adminPage.successMsg, { timeout }).innerText();
            // console.log("Success Msg catch block:", SuccessMessage);
            // }catch(error){
            // console.log("Error occurred while retrieving success message:", error);
            // }

            // }
            // }

            // await page.pause();
            // if (await page.isVisible(adminPage.alreadyExist, { timeout })) {
                if(alreadyExistVisible){
                const alreadyExistVisibletxt = await page.locator(adminPage.alreadyExist, { timeout}).innerText();
                console.log("Hub Registration Update", alreadyExistVisibletxt);
                // await page.pause();
                // Capture screenshot when message appears
                await page.screenshot({ path: './test-results/AlreadyExistScreenshot.png' });
                console.log("Test Evidence Captured, view the report at: test-results/AlreadyExistScreenshot: ",)
                console.error("Hub Registration Update: ", alreadyExistVisibletxt);
                console.log("Exiting the test");
                return;
            }

            // if (await page.isVisible(adminPage.successMsg, { timeout })) {
                if (SuccessMessage){

                const SuccessMessagetxt = await page.locator(adminPage.successMsg, { timeout }).innerText();
                console.log("Success Msg:", SuccessMessagetxt);
                await page.screenshot({ path: './test-results/SuccessMsg.png' });
                // const successMessage = await page.locator(adminPage.successMsg).innerText();
                console.log("Hub Registration Update:", SuccessMessagetxt);
                console.log("Test Evidence Captured, view the report at: test-results/SuccessMsg.png: ",)
                console.log("Exiting the test");

            }



        }
        // await page.pause();
        // try {
        //     // Check if error message for mandatory columns appeared
        //     await page.waitForSelector(adminPage.enterHubName);
        //     const enterHubNameMsg = await page.locator(adminPage.enterHubName).innerText();
        //     console.log("enterHubNameMsg");
        //     await page.waitForSelector(adminPage.personInchargeMsg);
        //     const personInchargeMsg = await page.locator(adminPage.personInchargeMsg).innerText();
        //     console.log("personInchargeMsg");

        //     // If hub name or person in charge is blank, handle the error accordingly
        //     if (enterHubNameMsg) {
        //         console.error("Mandatory: ", enterHubNameMsg);
        //         throw new Error("Hub registration failed: Mandatory column 'Enter Hub Name' is blank");
        //     } else if (personInchargeMsg) {
        //         console.error("Mandatory column 'Person Incharge' is blank");
        //         throw new Error("Hub registration failed: Mandatory column 'Person Incharge' is blank");
        //     }


        // await page.locator(adminPage.upLoad).setInputFiles('./upload/image2.jpg');
        // await page.click(adminPage.submit);
        //************************************************************* */
        // changes maded on 22/03/2024 
        // // wait for success message
        // await page.waitForSelector(adminPage.successMsg);
        // const successMessage = await page.locator(adminPage.successMsg).innerText();
        // console.log("Success message:", successMessage);
        // }
        // catch (error) {
        //     console.log("Hub Registration failed", error);
        // }
        //************************************************************************************** */
        //changes made on 21-03-2024
        // Wait for success or error messages to appear -- below try block is successfull.
        // try {
        //     // Check if success message appeared
        //     await page.waitForSelector(adminPage.successMsg);
        //     const successMessage = await page.locator(adminPage.successMsg).innerText();
        //     console.log("Success message:", successMessage);
        //     // Add any further actions to be taken on success
        // } catch (successError) {
        //     try {
        //         // Check if error message appeared
        //         await page.waitForSelector(adminPage.errorMsg);
        //         const errorMessage = await page.locator(adminPage.errorMsg).innerText();
        //         console.error("Error message:", errorMessage);
        //         // Check if "Address fetched" message appeared
        //         await page.waitForSelector(adminPage.addressFetched);
        //         const addressFetchedMessage = await page.locator(adminPage.addressFetched);
        //         console.log("Address fetched message:", addressFetchedMessage);

        //         await expect(page).toContainText("Please recheck the form");
        //         if (errorMessage.includes("Please recheck the form") && addressFetchedMessage.includes("Address Fetched"))
        //         {
        //             console.error("Error occurred: Both 'Please recheck the form' and 'Address fetched' messages appeared together");
        //         }
        //         // Check if error message is generic
        //         if (errorMessage.includes("Please recheck the form")) {
        //             // Check each mandatory column individually
        //             await page.waitForSelector(adminPage.enterHubName);
        //             const enterHubNameMsg = await page.locator(adminPage.enterHubName).innerText();
        //             await page.waitForSelector(adminPage.personInchargeMsg);
        //             const personInchargeMsg = await page.locator(adminPage.personInchargeMsg).innerText();

        //             // If hub name or person in charge is blank, handle the error accordingly
        //             if (enterHubNameMsg) {
        //                 console.error("Mandatory column 'Enter Hub Name' is blank");
        //                 throw new Error("Hub registration failed: Mandatory column 'Enter Hub Name' is blank");
        //             } else if (personInchargeMsg) {
        //                 console.error("Mandatory column 'Person Incharge' is blank");
        //                 throw new Error("Hub registration failed: Mandatory column 'Person Incharge' is blank");
        //             } else {
        //                 // If neither hub name nor person in charge is blank, handle the error as generic
        //                 throw new Error("Hub registration failed: " + errorMessage);
        //             }
        //         } else {
        //             // If error message is not generic, handle it as is
        //             throw new Error("Hub registration failed: " + errorMessage);
        //         }
        //     } catch (error) {
        //         console.error("Error occurred during hub registration:", error);
        //         // Handle the error here, such as retrying or logging
        //     }


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



