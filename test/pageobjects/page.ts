
class Page {

    public open (path: string) {
        return browser.url(`${path}`)
    }

    async getElement(element: string) {
        return await $(element);
    }

    async getAllElements(element: string){
        return await $$(element);
    }

    async getElementByIndex(element: string, index: number) {
        return (await this.getAllElements(element))[index];
    }

    async getText(element: string){
        return await (await this.getElement(element)).getText();
    }

    async clickElement(element: string, flag = true) {
        if (flag) {
            await this.scrollTo(element);
            await this.waitUntilElementDisplated(element);
        }
        await (await this.getElement(element)).click();
    }

    async isElementClickable(element: string) {
        return await (await this.getElement(element)).isClickable();
    }

    async isElementDisplayed(element: string, flag = true) {
        if (flag) {
            await this.waitUntilElementDisplated(element);
        }
        return await (await this.getElement(element)).isDisplayed();
    }

    async waitUntilElementDisplated(element: string) {
        await browser.waitUntil(
            async () => await (await this.getElement(element)).isDisplayed(),
            {
                timeout: 30000,
                timeoutMsg: 'expected element should be displayed after 30s'
            }
        )
    }

    async setValue(element: string, value: string, flag = true) {
        if (flag) {
            await this.waitUntilElementDisplated(element);
        }
        await (await this.getElement(element)).setValue(value);
    }

    async scrollTo(element: string) {
        await (await this.getElement(element)).scrollIntoView();
    }

    async isElementEnabled(element: string) {
        return await (await this.getElement(element)).isEnabled();
    }
}

export default new Page();