import mongoose from "mongoose";
import { BookModel, BookType } from "./book.model";

// Buscar libro por ID
async function findBookById(bookId: string, includeInactive: boolean = false): Promise<BookType | null> {
    // Limpiar el bookId de espacios o saltos de línea
    bookId = bookId.trim();

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("ID de libro no válido.");
    }

    const query = includeInactive ? { _id: bookId } : { _id: bookId, isAvailable: true };

    return await BookModel.findOne(query);
}

// Buscar libros por filtros
async function findBooksByFilters(filters: Partial<BookType>, includeInactive: boolean = false): Promise<BookType[]> {
    const query: any = includeInactive ? {} : { isAvailable: true };

    if (filters.genre) query.genre = { $regex: filters.genre, $options: "i" };
    if (filters.publishingHouse) query.publishingHouse = { $regex: filters.publishingHouse, $options: "i" };
    if (filters.author) query.author = { $regex: filters.author, $options: "i" };
    if (filters.name) query.name = { $regex: filters.name, $options: "i" };

    if (filters.publicationDate) {
        const startOfDay = new Date(filters.publicationDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(filters.publicationDate);
        endOfDay.setHours(23, 59, 59, 999);
        query.publicationDate = { $gte: startOfDay, $lte: endOfDay };
    }

    return await BookModel.find(query);
}

export { findBookById, findBooksByFilters };
