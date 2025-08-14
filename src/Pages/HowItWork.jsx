import { motion } from "framer-motion";

const steps = [
  { icon: "📍", title: "Report Lost Item", desc: "Post your lost item with details." },
  { icon: "🔍", title: "Browse Found Items", desc: "Search or filter all found items easily." },
  { icon: "🤝", title: "Connect with Finder", desc: "Get in touch with the person who found it." },
  { icon: "✅", title: "Get It Back!", desc: "Arrange to recover your lost belonging safely." },
];

export default function HowItWorks() {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-blue-100 text-center">
      <h2 className="text-3xl font-bold mb-8 text-blue-800">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-6 hover:shadow-2xl transition"
           
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: index * 0.3, 
            }}
          >
            <div className="text-4xl mb-3">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">{step.title}</h3>
            <p className="text-blue-700">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
