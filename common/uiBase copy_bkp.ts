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

    async validateLoginPage({ page, url }: NavigationParams): Promise<void> {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
    },
    async validatemenuItems({ page }: NavigationParams): Promise<void> {
        const menuItems = await this.assertMenu({ page })
        await expect(await page.locator(homePage.homePageMenu)).not.toHaveCount(0)
        for (let i = 0; i <= menuItems.lenght; i++) {
            expect(await menuItems[i].isVisible()).toBeTruthy();
        }
    },

    async loginPage({ page, url }: NavigationParams): Promise<void> {
        await this.validateLoginPage({ page, url });
        await page.fill(adminPage.user_name, testData.loginPayLoad.username);
        await page.fill(adminPage.password, testData.loginPayLoad.password);
        await page.click(adminPage.login_button);
        await expect(page).toHaveURL(testData.loginPayLoad.logInAssert);
        // await expect(page.locator('#dBoardDiv > div > .align-items-center')).toBeVisible();
        // await page.locator('#dBoardDiv > div > .align-items-center').click();
        // await expect(page.locator('#collapseSideNav')).toContainText('Hub Registration');
        // await page.getByRole('button', { name: 'Hub Registration' }).click();
        // await expect(page.getByRole('button', { name: '+ Register Hub' })).toBeVisible();
        await page.pause();
    },

    async logOut({ page, url }: NavigationParams): Promise<void> {

        // await this.validateLoginPage({ page});
        // await page.fill(adminPage.user_name, testData.loginPayLoad.username);
        // await page.fill(adminPage.password, testData.loginPayLoad.password);
        // await page.click(adminPage.login_button);
        // await page.pause();
        // await page.click(adminPage.logout_click);
        // await page.click(adminPage.logout)
        // await page.getByRole('button', { name: 'Anshika Mishra' }).click();
        // await expect(page.getByRole('button', { name: 'Anshika Mishra' })).toBeVisible();
        // await page.getByRole('button', { name: 'Logout' }).click();
        // await page.getByRole('button', { name: 'Anshika Mishra' }).click();
        // await expect(page.getByRole('button', { name: 'Anshika Mishra' })).toBeVisible();
        // await page.getByRole('button', { name: 'Logout' }).click();
        // await page.click(adminPage.logout_button1);
        // await expect(page.getByRole('button', { name: 'Anshika Mishra' })).toBeVisible();
        // await page.locator(adminPage.logout_drop);
        // await page.getByText('Logout').click();
        await page.locator(adminPage.logout_drop1).click();
        // await page.getByText(testData.logOut.name).first().click();
        // await expect(page.getByText(testData.logOut.name)).toBeVisible();
        await expect(page.locator(adminPage.logout_drop1)).toBeVisible();
        await page.getByText(testData.logOut.logout).click();
        // await expect(page).toHaveURL('login');
        await expect(page).toHaveURL(testData.logOut.logOutAssert);


        // await page.pause();
    },
    async huRegistration({ page, url }: NavigationParams): Promise<void> {

        // await page.locator('#dBoardDiv > div > .align-items-center').click();
        await page.locator(adminPage.dashBoard).click();
        // await page.getByRole('button', { name: 'Hub Registration' }).click();
        await page.getByRole('button',{name: testData.hubRegister.hub}).click();
        await expect(page.getByRole('button', { name: '+ Register Hub' })).toBeVisible();
        await expect(page.getByRole('button', { name: '+ Register Hub' })).toBeVisible();
        await page.getByRole('button', { name: '+ Register Hub' }).click();
        await expect(page.getByPlaceholder('Enter Hub Name')).toBeVisible();
        await page.getByPlaceholder('Enter Hub Name').click();
        await page.getByPlaceholder('Enter Hub Name').fill('demo1');
        await expect(page.getByLabel('Basic Details').locator('form')).toContainText('Select Hub Type Hub Virtual Hub');
        await page.getByRole('combobox').first().selectOption('Hub');
        await page.getByRole('combobox').nth(1).selectOption('2013');
        await page.getByPlaceholder('Enter Vision').click();
        await page.getByPlaceholder('Enter Vision').fill('xyz');
        await page.getByPlaceholder('Enter Mission').click();
        await page.getByPlaceholder('Enter Mission').fill('NA');
        await page.getByPlaceholder('Enter Office Contact Number').click();
        await page.getByPlaceholder('Enter Office Contact Number').fill('9876543210');
        await page.locator('#button-addon').click();
        await page.getByPlaceholder('Select Person In-charge').click();
        await page.locator('#button-addon').click();
        await page.getByLabel('Find Person In-charge').click();
        await expect(page.locator('#cdk-step-label-0-1')).toContainText('Agreement/MOU Attachment');
        await expect(page.getByText('Agreement/MOU Attachment')).toBeVisible();
        await expect(page.getByRole('tab', { name: 'Agreement/MOU Attachment' })).toBeVisible();
        await expect(page.locator('#cdk-step-label-0-1')).toContainText('Agreement/MOU Attachment');
        await page.getByText('Agreement/MOU Attachment').click();
        await page.getByRole('heading', { name: 'Preview' }).getByRole('button').click();
        await page.getByRole('button', { name: 'Submit' }).click();
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



