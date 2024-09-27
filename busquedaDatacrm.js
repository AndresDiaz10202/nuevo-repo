const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function buscarDatacrm() {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('https://www.google.com');

        try {
            let aceptarCookies = await driver.findElement(By.id('L2AGLb'));
            await aceptarCookies.click();
        } catch (e) {
            // Si no aparece el botón, continúa
        }

        let cajaBusqueda = await driver.findElement(By.name('q'));
        await cajaBusqueda.sendKeys('datacrm', Key.RETURN);

        await driver.wait(until.titleContains('datacrm'), 10000);

        // Captura los primeros resultados de la búsqueda
        let resultados = await driver.findElements(By.css('h3'));
        for (let i = 0; i < 5 && i < resultados.length; i++) {
            let texto = await resultados[i].getText();
            console.log(`Resultado ${i + 1}: ${texto}`);
        }

        console.log('Búsqueda completada exitosamente.');
    } catch (error) {
        console.error('Ocurrió un error:', error);
        process.exit(1);
    } finally {
        await driver.quit();
    }
}

buscarDatacrm();

