import { BookType } from "./book.model";

export type CreateBookType = Omit<BookType, "_id">;
export type UpdateBookType = Omit<Partial<BookType>, "_id">;
export type BookReferenceType = {
    _id: string;
    name: string;
};
