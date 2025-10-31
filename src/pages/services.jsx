"use client";

import { Truck, ShieldCheck, Sparkles } from "lucide-react";

function Services() {
  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Our Commitment to You
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We offer a variety of services to make your shopping experience as
            enjoyable and seamless as possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <Truck size={48} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Get your fun items delivered to your doorstep in no time with our
              reliable and speedy shipping network.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShieldCheck size={48} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Excellent Support
            </h3>
            <p className="text-gray-600">
              Our friendly customer support team is always here to help you with
              any questions or concerns.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <Sparkles size={48} className="text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Exclusive Deals
            </h3>
            <p className="text-gray-600">
              Enjoy access to unique products and special discounts that you
              won't find anywhere else.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
