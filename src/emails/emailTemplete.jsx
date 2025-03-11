import { formatDate } from "@/lib/formatDate";
import { calculateDueDate } from "@/lib/calculateDueDate";
import { formatCurrency } from "@/lib/formatCurrency";

export default function PaymentReminderEmail(props) {
    const invoiceLink =
        process.env.NEXT_NODE_ENV === "development"
            ? `http://localhost:3000/api/invoice/download-invoice/${props._id}`
            : `https://quick-invoice-nine.vercel.app/api/invoice/download-invoice/${props._id}`;
    return (
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Quick Invoice</title>
                <style>
                    {`
                    body {
                      font-family: 'Arial', sans-serif;
                      line-height: 1.6;
                      color: #333;
                      margin: 0;
                      background-color: #f4f4f4;
                      padding: 0;
                    }
                    .container {
                      max-width: 650px;
                      margin: 20px auto;
                      background: #fff;
                      border-radius: 8px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                      overflow: hidden;
                    }
                    .header {
                      text-align: center;
                      background-color: #0066cc;
                      color: #fff;
                      padding: 20px;
                    }
                    .header h1 {
                      margin: 0;
                      font-size: 24px;
                    }
                    .content {
                      padding: 20px 30px;
                    }
                    .content h2 {
                      font-size: 20px;
                      color: #333;
                    }
                    .content p {
                      margin: 10px 0;
                      color: #555;
                    }
                    .details-list {
                      padding-left: 20px;
                    }
                    .details-list div {
                      margin: 6px 0;
                      font-size: 16px;
                    }
                    .status-container {
                      display: flex;
                      align-items: center;
                      justify-content: start;
                      margin-top: 10px;
                    }
                    .status {
                      margin-left: 12px;
                      padding: 4px 40px;
                      background-color: #ffcc00;
                      border-radius: 50px;
                      font-size: 14px;
                      color: #000;
                      font-weight: bold;
                      display: inline-block;
                      text-align: center;
                    }
                    .status.pending {
                      background-color: #ffcc00;
                    }
                    .status.paid {
                      background-color: #06d001;
                    }
                    .status.overdue {
                      background-color: #ff5c5c;
                    }
                    .button-container {
                      text-align: center;
                      margin: 20px 0;
                    }
                    .button {
                      display: inline-block;
                      padding: 4px 10px;
                      background-color: #0066cc;
                      color: #fff;
                      text-decoration: none;
                      border-radius: 4px;
                    }
                    .button p{
                      color: #fff;
                      font-weight: bold;
                    }
                    .button:hover {
                      background-color: #0052a3;
                    }
                    .footer {
                      text-align: center;
                      background-color: #f8f9fa;
                      color: #666;
                      font-size: 12px;
                      padding: 15px;
                    }
                  `}
                </style>
            </head>
            <body>
                <div className="container">
                    <div className="header">
                        <h1>Quick Invoice</h1>
                    </div>
                    <div className="content">
                        <h2>Hi {props.client.name},</h2>

                        <p>
                            We hope this email finds you well. Please find the
                            details of your invoice below.
                        </p>

                        <h3>Invoice Details:</h3>
                        <div className="details-list">
                            <div>
                                <strong>Invoice Number: </strong>{" "}
                                {props.invoiceNo}
                            </div>
                            <div>
                                <strong>Invoice Date: </strong>
                                {formatDate(props.date)}
                            </div>
                            <div>
                                <strong>Due Date: </strong>
                                {calculateDueDate(props.date, props.dueDate)}
                            </div>
                            <div>
                                <strong>Total Amount: </strong>{" "}
                                {formatCurrency({
                                    amount: props.totalAmount,
                                    currency: props.currency,
                                })}
                            </div>
                            <div className="status-container">
                                <div
                                    className={`status ${props.paymentStatus.toLowerCase()}`}
                                >
                                    {props.paymentStatus}
                                </div>
                            </div>
                        </div>

                        <p>
                            You can download your invoice by clicking the button
                            below:
                        </p>

                        <div className="button-container">
                            <a href={invoiceLink} className="button">
                                <p>Download Invoice</p>
                            </a>
                        </div>

                        <p>
                            If you have any questions or concerns, please don't
                            hesitate to contact us.
                        </p>

                        <p>Thank you for your business!</p>
                    </div>
                    <div className="footer">
                        <p>
                            &copy; {new Date().getFullYear()}{" "}
                            {props.companyName}. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}
