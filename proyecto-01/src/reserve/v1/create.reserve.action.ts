import { ReservationModel, ReservationType } from "./reserve.model";
import { UserModel } from "../../user/v1/user.model";
import { Types } from "mongoose";

// Define el tipo de datos necesarios para crear una reserva, incluyendo los nombres
type ReservationData = {
    book: Types.ObjectId;
    bookName: string;
    user: Types.ObjectId;
    userName: string;
    reservationDate: Date;
    returnDate: Date;
};

// Función para crear una reserva y actualizar el modelo del usuario con la reserva creada
async function createReserve(reservationData: ReservationData): Promise<ReservationType> {
    // Crear la reserva en la base de datos
    const newReservation = await ReservationModel.create(reservationData);

    // Actualizar el usuario con la nueva reserva
    await UserModel.findByIdAndUpdate(
        reservationData.user,
        {
            $push: {
                reservations: {
                    bookId: reservationData.book.toString(),
                    reservationDate: reservationData.reservationDate,
                    returnDate: reservationData.returnDate
                }
            }
        },
        { new: true }
    );

    return newReservation;
}

export { createReserve };
