import loginPage from "../pageobjects/login.page.ts"

describe('Login tests', ()=>{
    before(async()=>{
        await browser.setWindowSize(1300, 800);
    })

    beforeEach(async()=>{
        await loginPage.open();
        await loginPage.clickEnterBtn();

    })

    it('C200, should authorize with empty fields', async()=>{
        const errorMsg = 'Поле не може бути порожнім';
        const errorClass = 'CustomReactHookInput_error_input___nw4a';

        await loginPage.clickLoginBtn();
        await expect(await loginPage.getAuthorizationPopUp()).toBeDisplayed();
        await expect(await loginPage.getEmailErrorMsg()).toBeDisplayed()
        await expect(await (await loginPage.getEmailErrorMsg()).getText()).toEqual(errorMsg); 
        await expect(await loginPage.getEmailField()).toHaveElementClass(errorClass);
        await expect(await loginPage.getPasswordErrorMsg()).toBeDisplayed();
        await expect(await (await loginPage.getPasswordErrorMsg()).getText()).toEqual(errorMsg);
        await expect(await loginPage.getPasswordField()).toHaveElementClass(errorClass);
    }),

    it('C207, should authorize with invalid phone', async()=>{
        await loginPage.setEmail('8546874565');
        await loginPage.setPassword(''+process.env.PASSWORD);
        await loginPage.clickLoginBtn();
        await expect(await loginPage.getAuthorizationPopUp()).toBeDisplayed();
        await expect(await loginPage.getEmailField()).toHaveElementClass('CustomReactHookInput_error_input___nw4a');
        await expect(await loginPage.getEmailErrorMsg()).toBeDisplayed();
        await expect(await (await loginPage.getEmailErrorMsg()).getText()).toEqual('Неправильний формат email або номера телефону');
    }),

    it('C576, authorization with invalid email', async()=>{
        const wrongEmails = ['reroka  2198@aersm.com', 'лфвати@aersm.com', 'reroka2198aersm.com', 'reroka2198@aersmcom', 'reroka2198@.com', 'reroka2198@.com', 'reroka2198.com', 'reroka2198', 'reroka2198@@aersm.com'];
        const errorMsg = 'Неправильний формат email або номера телефону';
        const errorClass = 'CustomReactHookInput_error_input___nw4a';

        await loginPage.setPassword(''+process.env.PASSWORD);

        for(let email of wrongEmails){
            await loginPage.setEmail(email);
            await loginPage.clickLoginBtn();
            await expect(await loginPage.getEmailField()).toHaveElementClass(errorClass);
            await expect(await (await loginPage.getEmailErrorMsg()).getText()).toEqual(errorMsg);
        }

        for(let email of wrongEmails){
            await loginPage.setEmail(email);
            await browser.keys('Enter');
            await expect(await loginPage.getEmailField()).toHaveElementClass(errorClass);
            await expect(await (await loginPage.getEmailErrorMsg()).getText()).toEqual(errorMsg);
        }
    }),

    it('C577, authorization with invalid password', async()=>{
        const wrongPasswords = ['Test159753 ', ' Te159753', 'est159753', 'test159753', 'TEST159753', 'Тесттесттест'];
        const errorMsg = 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли';
        const errorClass = 'CustomReactHookInput_error_input___nw4a';
        
        await loginPage.setEmail(''+process.env.EMAIL);

        for(let password of wrongPasswords){
            await loginPage.setPassword(password);
            await loginPage.clickLoginBtn();
            await expect(await loginPage.getPasswordField()).toHaveElementClass(errorClass);
            await expect(await (await loginPage.getOnlyPasswordErrorMsg()).getText()).toEqual(errorMsg);
        }

        for(let password of wrongPasswords){
            await loginPage.setPassword(password);
            await browser.keys('Enter');
            await expect(await loginPage.getPasswordField()).toHaveElementClass(errorClass);
            await expect(await (await loginPage.getOnlyPasswordErrorMsg()).getText()).toEqual(errorMsg);
        }
    }),

    it('C201, should authorize with valid email and password', async()=>{
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        if(email && password){
            await loginPage.setEmail(email);
            await loginPage.setPassword(password);
        } 
        await expect(await (await loginPage.getPasswordField()).getAttribute('type')).toEqual('password');
        await loginPage.clickLoginBtn();
        await expect(await browser.getUrl()).toEqual('https://rentzila.com.ua/');
        await loginPage.clickUserIcon();
        await expect(await loginPage.getDropDownMenuEmail()).toEqual('reroka2198@aersm.com');
    })
})
