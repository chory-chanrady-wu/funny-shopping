"use client";

function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white font-bold shadow-lg">
      <div className="w-full px-4 py-2 flex justify-center items-center">
        <p className="text-gray-200 text-center">
          &copy; {new Date().getFullYear()} Funny Shopping. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
