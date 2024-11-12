import createBookAction from "./create.book.action";
import { findBookById, findBooksByFilters } from "./read.book.action";
import updateBookAction from "./update.book.action";
import deleteBookAction from "./delete.book.action";
import { BookType, BookModel } from "./book.model";



async function createBook(bookData: BookType): Promise<BookType> {
    return await createBookAction(bookData);
}

async function readBooks(bookId: string | null, filters: Partial<BookType>, includeInactive: boolean = false): Promise<BookType | BookType[] | null> {
    if (bookId) {
        return await findBookById(bookId, includeInactive);
    } else {
        return await findBooksByFilters(filters, includeInactive);
    }
}

async function updateBook(bookId: string, updateData: Partial<BookType>): Promise<BookType | null> {
    // Verificar si el libro ya está inhabilitado
    const bookToBeUpdated = await BookModel.findById(bookId);
    if (!bookToBeUpdated) {
        throw new Error("Libro no encontrado.");
    }

    if (!bookToBeUpdated.isAvailable) {
        throw new Error("El libro ya está inhabilitado y no se puede actualizar.");
    }

    return await updateBookAction(bookId, updateData);
}

async function deleteBook(bookId: string): Promise<BookType | null> {
    // Verificar si el libro ya está inhabilitado
    const bookToBeDeleted = await BookModel.findById(bookId);
    if (!bookToBeDeleted) {
        throw new Error("Libro no encontrado.");
    }

    if (!bookToBeDeleted.isAvailable) {
        throw new Error("El libro ya está inhabilitado.");
    }

    return await deleteBookAction(bookId);
}

export { createBook, readBooks, updateBook, deleteBook };
