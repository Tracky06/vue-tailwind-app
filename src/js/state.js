import { reactive } from "vue";

class Order {
    constructor(id, product = "", price = 0.0, quantity = 0) {
        if (typeof product !== "string" || typeof price !== "number" || typeof quantity !== "number") {
            throw new Error("Invalid data types provided for Order.");
        }
        
        this.id = id;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.total = parseFloat((this.price * this.quantity).toFixed(2));
    }

    updateQuantity(newQuantity) {
        if (typeof newQuantity !== "number" || newQuantity < 0) {
            throw new Error("Invalid quantity.");
        }
        this.quantity += newQuantity;
        this.total = parseFloat((this.price * this.quantity).toFixed(2));
    }
}

class CartManager {
    constructor() {
        if (CartManager.instance) {
            return CartManager.instance;
        }
        
        this.state = reactive({
            totalPrice: 0,
            myOrders: [],
            noOfOrders: 0
        });

        CartManager.instance = this;
    }

    addOrder(order) {
        if (!(order instanceof Order)) {
            throw new Error("Invalid order. Must be an instance of Order class.");
        }

        // Check if order with the same ID already exists
        const existingOrder = this.state.myOrders.find(o => o.id === order.id);
        if (existingOrder) {
            existingOrder.updateQuantity(order.quantity);
        } else {
            this.state.myOrders.push(order);
        }

        this.recomputeTotalPrice();
        this.recomputeNoOfOrders();
    }

    removeOrder(id) {
        const index = this.state.myOrders.findIndex(order => order.id === id);
        if (index !== -1) {
            this.state.myOrders.splice(index, 1);  // ✅ Use splice to maintain reactivity
            this.recomputeTotalPrice();
            this.recomputeNoOfOrders();
        } else {
            console.warn("Order ID not found.");
        }
    }

    recomputeTotalPrice() {
        this.state.totalPrice = parseFloat(
            this.state.myOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)
        );
    }

    recomputeNoOfOrders() {
        this.state.noOfOrders = this.state.myOrders.length;
    }

    getTotalPrice() {
        return this.state.totalPrice;
    }
}

const myCartManager = new CartManager();
export { myCartManager, Order };
