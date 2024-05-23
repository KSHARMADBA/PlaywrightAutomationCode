
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { uiCommonUtils } from "../../utils/uiCommonMethodModule";
import fs from 'fs';


setDefaultTimeout(60 * 1000);
const testSpec = uiCommonUtils.uiBase.applicationHome;
const url = "https://dbyar-ui-sit1.graytree-ea1769cb.eastasia.azurecontainerapps.io/";

Given('the user is on the DBYaR homepage', async function () {
  try {
    await testSpec.validateHomePage({ page: this.page, url });
  } catch (error) {
    console.error("Error occurred during application loading:", error);
    throw error; // Rethrow the error to fail the step
  }
});

When('the user registers to the hub with {string}', async function (hub_name) {
  try {
    console.log("Attempting to register to the hub with name:", hub_name);
    await testSpec.hubRegistration(this.page, hub_name);
    console.log("User registration to the hub is successful for:", hub_name);
  } catch (error) {
    console.error("Error occurred during hub registration:", error);
    throw error; // Rethrow the error to fail the step
  }
});

Then('the user logs out', async function () {
  await testSpec.logOut;
});

When('the user logs in {string}', async function (userlogin) {
  try {
    console.log("Attempting login with email:", userlogin);
    // await testSpec.loginPage(this.page, userlogin );
    await testSpec.loginPage(this.page, userlogin);
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error; // Rethrow the error to fail the step
  }
});