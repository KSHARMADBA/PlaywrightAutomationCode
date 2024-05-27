import { test } from "@playwright/test";
import { uiCommonUtils } from "../../utils/uiCommonMethodModule";
const testSpec = uiCommonUtils.uiBase.applicationHome
import * as testData from "../../resource/uiTestData/uiTestData.json";
const resource: string = "/";

// test('Validate Logout Option', async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({page, url})
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     // await testSpec.loginPage({ page, url })
//     // await testSpec.loginPage( page, userlogin );
//     await testSpec.loginPage({ page, url }) 
//     await testSpec.logOut({page})
//     // await testSpec.({ page })
// })

test.only('Validate Hub Registration', async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage(page, url ) 
    // await testSpec.loginPage({ page, url }) 
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    // await testSpec.hubRegistration({page,url})
    const hub_name = 'chennaiHub2' // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
    // await testSpec.logOut({page,url})
}
)

test(" Validate the behavior when Hub Name is Blank", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = ''  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)

test.only(" Validate when Hub Name is duplicate", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = 'retest01'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)


// Ngetaive test case:  when Person-Incharge is blank
// test(" Validate when Person-Incharge is blank", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     const hub_name = 'demotcs12'  // Replace "hub_name" with the required value
//     await testSpec.hubRegistration(page, hub_name)
// }
// )
// test case for staff registration
// test(" Validate staff registration", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     // const hub_name='htest35'  // Replace "hub_name" with the required value
//     await testSpec.staffRegistration({ page, url })
// }
// )



test.only(" Validate the behavior when hub name contains single space", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = ' '  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test(" Validate the behavior when hub name conatins multiple spaces", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = '  '  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test(" Validate the behavior when hub name conatins single character", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = 'F'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test(" Validate the behavior when hub name conatins leading space", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = 'leading space '  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test(" Validate the behavior when hub name conatins trailing space", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = ' trailing space'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test.only(" Validate the behavior when hub name conatins leading & trailing space", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = ' leading & trailing space '  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test.only(" Validate the behavior when hub name exceeds maximum defined length", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = 'more than two hundred characters count test A while back I needed to count the amount of letters that a piece of text in an email template had (to avoid passing any character limits). Unfortunately, I could not think of a quick way to do so on my macbook and I therefore turned to the Internet.'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
test('Validate a success Hub Registration after negative scenarios', async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    // await testSpec.loginPage({ page, url })  
    const hub_name = 'retest18' // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)

}
)

test("Hub name with non-alphanumeric characters", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = '!@#$%^&*&$&*'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
})

// Negative test case: when Hub Name is duplicate
// test(" Validate when Hub Name is duplicate", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     const hub_name = 'retest01'  // Replace "hub_name" with the required value
//     await testSpec.hubRegistration(page, hub_name)
// }
// )

test(" Validate the behavior when the user is not logged in before attempting hub registration", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const hub_name = 'validhubname'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)

// Negative test case: when Hub Name is duplicate
// test(" Validate when Hub Name is duplicate", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     const hub_name = 'retest01'  // Replace "hub_name" with the required value
//     await testSpec.hubRegistration(page, hub_name)
// }
// )
// test case for staff registration
// test(" Validate staff registration", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     // const hub_name='htest35'  // Replace "hub_name" with the required value
//     await testSpec.staffRegistration({ page, url })
// }
// )



test(" Validate successful hub registration and redirection", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = 'retest18' // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)

}
)

// Negative test case: when Hub Name is duplicate
// test(" Validate when Hub Name is duplicate", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     const hub_name = 'retest01'  // Replace "hub_name" with the required value
//     await testSpec.hubRegistration(page, hub_name)
// }
// )
// test case for staff registration
// test(" Validate staff registration", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     // const hub_name='htest35'  // Replace "hub_name" with the required value
//     await testSpec.staffRegistration({ page, url })
// }
// )



test(" Validate hub registration with a hub name that exceeds the character limit", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    // await testSpec.loginPage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)
    const hub_name = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'  // Replace "hub_name" with the required value
    await testSpec.hubRegistration(page, hub_name)
}
)
// test for staff registrations
test.only(" Staff Registartion with Macro data", async ({ page, baseURL }) => {
    const url = baseURL + resource
    await testSpec.validateHomePage({ page, url })
    const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
    await testSpec.loginPage(page, userlogin)    
    await testSpec.staffRegistrationMacro({ page, url })
}
)
// test(" Validate staff registration when source is Json data", async ({ page, baseURL }) => {
//     const url = baseURL + resource
//     await testSpec.validateHomePage({ page, url })
//     // await testSpec.loginPage({ page, url })
//     const userlogin = 'austin@dbyarforum.org'; // Replace 'yourUsername' with the actual username
//     await testSpec.loginPage(page, userlogin)
//     // await testSpec.staffRegistrationwithJson({ page, url })
// }
// )
