import mongoose, {Types} from 'mongoose';



const orderSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deliveryDetails: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        addressLine: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },

    },
    cartItems: [
        {
            menuItemId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number
    },
    status: {
        type: String,
        enum: ["placed", "paid","inProgress","outForDelivery","delivered"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order