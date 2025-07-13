import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      content: "Working with this team was an absolute game-changer for our startup. Their AI-powered analytics dashboard not only looks stunning but has increased our operational efficiency by 40%. The attention to detail and technical expertise is unmatched.",
      rating: 5,
      image: "https://images.pexels.com/photos/3781538/pexels-photo-3781538.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency Pro",
      content: "The complete rebrand they delivered exceeded all our expectations. From logo design to digital presence, every element perfectly captured our vision. Our client acquisition has increased by 60% since the rebrand launch.",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Emily Johnson",
      role: "Founder",
      company: "EcoCommerce Solutions",
      content: "Their e-commerce platform development transformed our business. The custom CRM integration and seamless user experience have doubled our conversion rates. Professional, reliable, and incredibly talented team.",
      rating: 5,
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "DataFlow Systems",
      content: "The data pipeline architecture they built for us handles millions of records flawlessly. Their expertise in both data engineering and AI implementation saved us months of development time and delivered outstanding results.",
      rating: 5,
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Lisa Thompson",
      role: "Product Manager",
      company: "InnovateLab",
      content: "Their mobile app design is not just beautiful—it's intuitive and user-friendly. Our app store ratings improved from 3.2 to 4.8 stars after implementing their design. Exceptional work and great communication throughout.",
      rating: 5,
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it—hear from the clients who've experienced 
            the transformative power of our digital solutions.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12">
          {/* Quote Icon */}
          <div className="absolute top-8 left-8">
            <Quote className="w-12 h-12 text-blue-200" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Client Photo */}
            <div className="text-center md:text-left">
              <img 
                src={testimonials[currentTestimonial].image} 
                alt={testimonials[currentTestimonial].name}
                className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0 mb-4 shadow-lg"
              />
              <div className="flex justify-center md:justify-start mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="md:col-span-2">
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <cite className="text-xl font-bold text-slate-900 not-italic">
                  {testimonials[currentTestimonial].name}
                </cite>
                <div className="text-slate-600">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="text-blue-600 font-medium">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 pointer-events-auto"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 pointer-events-auto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-slate-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <div className="text-slate-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
            <div className="text-slate-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-slate-600">On-Time Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;