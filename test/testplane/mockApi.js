export const mockRequest = request => {
	if (request.url() === 'http://localhost:3000/hw/store/products') {
		request.response({
			content: 'application/json',
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify([
				{ id: 0, name: 'Incredible kogtetochka', price: 789 },
				{ id: 1, name: 'Incredible kogtetochka', price: 990 },
				{ id: 2, name: 'Electronic kogtetochka', price: 340 },
				{ id: 3, name: 'Generic kogtetochka', price: 279 },
				{ id: 4, name: 'Rustic kogtetochka', price: 129 },
				{ id: 5, name: 'Bespoke kogtetochka', price: 5 },
				{ id: 6, name: 'Gorgeous kogtetochka', price: 162 },
				{ id: 7, name: 'Generic kogtetochka', price: 155 },
				{ id: 8, name: 'Handcrafted kogtetochka', price: 23 },
				{ id: 9, name: 'Refined kogtetochka', price: 403 },
				{ id: 10, name: 'Fantastic kogtetochka', price: 439 },
				{ id: 11, name: 'Intelligent kogtetochka', price: 254 },
				{ id: 12, name: 'Small kogtetochka', price: 424 },
				{ id: 13, name: 'Gorgeous kogtetochka', price: 454 },
				{ id: 14, name: 'Practical kogtetochka', price: 274 },
				{ id: 15, name: 'Handcrafted kogtetochka', price: 528 },
				{ id: 16, name: 'Refined kogtetochka', price: 79 },
				{ id: 17, name: 'Rustic kogtetochka', price: 170 },
				{ id: 18, name: 'Electronic kogtetochka', price: 483 },
				{ id: 19, name: 'Awesome kogtetochka', price: 445 },
				{ id: 20, name: 'Small kogtetochka', price: 548 },
				{ id: 21, name: 'Handmade kogtetochka', price: 39 },
				{ id: 22, name: 'Fantastic kogtetochka', price: 956 },
				{ id: 23, name: 'Electronic kogtetochka', price: 757 },
				{ id: 24, name: 'Ergonomic kogtetochka', price: 782 },
				{ id: 25, name: 'Electronic kogtetochka', price: 498 },
				{ id: 26, name: 'Intelligent kogtetochka', price: 999 },
			]),
		})
		return
	}

	if (request.url() === 'http://localhost:3000/hw/store/api/products/0') {
		request.respond({
			content: 'application/json',
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({
				id: 0,
				name: 'Incredible kogtetochka',
				description: 'Really Electronic kogtetochka for Ojos Azules',
				price: 789,
				color: 'gold',
				material: 'Wooden',
			}),
		})
		return
	}
	request.continue()
}
