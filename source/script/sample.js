
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
    this.title = title;
    this.author = author;
}

/**
 * Get the book description.
 * @return {string} Description of the book.
 */
Book.prototype.getDescription = function() {
    return `${this.title} by ${this.author}`;
};
