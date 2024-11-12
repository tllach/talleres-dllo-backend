import { Router, Request, Response } from "express";
import { bookReservationHistory, createReservation } from "./reserve.controller";
import { AuthMiddleware } from "../../middleware/auth";

const reserveRoutes = Router();

// Endpoint para obtener el historial de reservas de un libro
async function BookReservationHistory(request: Request, response: Response) {
    const bookId = request.params.bookId;

    try {
        const reservations = await bookReservationHistory(bookId);
        response.status(200).json({
            message: "Historial de reservas del libro obtenido exitosamente",
            reservations: reservations,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error al obtener el historial de reservas del libro",
            error: (error as Error).message,
        });
    }
}

async function CreateReservation(request: Request, response: Response) {
    const bookId = request.params.bookId;
    const { bookName, reservationDate, returnDate } = request.body;
    const requestingUser = request.user;

    if (!requestingUser) {
        return response.status(401).json({ message: "User not authenticated." });
    }

    try {
        const newReservation = await createReservation(
            bookId,
            bookName,
            requestingUser._id,
            requestingUser.name,
            new Date(reservationDate),
            new Date(returnDate)
        );

        response.status(201).json({
            message: "Reserva creada exitosamente",
            reservation: newReservation,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error al crear la reserva",
            error: (error as Error).message,
        });
    }
}
// DECLARE ENDPOINT
reserveRoutes.get("/books/:bookId", AuthMiddleware, BookReservationHistory);
reserveRoutes.post("/books/:bookId/reserve", AuthMiddleware, CreateReservation);

export default reserveRoutes;
