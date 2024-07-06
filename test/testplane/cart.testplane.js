import { clearCart } from './clearCart'
describe('Тест Cart:', () => {
	beforeEach(async ({ browser }) => {
		await clearCart(browser)
	})

	it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async ({
		browser,
	}) => {
		await browser.url('http://localhost:3000/hw/store/catalog/0')
		const addToCartButton = await browser.$('.ProductDetails-AddToCart')
		await addToCartButton.click()

		await browser.url('http://localhost:3000/hw/store/catalog/1')
		await addToCartButton.waitForExist()
		await addToCartButton.click()

		await browser.url('http://localhost:3000/hw/store/catalog/2')
		await addToCartButton.waitForExist()
		await addToCartButton.click()

		const cartLink = await browser.$('a[href="/hw/store/cart"]')
		const cartLinkText = await cartLink.getText()

		expect(cartLinkText).toContain('(3)')
	})

	it('в корзине должна отображаться таблица с добавленными в нее товарами', async ({
		browser,
	}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()

		await page.goto('http://localhost:3000/hw/store/catalog/0')
		const addToCartButton = await page.$('.ProductDetails-AddToCart')
		await addToCartButton.click()

		await page.goto(`http://localhost:3000/hw/store/cart`)
		const cartTable = await page.$('.Cart-Table')

		expect(cartTable).toBeTruthy()
	})

	it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async ({
		browser,
	}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()

		await page.goto('http://localhost:3000/hw/store/catalog/0')
		const addToCartButton = await page.$('.ProductDetails-AddToCart')
		await addToCartButton.evaluate(btn => btn.click())

		await page.goto('http://localhost:3000/hw/store/cart')

		const cartName = await page.$eval('.Cart-Name', el => el.textContent.trim())
		const cartPrice = await page.$eval('.Cart-Price', el =>
			el.textContent.trim()
		)
		const cartCount = await page.$eval('.Cart-Count', el =>
			el.textContent.trim()
		)
		const cartTotalPrice = await page.$eval('.Cart-OrderPrice', el =>
			el.textContent.trim()
		)

		expect(cartName).toBeTruthy()
		expect(cartPrice).toBeTruthy()
		expect(cartCount).toBeTruthy()
		expect(cartTotalPrice).toBeTruthy()
	})

	it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async ({
		browser,
	}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()

		await page.goto(`http://localhost:3000/hw/store/catalog/0`)
		const buttonAddCart = await page.$('.ProductDetails-AddToCart')
		await buttonAddCart.evaluate(form => form.click())

		await page.goto(`http://localhost:3000/hw/store/cart`)
		const buttonClearCart = await page.$('.Cart-Clear')
		await buttonClearCart.evaluate(form => form.click())
	})

	it('если корзина пустая, должна отображаться ссылка на каталог товаров', async ({
		browser,
	}) => {
		const puppeteer = await browser.getPuppeteer()
		const [page] = await puppeteer.pages()

		await page.goto('http://localhost:3000/hw/store/cart')

		const linkText = 'catalog'
		const link = await page.evaluate(text => {
			const elements = Array.from(document.querySelectorAll('a'))
			return elements.find(el => el.textContent.trim() === text)?.href || null
		}, linkText)

		expect(link).toEqual('http://localhost:3000/hw/store/catalog')
	})
})
