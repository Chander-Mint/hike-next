'use client';

const ItemCard = ({ title, content, imageUrl, onEdit, onDelete }) => {
    const truncateContent = (html, maxLength = 120) => {
        const stripHtml = (str) => {
            return str.replace(/<\/?[^>]+(>|$)/g, '');
        };

        const plainText = stripHtml(html || '');
        if (plainText.length <= maxLength) {
            return plainText;
        }
        return plainText.substring(0, maxLength) + '...';
    };

    const sanitizeHtml = (html) => {
        if (!html) return '';
        let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        sanitized = sanitized.replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '');
        return sanitized;
    };

    // Truncate and sanitize content
    const truncatedText = truncateContent(content);
    // Wrap truncated text in a <p> tag to maintain HTML rendering
    const sanitizedContent = sanitizeHtml(`<p>${truncatedText}</p>`);

    return (
        <div className="border rounded-md shadow-sm p-4 bg-white">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                </div>
            )}
            <div
                className="text-gray-700 text-sm mb-4"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <button
                    onClick={onEdit}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Edit testimonial"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ItemCard;