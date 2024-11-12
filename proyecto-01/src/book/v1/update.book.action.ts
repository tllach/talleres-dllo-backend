import { BookModel, BookType } from "./book.model";

// DECLARE ACTION FUNCTION
async function updateBookAction(bookId: string, updateData: Partial<BookType>): Promise<BookType | null> {
    return await BookModel.findByIdAndUpdate(bookId, updateData, { new: true });
}

// EXPORT ACTION FUNCTION
export default updateBookAction;
