import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import faqAnimation from "../assets/Faq.json"; 

const faqs = [
  {
    question: "আমার হারানো জিনিস কীভাবে পোস্ট করব?",
    answer: "প্রথমে আপনাকে নেভবার গিয়ে লগইন করতে হবে, এরপরে লগ আউট এর সাথে আপনার প্রোফাইল পিকচার থাকবে, সেই প্রোফাইল পিকচারে ক্লিক করলে নিচে পোস্ট করার বাটন দেখতে পাবেন সেখানে ক্লিক করতে হবে",
  },
  {
    question: "আমি কীভাবে হারানো জিনিস খুঁজে পাব?",
    answer: "সাইটের সার্চ সুবিধা ব্যবহার করে শিরোনাম বা লোকেশন দিয়ে খুঁজে দেখুন।",
  },
  {
    question: "রিকভার্ড হিসেবে মার্ক করলে কী হয়?",
    answer: "এটি আইটেমটিকে 'Recovered' হিসেবে চিহ্নিত করে এবং আর প্রদর্শিত হবে না।",
  },
  {
    question: "নিরাপদে কীভাবে যোগাযোগ করব?",
    answer: "লগইন করা ইউজারের ইমেইল ব্যবহার করে ইনবক্সে মেসেজ করুন অথবা সরাসরি তার সঙ্গে কন্টাক্ট করুন।",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 via-white to-blue-50 relative overflow-hidden">
      {/* Lottie Animation */}
      <div className="absolute top-0 left-0 opacity-10 w-1/2 pointer-events-none">
        <Lottie animationData={faqAnimation} loop={true} />
      </div>
      <div className="absolute bottom-0 right-0 opacity-10 w-1/2 pointer-events-none">
        <Lottie animationData={faqAnimation} loop={true} />
      </div>

      <h2 className="text-center text-4xl font-extrabold mb-10 text-blue-800 tracking-tight relative z-10">
        ❓ প্রায় জিজ্ঞাসিত প্রশ্নাবলী
      </h2>

      <div className="max-w-3xl mx-auto px-4 space-y-6 relative z-10">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-blue-100 cursor-pointer"
            whileHover={{ y: -5, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-blue-50 transition-colors"
            >
              <span className="font-medium text-blue-900 text-lg">{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                className="text-2xl text-blue-600"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-blue-700"
                >
                  <p className="leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Optional glowing circles */}
      <div className="absolute -top-10 left-10 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>
    </section>
  );
}
