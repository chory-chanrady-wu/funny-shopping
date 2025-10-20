"use client";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Contact Us</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center">
        Have questions or need assistance? Reach out to us anytime at
        <span className="font-medium text-blue-700">
          {" "}
          support@funnyshopping.com
        </span>
        . We're here to help!
      </p>
    </div>
  );
}

export default Contact;
