import asyncHandler from 'express-async-handler';

import { Request, Response, OrderItems, ShippingAddress } from '../types';
import { Order } from '../models';

/**
 * @description Create new Order
 * @route POST /api/orders
 * @access Private
 */
export const addOrderItems = asyncHandler(
	async (req: Request, res: Response) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice
		} = req.body as {
			orderItems: OrderItems[];
			shippingAddress: ShippingAddress;
			paymentMethod: string;
			itemsPrice: number;
			taxPrice: number;
			shippingPrice: number;
			totalPrice: number;
		};

		if (!req.user) {
			res.status(400);
			throw new Error('User not authorized.');
		}
		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error('No order items.');
		} else {
			const order = new Order({
				user: req.user._id,
				orderItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice
			});
			const createdOrder = await order.save();
			res.status(201).json(createdOrder);
		}
	}
);

/**
 * @description Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
export const getOrderbyId = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params as { id: string };
		const order = await Order.findById(id).populate('user', 'name email');
		if (order) {
			res.json(order);
		} else {
			res.status(404);
			throw new Error('Order not found');
		}
	}
);

/**
 * @description Update order to paid
 * @route PUT /api/orders/:id/pay
 * @access Private
 */
export const updateOrderToPaid = asyncHandler(
	async (req: Request, res: Response) => {
		const params = req.params as { id: string };
		const {
			id,
			status,
			update_time,
			payer: { email_address }
		} = req.body as {
			id: string;
			status: string;
			update_time: string;
			payer: { email_address: string };
		};
		const order = await Order.findById(params.id);
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id,
				status,
				email_address,
				update_time
			};
			const updatedOrder = order.save();
			res.json(updatedOrder);
		} else {
			res.status(404);
			throw new Error('Order not found');
		}
	}
);

/**
 * @description Get logged in user orders
 * @route PUT /api/orders/myorders
 * @access Private
 */
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
	if (!req.user) throw new Error('User Not Found');
	const orders = await Order.find({ user: req.user._id });
	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});
