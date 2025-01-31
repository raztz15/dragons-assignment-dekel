const { faker } = require("@faker-js/faker")

module.exports = {
    async up(db, _client) {
        const orders = []

        for (let i = 0; i < 300; i++) {
            orders.push({
                title: `Order #${i + 1}`,
                orderLocation: { lat: faker.location.latitude(), lng: faker.location.latitude() },
                orderTime: faker.date.recent(),
                status: faker.helpers.arrayElement(["Recieved", "Preparing", "Ready", "EnRoute", "Delivered"]),
                subItems: [
                    {
                        title: faker.commerce.productName(),
                        amount: faker.number.int({ min: 1, max: 5 }),
                        type: faker.helpers.arrayElement(["Pizza", "Salad", "Topping"])
                    }
                ],
                customerName: faker.person.fullName(),
                totalPrice: Number(faker.commerce.price({ min: 10, max: 100, dec: 2 }))
            })
        }
        await db.collection('orders').insertMany(orders)
    },

    async down(db, _client) {
        await db.collection('orders').deleteMany({})
    }
}