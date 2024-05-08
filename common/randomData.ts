// phoneUtils.ts
import * as testData from "../resource/uiTestData/uiTestData.json";
export function generateRandomPhoneNumber(): string {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return '91' + randomNumber.toString(); // Assuming you want to prepend '91' to the random number
}

export function getRandomTestData(testDataArray: any[]) {
    const randomIndex = Math.floor(Math.random() * testDataArray.length);
    return testDataArray[randomIndex];
}
            
export function generateRandomHubData() {
    const randomData = {
        // hubNamefill: (testData.hubRegister.hubNames) + Math.floor(Math.random() * 100),
        // visionName: (testData.hubRegister.visionNames) + Math.floor(Math.random() * 100),
        // missionValue: (testData.hubRegister.missionValues) + Math.floor(Math.random() * 100),
        contactNo: '9' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
        // address: (testData.hubRegister.addresses) + Math.floor(Math.random() * 1000),
        //pincode: '84600' + Math.floor(Math.random() * 100),
        // email: (testData.hubRegister.emailprefix) + Math.floor(Math.random() * 100) + (testData.hubRegister.emailsuffix),
        fullName: (testData.staffRegister.fullName) + Math.floor(Math.random() * 100)
    };
    return randomData;
}