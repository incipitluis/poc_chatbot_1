'use client'
import React from 'react';
import { useChat } from "@ai-sdk/react";

export const ArtieBot = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat()

    return (
        <section className="text-center flex flex-col w-full max-w-4xl mx-auto h-2/3 bg-opacity-45 dark:bg-opacity-30 bg-stone-700 dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Discover Your Perfect Tattoo Artist!</h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-300 mb-6">Let our AI find your ideal match</h3>
            <div className='flex flex-col w-full h-80 overflow-auto bg-opacity-30 dark:bg-opacity-30 bg-stone-400 dark:bg-gray-700 p-4 rounded-lg shadow-inner'>
                <ul className='flex flex-col space-y-3'>
                    {messages.map((m, index) => (
                        <li 
                            key={index} 
                            className={`p-3 rounded-lg ${m.role === "user" ? "bg-stone-700 text-white self-end shadow-user" : "bg-gray-600 text-gray-300 self-start shadow-bot"}`}
                        >
                            <span className="font-bold">{m.role === "user" ? "User: " : "Artie: "}</span>
                            {m.content}
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
                <input 
                    placeholder="Describe your idea" 
                    value={input} 
                    onChange={handleInputChange} 
                    className="flex-grow bg-opacity-45 dark:bg-opacity-30 dark:bg-gray-600 outline-none dark:text-white p-3 rounded-lg shadow-inner"
                />
                <button type="submit" className="bg-gray-700 text-white px-4 py-3 rounded-lg shadow-md hover:invert transition-colors duration-300">Send</button>
            </form>
        </section>
    )
}
