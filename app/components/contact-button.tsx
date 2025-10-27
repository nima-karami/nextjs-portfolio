import Link from 'next/link';

function ContactButton() {
  return (
    <Link
      href="mailto:nkarami.dev@gmail.com"
      className="font-jura pointer-events-auto relative z-10 bg-gray-200 px-6 py-3 text-lg text-black shadow-md transition duration-300 hover:cursor-pointer hover:bg-blue-600 hover:text-white"
      aria-label="Contact Me"
    >
      Contact Me
    </Link>
  );
}

export default ContactButton;
