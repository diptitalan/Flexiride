import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqList: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqList }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="w-full bg-[#fffbf3] py-12 px-4 sm:px-6 md:px-8 font-sans mt-12 h-[632px] overflow-y-hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 ">
        {/* Left Column - Label */}
        <div className="lg:w-1/3">
          <p className="text-xl text-gray-600 font-semibold tracking-wide">(FAQ)</p>
        </div>

        {/* Right Column - Questions */}
        <div className="lg:w-2/3 overflow-y-auto">
          {faqList.map((faq, index) => (
            <div key={faq.id} className="border-b border-gray-300 py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-base sm:text-lg font-semibold text-black">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-600" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;