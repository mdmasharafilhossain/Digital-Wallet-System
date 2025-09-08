import React, { useState } from "react";

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Click on the Register button and follow the simple steps to create your account."
  },
  {
    question: "Is my money safe?",
    answer: "Yes, we use bank-level security measures to protect your funds and personal information."
  },
  {
    question: "How long do transfers take?",
    answer: "Most transfers are instant, but some may take up to 24 hours depending on the method."
  },
  {
    question: "Can I use the wallet internationally?",
    answer: "Currently, the wallet is only available for domestic transactions within Bangladesh."
  },
 {
    question: "Does it cost anything to use?",
    answer:
      "Creating an account is free. Some premium features or transfers may include small fees.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#355676] text-[#E6D5B8] py-16 px-6 sm:px-8 lg:px-12 min-h-screen" id="faq">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-[#C8A978]">
            Answers to the most common questions about Amar Wallet
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-[#2A4555] rounded-2xl p-6 cursor-pointer shadow-lg transition-all hover:shadow-xl"
              onClick={() => toggleIndex(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-[#E6D5B8]/90">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
