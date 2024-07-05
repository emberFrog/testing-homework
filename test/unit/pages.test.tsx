import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Application } from '../../src/client/Application'
import { initStore } from '../../src/client/store'
import { ExampleApi, CartApi } from '../../src/client/api'

const getPageUrl = (page: string) => {
	const store = initStore(new ExampleApi(page), new CartApi())
	const application = (
		<MemoryRouter initialEntries={[page]} initialIndex={0}>
			<Provider store={store}>
				<Application />
			</Provider>
		</MemoryRouter>
	)

	return application
}

describe('Тесты перехода по страницам', () => {
	it('по адресу "/" доступна страница "Home"', () => {
		const application = getPageUrl('/')
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Home')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/catalog' доступна страница Catalog", () => {
		const application = getPageUrl('/catalog')
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Catalog')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/delivery' доступна страница Delivery", () => {
		const application = getPageUrl('/delivery')
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Delivery')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/contacts' доступна страница Contacts", () => {
		const application = getPageUrl('/contacts')
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Contacts')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/cart' доступна страница Cart", () => {
		const application = getPageUrl('/cart')
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Cart')[0]
		expect(pageDiv).toBeTruthy()
	})
})
