import React from "react";



const About: React.FC = () => {


  

  return (
    <div className="relative min-h-screen" id="about">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#355676]/90"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#E6D5B8]">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-12 text-center">About Amar Wallet</h1>

        {/* Our Story */}
        <div className="bg-[#355676]/60 backdrop-blur-md shadow-lg rounded-lg p-8 mb-8 transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Amar Wallet was founded in 2025 with a mission to make financial
            services accessible to everyone. We believe managing your money
            should be simple, secure, and convenient.
          </p>
          <p>
            Our team of financial experts and technology enthusiasts has built a
            platform that combines cutting-edge security with an intuitive user
            experience.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#355676]/60 backdrop-blur-md shadow-lg rounded-lg p-8 mb-8 transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            To democratize financial services by providing a secure, accessible,
            and user-friendly Amar wallet that empowers individuals and
            businesses to manage their finances effectively.
          </p>
        </div>

        {/* Team */}
        <div className="bg-[#355676]/60 backdrop-blur-md shadow-lg rounded-lg p-8 mb-12 transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "MD Mashrafil Hossain", role: "CEO & Founder" },
              { name: "Razia Sultana", role: "CTO" },
              { name: "Mahi", role: "Head of Security" },
            ].map((member, idx) => (
              <div
                key={idx}
                className="text-center bg-[#355676]/70 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <div className="w-24 h-24 bg-[#E6D5B8] rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-[#C8A978]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default About;
