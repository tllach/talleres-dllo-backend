import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function createBookAction(bookData: BookType): Promise<BookType> {
    return await BookModel.create(bookData);
}

// EXPORT ACTION FUNCTION
export default createBookAction;
