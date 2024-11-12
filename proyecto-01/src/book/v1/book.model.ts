import { model, Schema } from "mongoose";

// DECLARE MODEL TYPE
type BookType = {
    genre: string;
    publicationDate: Date;
    publishingHouse: string;
    author: string;
    name: string;
    isAvailable: boolean;
};

// DECLARE MONGOOSE SCHEMA
const BookSchema = new Schema<BookType>({
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    publishingHouse: { type: String, required: true },
    author: { type: String, required: true },
    name: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});

// DECLARE MONGO MODEL
const BookModel = model<BookType>("Book", BookSchema);

// EXPORT ALL
export { BookModel, BookType };
