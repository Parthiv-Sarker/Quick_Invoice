import { Resend } from "resend";

import PaymentReminderEmail from "@/emails/emailTemplete";

const apiKey = process.env.NEXT_RESEND_API_KEY;

if (!apiKey) {
    throw new Error(
        "Missing API key. Make sure RESEND_API_KEY is set in .env.local"
    );
}

const resend = new Resend(apiKey);

export async function sendEmail(payload) {
    try {
        const response = await resend.emails.send({
            from: "Quick Invoice <QuickInvoice@parthiv.life>",
            to: payload.user.email,
            subject: "Quick Invoice | Invoice Email",
            react: PaymentReminderEmail(payload.invoice),
        });
        console.log(response);

        return {
            success: true,
            message: "Successfully send email.",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to send email.",
        };
    }
}
