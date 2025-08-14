import React, { useEffect, useState } from "react";
import UiTestimonials from "./UiTestimonials";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-100 to-blue-50 text-center">
      <h2 className="text-4xl font-bold mb-8 text-blue-800">User Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <UiTestimonials key={index} testimonials={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
