import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});


const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
