'use client';

import { useCallback } from 'react';

function ContactButton() {
  const onContactClick = useCallback(() => {
    // Add your contact logic here (e.g., open modal, mailto link, etc.)
    console.log('Contact button clicked');
  }, []);

  return (
    <button
      onClick={onContactClick}
      className="pointer-events-auto relative z-10 bg-gray-200 px-6 py-3 text-lg font-semibold text-black shadow-md transition duration-300 hover:cursor-pointer hover:bg-blue-600 hover:text-white"
      aria-label="Open contact form"
    >
      Contact Me
    </button>
  );
}

export default ContactButton;
