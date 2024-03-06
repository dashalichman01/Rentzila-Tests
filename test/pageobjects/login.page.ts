import page from './page.ts';

const enterBtn = '.NavbarAuthBlock_buttonEnter__c9siH';
const emailField = '#email';
const passwordField = '#password';
const loginBtn ='.Authorization_container__sLpvO .ItemButtons_darkBlueRoundBtn___4GDw';
const AuthorizationPopUp = '.Authorization_container__sLpvO';
const errorMsgs = '.CustomReactHookInput_error_message__jq01z';
const userIcon = '.NavbarAuthBlock_avatarBlock__d2GIF';
const dropDownMenuEmail = '.ProfileDropdownMenu_email__D5ylo';

class LoginPage {

    async getEmailField(){
        return await page.getElement(emailField);
    }

    async getPasswordField(){
        return await page.getElement(passwordField);
    }

    async getEmailErrorMsg(){
        return (await page.getElementByIndex(errorMsgs, 0));
    }

    async getPasswordErrorMsg(){
        return (await page.getElementByIndex(errorMsgs, 1));
    }

    async getOnlyPasswordErrorMsg(){
        return await page.getElement(errorMsgs);
    }
    async setEmail(email:string){
        await page.setValue(emailField, email);
    }

    async setPassword(password:string){
        await page.setValue(passwordField, password);
    }

    async clickLoginBtn(){
        await page.clickElement(loginBtn);
    }

    async clickEnterBtn(){
        await page.clickElement(enterBtn);
    }

    async clickUserIcon(){
        await page.clickElement(userIcon);
    }

    async getDropDownMenuEmail(){
        return await page.getText(dropDownMenuEmail);
    }

    async getAuthorizationPopUp(){
        return await page.getElement(AuthorizationPopUp);
    }

    async open () {
        return await page.open('/');
    }
}

export default new LoginPage();
