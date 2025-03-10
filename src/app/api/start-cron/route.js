import "@/lib/checkOverdueInvoices";

export async function GET() {
    return new Response(JSON.stringify({ message: "Cron job started!" }), {
        status: 200,
    });
}
