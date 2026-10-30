const urlPattern = /^https?:\/\/[^\s]+$/i;

export function isValidUrl(value) {
  return !value || urlPattern.test(String(value).trim());
}

export function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => String(tag).trim())
      .filter(Boolean);
  }

  if (!tags) {
    return [];
  }

  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function validateAuthor(author) {
  const errors = {};

  const name = String(author.name || "").trim();
  const bio = String(author.bio || "");
  const avatarUrl = String(author.avatarUrl || "").trim();

  if (!name) {
    errors.name = "Author name is required.";
  } else if (name.length < 2 || name.length > 60) {
    errors.name = "Name must be between 2 and 60 characters.";
  }

  if (bio.length > 800) {
    errors.bio = "Biography must be 800 characters or less.";
  }

  if (!isValidUrl(avatarUrl)) {
    errors.avatarUrl =
      "Enter a valid URL starting with http:// or https://.";
  }

  return errors;
}

export function validateBook(book, books = [], editingId = null) {
  const errors = {};

  const title = String(book.title || "").trim();
  const authorId = String(book.authorId || "").trim();
  const year = Number(book.year);
  const tags = normalizeTags(book.tags);
  const coverUrl = String(book.coverUrl || "").trim();
  const description = String(book.description || "");
  const currentYear = new Date().getFullYear();

  if (!title) {
    errors.title = "Book title is required.";
  } else if (title.length < 3 || title.length > 100) {
    errors.title = "Title must be between 3 and 100 characters.";
  }

  if (!authorId) {
    errors.authorId = "Author is required.";
  }

  if (
    !Number.isInteger(year) ||
    year < 1800 ||
    year > currentYear
  ) {
    errors.year = `Year must be between 1800 and ${currentYear}.`;
  }

  if (tags.length > 8) {
    errors.tags = "You can add up to 8 tags.";
  } else if (
    tags.some((tag) => tag.length < 2 || tag.length > 20)
  ) {
    errors.tags =
      "Each tag must be between 2 and 20 characters.";
  }

  if (!isValidUrl(coverUrl)) {
    errors.coverUrl =
      "Enter a valid URL starting with http:// or https://.";
  }

  if (description.length > 2000) {
    errors.description =
      "Description must be 2000 characters or less.";
  }

  const duplicate = books.some(
    (item) =>
      String(item.id) !== String(editingId) &&
      String(item.authorId) === authorId &&
      String(item.title || "").trim().toLowerCase() ===
        title.toLowerCase()
  );

  if (duplicate) {
    errors.title =
      "This author already has a book with this title.";
  }

  return errors;
}