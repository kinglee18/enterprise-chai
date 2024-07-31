import { test, expect } from '@playwright/test';

test('register form', async (
    { page, context
    }
) => {

    //share your screen



    const currentDateTime = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    await page.goto('http://localhost:3000/account/register');
    //Fill email input field
    await page.fill('input[name=email]', `${currentDateTime}@gmail.com`);
    //Fill password input field
    await page.fill('input[name=password]', 'test123456');
    //click on create account button
    await page.click('button[type=submit]');
    //wait for redirect
    await page.waitForURL('http://localhost:3000/login');
    await expect(page).toHaveURL('http://localhost:3000/login');

    //fill login form
    await page.fill('input[name=email]', `${ currentDateTime }@gmail.com`);
    await page.fill('input[name=password]', 'test123456');
    //click on login button
    await page.click('button[type=submit]');
    //wait for redirect
    await page.waitForURL('http://localhost:3000/home/dashboard');
    await page.goto('http://localhost:3000/home/materials?action=new');


    //fill company , name and documents fields in the form
    await page.fill('input[name=company]', 'Company');
    await page.fill('input[name=name]', 'Name');

    //fill documents field with a pdf file from the assets folder
    const fileInput = await page.$('input[name=documents]');
    await fileInput.setInputFiles('tests/assets/test.pdf');

    //click on submit button
    await page.click('button[type=submit]')

    await page.goto('http://localhost:3000/home/csm');
    //click on create session button using text
    await page.click('text=Create Session');
    //wait for redirect http://localhost:3000/home/csm?action=new
    await page.waitForURL('http://localhost:3000/home/csm?action=new');
    // fill point_of_contact field
    await page.fill('input[name=point_of_contact]', 'David');
    //click on launch button using text
    await page.click('text=Launch');
    //wait for redirect http://localhost:3000/session/${dinamiId}/active
    await page.waitForURL('http://localhost:3000/session/*/active');
    //wat 10 seconds

    await page.click('text=Allow');



    await page.click('text=Configure');
    // on event getDisplayMedia request
    await page.on('dialog', async dialog => {
        await dialog.accept();
    })
    // click on share in the navigator to share the screen
    await page.click('text=Cancel');


    await page.click('text=Continue');



});

