"use client";

function About() {
  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-6">
            About Funny Shopping
          </h1>
          <p className="text-lg text-gray-700 text-center mb-10">
            Welcome to your one-stop shop for everything fun! We believe that
            shopping should be an experience, not a chore.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to bring joy and laughter into your life by
                providing a curated selection of the most entertaining and
                unique products from around the world. We're dedicated to
                finding items that spark creativity, start conversations, and
                make every day a little more special.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in a small garage with a big dream, Funny Shopping
                started as a passion project to share quirky finds with friends.
                It quickly grew into a bustling online store loved by customers
                worldwide. We may have grown, but our core value remains the
                same: to make you smile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
