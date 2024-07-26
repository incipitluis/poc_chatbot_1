import React from 'react';
import Link from 'next/link';

interface MessageRendererProps {
  message: string;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
  const contactButtonRegex = /\[Contacta con nosotros\]/g;
  const parts = message.split(contactButtonRegex);

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index !== parts.length - 1 && (
            <Link href="/contact" className="bg-gray-700 text-white px-4 py-2 ml-2 mt-2 mb-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300 inline-block">
                ¡Reserva!
            </Link>
          )}
        </span>
      ))}
    </>
  );
};

export default MessageRenderer;
