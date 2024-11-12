import readReserve from "./read.reserve.action";
import { createReserve } from "./create.reserve.action";
import { ReservationModel, ReservationType } from "./reserve.model";
import { Types } from "mongoose";
import { RequestingUserType } from "../../user/v1/user.types"; // Importamos los tipos de usuario
import { BookReferenceType } from "../../book/v1/book.types"; // Importamos los tipos de libro


async function bookReservationHistory(bookId: string): Promise<ReservationType[]> {
    return await readReserve(bookId);
}

// Controlador para crear una nueva reserva
async function createReservation(
    bookId: string,
    bookName: string,
    userId: string,
    userName: string,
    reservationDate: Date,
    returnDate: Date
): Promise<ReservationType> {
    return await createReserve({
        book: new Types.ObjectId(bookId),
        bookName,
        user: new Types.ObjectId(userId),
        userName,
        reservationDate,
        returnDate
    });
}


export { bookReservationHistory, createReservation };
