import * as constData from "../resource/uiTestData/uiTestData.json";
const pageOne = {
    // define elements for login page

    user_name: 'input[formcontrolname="userName"]',
    password: 'input[formcontrolname="password"]',
    login_button: 'button[class="btn loginPageButton"]',
    loginSuccess: "div[aria-label='Login Success']",

    // define elements for logout option

    //logout_button1: 'button[type="button"]',
    // logout_drop: 'button[class="btn btn-sm dropdown-toggle text-light p-0 mx-1 show"]',
    //logout_drop: 'button[class^="btn btn-sm dropdown-toggle "]',
    // logout_drop1: '//button[contains(text(),"Anshika Mishra")]',
    logout_drop1: '//button[contains(text(),"Austin")]',
    logout_drop2: '//button[contains(text(), constData.logOut.name )]',
    logoutDropDown: '[class="btn btn-sm dropdown-toggle text-light p-0 mx-1 show"]',
    logoutDrop: '.btn.btn-sm.dropdown-toggle.text-light.p-0.mx-1.show',
    logoutButton: "button[class='dropdown-item text-17']",
    logout_click: 'Logout',

    // define page elements for Hub Registration option

    dashBoard: '#dBoardDiv > div > .align-items-center',
    hUbResiter_button: '//div[contains(text(), "Hub Registration")]',//'button', { name: 'Hub Registration' }
    newRegister: '//button[contains(text(), " + Register Hub ")]',
    // huBName:'input[formcontrolname="organizationName"]',//'input[placeholder="Enter Hub Name"]',
    huBName: '//input[@placeholder="Enter Hub Name"]',
    span: 'a span',
    hubNameDropdown: 'select[formcontrolname="typeOfInstitute"]',
    yearofEstablishment: 'select[formcontrolname="yearOfEstablishment"]',
    visionName: 'textarea[placeholder="Enter Vision"]',
    mission: 'textarea[formcontrolname="mission"]',
    contactNo: 'input[placeholder="Enter Office Contact Number"]',
    personInchargeDrop: '#button-addon',
    empValue: '#staticBackdropModalHubRegistration > div > div > div.modal-body.modalBackground > div > div.table-responsive-md.table-responsive-lg > table > tbody > tr:nth-child(1) > td:nth-child(1)',
    address: 'input[formcontrolname="street"]',
    pincode: 'input[formcontrolname="pincode"]',
    doneButton: 'button[id="button-addon2"]',
    placeDropDown: 'select[formcontrolname="place"]',
    emailId: 'input[id="emailId"]',
    attachmentTab: "div[class='mat-step-label'] div[class='mat-step-text-label ng-star-inserted']",
    nextButton: 'span[class="mdc-button__label"]',
    attaChment: "a[href='javascript:void(0)']",
    upLoad: 'input[type="file"]',
    preview: "button[class='btn btn-sm preview-button preview-text roboto-font ms-1 me-1']",
    download: 'i[class="fa fa-download"]',
    submit: '.btn.btn-sm.submit-button.roboto-font.text-17.ms-1',
    errorMsg: "div[aria-label='Please recheck the form']",
    enterHubName: "p[class='ng-star-inserted']",
    personInchargeMsg: "p[class='text-danger']",
    personInchargeError: "div[aria-label='Please select person in-charge']",
    successMsg: "div[aria-label='Hub Registered Successfully']",
    alreadyExist: "div[aria-label='Hub already exists']",
    addressFetched: "div[aria-label='Address Fetched']",
    personInchargeClose: '[class="btn-close"]',

    // define page elements for Hub Registration - Field level validation
    hubNameError: "p[class='ng-star-inserted']",


    // define page elements for Staff Registration option
    
    memberType: '//div[@class="overSelect"]',
    fullNameInput: 'input[placeholder="Enter Full Name"][_ngcontent-kdh-c56]',
    mobileNumberInput: '[placeholder="Enter Mobile Number"]',
    personalEmailInput: '[placeholder="Enter Personal Email"]',
    submitButton: 'button[class="btn btn-sm submit-button roboto-font text-17 ms-1"]',
    fullname: '[placeholder="Enter Full Name"]',
    // successMessageSelector: '[class="toast-top-right toast-container"]',
    successMessageSelector: '[aria-label="Staff Registered Successfully"]',
    errorMessageSelector: '[class="toast-top-right toast-container"]',
    adminPannel: 'img[src="../../../assets/admin_panel/Group.png"]',
    staffRegistration: 'div.font-weight-500:not([role="button"]):has-text("Staff Registration")',
    registerStaffButton: 'button.btn.btn-sm.submit-button.roboto-font.text-17.ms-1.ng-star-inserted',
    // registerStaffButton: 'button[class="btn btn-sm submit-button roboto-font text-17 ms-1"]',

    backButton: '[class="left-arrow"]',
    fatherName: "input[placeholder='Enter Father Name']",
    aadhar: "input[placeholder='Enter Aadhar Number']",
    disability: "input[placeholder='Enter Here']",
    addressStreet: 'input[placeholder="Enter Address /Street"]'









}
export default { pageOne }

