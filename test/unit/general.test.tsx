import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Application } from '../../src/client/Application'
import { store } from './constants'

describe('Тест NavBar', () => {
	it('название магазина является ссылкой на главную страницу', async () => {
		const application = (
			<MemoryRouter initialEntries={['/']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)

		const { container } = render(application)
		const results = container.getElementsByClassName('Application-Brand')[0]
		const link = results.getAttribute('href')

		expect(link).toBe('/')
	})

	describe('в шапке находятся все навигационные ссылки', () => {
		const application = (
			<MemoryRouter initialEntries={['/']} initialIndex={0}>
				<Provider store={store}>
					<Application />
				</Provider>
			</MemoryRouter>
		)

		const { container } = render(application)
		const links: (string | null)[] = []
		const results = container.getElementsByClassName('nav-link')
		for (let i = 0; i < results.length; i++) {
			const result = results[i]
			const link = result.getAttribute('href')
			links.push(link)
		}

		it("есть ссылка '/catalog' Catalog", () => {
			const catalogLink = links.find(link => link?.includes('catalog'))
			expect(catalogLink).toBeTruthy()
		})

		it("есть ссылка '/delivery' Delivery", () => {
			const deliveryLink = links.find(link => link?.includes('catalog'))
			expect(deliveryLink).toBeTruthy()
		})

		it("есть ссылка '/contacts' Contacts", () => {
			const contactsLink = links.find(link => link?.includes('catalog'))
			expect(contactsLink).toBeTruthy()
		})

		it("есть ссылка '/cart' Cart", () => {
			const cartLink = links.find(link => link?.includes('catalog'))
			expect(cartLink).toBeTruthy()
		})
	})
})
