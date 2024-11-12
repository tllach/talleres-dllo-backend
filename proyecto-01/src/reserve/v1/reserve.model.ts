import { Schema, model, Types, Document } from "mongoose";

// DECLARE MODEL TYPE
interface ReservationType extends Document {
    book: Types.ObjectId;
    bookName: string;
    user: Types.ObjectId;
    userName: string;
    reservationDate: Date;
    returnDate: Date;
}

// DECLARE MONGOOSE SCHEMA
const ReservationSchema = new Schema<ReservationType>({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    bookName: { type: String, required: true }, 
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }, 
    reservationDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});

// DECLARE MONGO MODEL
const ReservationModel = model<ReservationType>("Reservation", ReservationSchema);

// EXPORT ALL
export { ReservationModel, ReservationType };
