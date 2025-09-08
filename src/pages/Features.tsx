import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      title: "Send Money",
      description: "Instantly send money to friends, family, or businesses",
      icon: "💸",
    },
    {
      title: "Cash In/Out",
      description: "Easily add or withdraw money through our agent network",
      icon: "🏧",
    },
    {
      title: "Bill Payment",
      description: "Pay your utility bills, mobile recharge, and more",
      icon: "📱",
    },
    {
      title: "Bank Transfer",
      description: "Seamlessly transfer money between bank accounts",
      icon: "🏦",
    },
    {
      title: "Security",
      description: "Advanced security features to protect your money and data",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs",
      icon: "🛡️",
    },
  ];

  return (
    <div className="bg-[#355676] text-[#E6D5B8] py-16 px-6 sm:px-8 lg:px-12" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Features</h1>
          <p className="text-lg text-[#C8A978]">
            Discover all the powerful features that Amar Wallet offers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#2A4555] rounded-2xl shadow-md p-8 text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 hover:text-[#C8A978] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#E6D5B8]/80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-[#2A4555] rounded-2xl p-10 shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: 1,
                title: "Create Account",
                desc: "Sign up and verify your account in minutes",
              },
              {
                step: 2,
                title: "Add Money",
                desc: "Fund your wallet through agents or bank transfer",
              },
              {
                step: 3,
                title: "Start Transacting",
                desc: "Send money, pay bills, and more",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#355676] border-2 border-[#C8A978] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-[#C8A978]">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 hover:text-[#C8A978] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#E6D5B8]/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
