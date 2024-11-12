import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function deleteBookAction(bookId: string): Promise<BookType | null> {
    return await BookModel.findByIdAndUpdate(bookId, { isAvailable: false }, { new: true });
}

// EXPORT ACTION FUNCTION
export default deleteBookAction;
