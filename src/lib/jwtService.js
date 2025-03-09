import jwt from "jsonwebtoken";

class JwtService {
    constructor() {
        this.secret = process.env.NEXT_JWT_SECRET;
    }

    async createToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: "7d" });
    }

    async verifyToken(token) {
        return jwt.verify(token?.value, this.secret);
    }

    deleteToken(response) {
        response.cookies.set("quick_invoice_session", "", {
            httpOnly: true,
            secure: process.env.NEXT_NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });
        return response;
    }
}

// Export a single instance
const jwtService = new JwtService();
export default jwtService;
