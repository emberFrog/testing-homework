describe('Тест Catalog', () => {
	it('на странице отображаются товары, список которых приходит с сервера', async ({
		browser,
	}) => {
		await browser.url('http://localhost:3000/hw/store/catalog')

		const items = await Promise.all(await browser.$$('.ProductItem'))

		await expect(items.length).toBeGreaterThan(0)
	})

	it('у каждого товара есть название, цена и ссылка на его страницу', async ({
		browser,
	}) => {
		await browser.url('http://localhost:3000/hw/store/catalog')
		const namePromises = await browser
			.$$('.ProductItem')
			.map(item => item.$('.ProductItem-Name').getText())
		const pricePRomises = await browser
			.$$('.ProductItem')
			.map(item => item.$('.ProductItem-Price').getText())
		const detailsLinkPromises = await browser
			.$$('.ProductItem')
			.map(item => item.$('.ProductItem-DetailsLink').getText())

		const names = await Promise.all(namePromises)
		const prices = await Promise.all(pricePRomises)
		const detailsLinks = await Promise.all(detailsLinkPromises)

		expect(names).toEqual(expect.arrayContaining(names.filter(Boolean)))
		expect(prices).toEqual(expect.arrayContaining(prices.filter(Boolean)))
		expect(detailsLinks).toEqual(
			expect.arrayContaining(detailsLinks.filter(Boolean))
		)

		detailsLinks.forEach(link => {
			expect(link).toMatch('Details')
		})
	})

	it('на странице товара отображается название, описание, цена, цвет, материал и кнопка "добавить в корзину"', async ({
		browser,
	}) => {
		await browser.url(`http://localhost:3000/hw/store/catalog/6`)

		const name = await browser.$('.ProductDetails-Name').getText()
		const description = await browser.$('.ProductDetails-Description').getText()
		const price = await browser.$('.ProductDetails-Price').getText()
		const addToCartButton = await browser
			.$('.ProductDetails-AddToCart')
			.getText()
		const color = await browser.$('.ProductDetails-Color').getText()
		const material = await browser.$('.ProductDetails-Material').getText()

		expect(name).toBeTruthy()
		expect(description).toBeTruthy()
		expect(price).toBeTruthy()
		expect(addToCartButton).toBeTruthy()
		expect(color).toBeTruthy()
		expect(material).toBeTruthy()
	})

	it('если товар уже добавлен в корзину, то в каталоге и на странице товара должна отображаться пометка', async ({
		browser,
	}) => {
		await browser.url('http://localhost:3000/hw/store/catalog/6')

		const addToCartButton = await browser.$('.ProductDetails-AddToCart')
		await addToCartButton.click()
		const cartBadge = await browser.$('.CartBadge.text-success.mx-3')

		expect(cartBadge.isDisplayed()).toBeTruthy()

		await browser.url('http://localhost:3000/hw/store/catalog')

		const cartBadgeInCatalog = await browser.$('.CartBadge.text-success.mx-3')

		expect(cartBadgeInCatalog.isDisplayed()).toBeTruthy()
	})

	it('если товар уже в корзине, то повторное нажатие кнопки "добавить в корзину" должно увеличить его количество', async ({
		browser,
	}) => {
		await browser.url('http://localhost:3000/hw/store/catalog/6')
		const addToCartButton = await browser.$('.ProductDetails-AddToCart')
		await addToCartButton.click()

		await browser.url('http://localhost:3000/hw/store/cart')
		const cartCountElement = await browser.$('.Cart-Count')
		const initialCartItemCount = await cartCountElement.getText()

		await browser.url('http://localhost:3000/hw/store/catalog/6')
		await addToCartButton.waitForExist()
		await addToCartButton.click()

		await browser.url('http://localhost:3000/hw/store/cart')
		const newCartItemCount = await cartCountElement.getText()

		expect(parseInt(newCartItemCount)).toBeGreaterThan(
			parseInt(initialCartItemCount)
		)
	})

	it('содержимое корзины должно сохраняться между перезагрузками страницы', async ({
		browser,
	}) => {
		await browser.url('http://localhost:3000/hw/store/catalog/6')
		const addToCartButton = await browser.$('.ProductDetails-AddToCart')
		await addToCartButton.click()

		await browser.url('http://localhost:3000/hw/store/cart')
		const cartCountElement = await browser.$('.Cart-Count')
		const initialCartItemCount = await cartCountElement.getText()

		await browser.refresh()

		const newCartCountElement = await browser.$('.Cart-Count')
		const reloadedCartItemCount = await newCartCountElement.getText()

		expect(
			parseInt(initialCartItemCount) === parseInt(reloadedCartItemCount)
		).toBeTruthy()
	})
})
