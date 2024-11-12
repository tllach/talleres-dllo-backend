import { ReservationModel, ReservationType } from "./reserve.model";

async function readReserve(bookId: string): Promise<ReservationType[]> {
    return await ReservationModel.find({ book: bookId })
        .populate("user", "name") 
        .select("reservationDate returnDate user");
}

export default readReserve;
