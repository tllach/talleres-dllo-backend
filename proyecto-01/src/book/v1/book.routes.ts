import { Router, Request, Response } from "express";
import { createBook, readBooks, updateBook, deleteBook } from "./book.controller";
import { AuthMiddleware } from "../../middleware/auth";
import { canCreateBooks } from "../../middleware/canCreateBooks";
import { canModifyBooks } from "../../middleware/canModifyBooks";
import { canDisableBooks } from "../../middleware/canDisableBooks";


const bookRoutes = Router();

async function CreateBook(request: Request, response: Response) {
    const bookData = request.body;
    const createdBook = await createBook(bookData);
    response.status(201).json({
        message: "Libro creado exitosamente",
        book: createdBook,
    });
}

async function GetBooks(request: Request, response: Response) {
    const bookId = request.query.id as string | null;
    
    const includeInactive = request.query.includeInactive === 'true';

    // Filtros opcionales
    const filters = {
        genre: request.query.genre as string,
        publicationDate: request.query.publicationDate ? new Date(request.query.publicationDate as string) : undefined,
        publishingHouse: request.query.publishingHouse as string,
        author: request.query.author as string,
        name: request.query.name as string,
        isAvailable: request.query.isAvailable === "true"
    };

    try {
        const result = await readBooks(bookId, filters, includeInactive);
        
        if (bookId && !result) {
            return response.status(404).json({ message: "Libro no encontrado." });
        }

        response.status(200).json({
            message: "Libros encontrados exitosamente",
            books: result,
        });
    } catch (error) {
        response.status(500).json({
            message: "Error al buscar libros.",
            error: (error as Error).message,
        });
    }
}

async function UpdateBook(request: Request, response: Response) {
    const bookId = request.params.id;
    const updateData = request.body;

    try {
        const updatedBook = await updateBook(bookId, updateData);
        response.status(200).json({
            message: "Libro actualizado exitosamente",
            book: updatedBook,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

async function DeleteBook(request: Request, response: Response) {
    const bookId = request.params.id;

    try {
        const deletedBook = await deleteBook(bookId);
        response.status(200).json({
            message: "Libro inhabilitado exitosamente",
            book: deletedBook,
        });
    } catch (error) {
        response.status(400).json({
            message: (error as Error).message,
        });
    }
}

// DECLARE ENDPOINT
bookRoutes.post("/", AuthMiddleware, canCreateBooks, CreateBook);
bookRoutes.get("/", GetBooks);
bookRoutes.put("/:id", AuthMiddleware, canModifyBooks, UpdateBook);
bookRoutes.delete("/:id", AuthMiddleware, canDisableBooks, DeleteBook);
export default bookRoutes;
