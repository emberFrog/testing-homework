import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Application } from '../../src/client/Application'
import { store } from './constants'

describe('Тесты перехода по страницам', () => {
	it('по адресу "/" доступна страница "Home"', () => {
		const application = (
			<MemoryRouter initialEntries={['/']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Home')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/catalog' доступна страница Catalog", () => {
		const application = (
			<MemoryRouter initialEntries={['/catalog']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Catalog')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/delivery' доступна страница Delivery", () => {
		const application = (
			<MemoryRouter initialEntries={['/delivery']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Delivery')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/contacts' доступна страница Contacts", () => {
		const application = (
			<MemoryRouter initialEntries={['/contacts']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Contacts')[0]
		expect(pageDiv).toBeTruthy()
	})

	it("по адресу '/cart' доступна страница Cart", () => {
		const application = (
			<MemoryRouter initialEntries={['/cart']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)
		const { container } = render(application)
		const pageDiv = container.getElementsByClassName('Cart')[0]
		expect(pageDiv).toBeTruthy()
	})
})
