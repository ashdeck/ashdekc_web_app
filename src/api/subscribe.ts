import request from "../utils/network"
import { Subscribe } from "../types/Subscribe";


export const subscribe = async (data: Subscribe) => await request({
    method: "POST",
    url: "/subscriptions",
    data: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
    },
});


export const verify_payment = async ({status, payment_id}: {status?: string, payment_id?: string}) => await request({
    method: "GET",
    url: "/subscriptions/verify?status="+status+"&payment_id="+payment_id,
    headers: {
        "Content-Type": "application/json",
    },
});


