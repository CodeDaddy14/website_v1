import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Portfolio: 
React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform Redesign",
      category: "UI/UX Design & Development",
      description: "Complete redesign and development of a modern e-commerce platform with improved user experience and conversion rates.",
      image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      gradient: "from-blue-500 to-purple-600"
    },

    {
      title: "AI-Powered Analytics Dashboard",
      category: "AI/ML & Data Visualization",
      description: "Custom analytics dashboard with machine learning insights for business intelligence and predictive analytics.",
      image: "https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Python", "TensorFlow", "React", "D3.js"],
      gradient: "from-emerald-500 to-teal-600"
    },

    {
      title: "Brand Identity System",
      category: "Branding & Visual Identity",
      description: "Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.",
      image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Illustrator", "Photoshop", "Brand Strategy", "Print Design"],
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "CRM Integration System",
      category: "Backend Development",
      description: "Custom CRM system with third-party integrations, automated workflows, and comprehensive reporting features.",
      image: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["PHP", "Laravel", "MySQL", "API Integration"],
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Mobile App UI Design",
      category: "Mobile Design",
      description: "Modern mobile app design with intuitive navigation, micro-interactions, and seamless user experience.",
      image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Figma", "Prototyping", "Mobile UX", "Design System"],
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Data Pipeline Architecture",
      category: "Data Engineering",
      description: "Scalable data pipeline for processing large datasets with real-time analytics and automated reporting.",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Apache Spark", "Python", "AWS", "Docker"],
      gradient: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our Work
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of our recent projects demonstrating our expertise across 
            design, development, and AI/ML solutions.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="text-sm font-medium text-blue-600 mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <button className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  View Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Process</h3>
            <p className="text-lg text-slate-600">How we bring your ideas to life</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "We dive deep to understand your goals, challenges, and vision." },
              { step: "02", title: "Strategy", description: "We create a comprehensive plan tailored to your specific needs." },
              { step: "03", title: "Design & Build", description: "Our team brings the strategy to life with stunning design and robust code." },
              { step: "04", title: "Launch & Optimize", description: "We launch your project and continuously optimize for better results." }
            ].map((phase, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-xl font-bold text-blue-600">{phase.step}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{phase.title}</h4>
                <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                
                {/* Connector Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -translate-x-1/2 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;