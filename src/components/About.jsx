import React from 'react';
import { CheckCircle, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
      
      {/* Decorative Gradient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-optom-green to-optom-maroon opacity-20 blur-md transform -rotate-1"></div>
              
              <div className="relative bg-optom-slate-bg rounded-3xl p-6 border border-slate-200 shadow-lg space-y-6">
                
                {/* Brand Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-optom-green to-emerald-900 text-white flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0 border-2 border-emerald-400">
                    <Eye className="w-8 h-8 text-emerald-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-optom-slate-heading">
                      VISION CARE OPTICALS
                    </h3>
                    <p className="text-xs font-bold text-optom-maroon uppercase tracking-wider">
                      Optical Excellence Showcase
                    </p>
                  </div>
                </div>

                {/* Professional Highlights Box */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                    <ShieldCheck className="w-5 h-5 text-optom-green flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-optom-slate-heading block">Precision Vision Care</span>
                      <span className="text-optom-slate-muted">Custom lens prescription & power fitting</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80">
                    <HeartHandshake className="w-5 h-5 text-teal-700 flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-optom-slate-heading block">Customer-First Guidance</span>
                      <span className="text-optom-slate-muted">Tailored frame selection for all age groups</span>
                    </div>
                  </div>
                </div>

                {/* Location Badge Footer */}
                <div className="p-3 rounded-xl bg-emerald-50 text-optom-green text-xs font-semibold text-center border border-emerald-200/60">
                  Quality Vision Care & Eyewear Showcase
                </div>

              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-optom-maroon text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                About Our Optical Showcase
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-optom-slate-heading tracking-tight leading-tight">
                Dedicated to Clear Vision, Comfort & Stylish Eyewear
              </h2>
            </div>

            <p className="text-sm sm:text-base text-optom-slate-body leading-relaxed">
              Welcome to the official product catalogue of <strong className="text-optom-slate-heading">Vision Care Opticals</strong>. Our showcase is curated to present the finest spectrum of optical solutions, precision spectacle lenses, and ergonomic frames designed for every visual requirement.
            </p>

            <p className="text-sm sm:text-base text-optom-slate-body leading-relaxed">
              Whether you need blue-light blocking lenses for long computer hours, progressive multi-focal lenses, lightweight rimless frames, or gentle contact lens care solutions, our focus remains steadfast on <strong className="text-optom-green">clear vision, ultimate comfort, and timeless optical style.</strong>
            </p>

            {/* Core Values Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-optom-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-optom-slate-heading">Ophthalmic Precision</h4>
                  <p className="text-xs text-optom-slate-body">Accurate refraction and optical center alignment for maximum visual clarity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-optom-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-optom-slate-heading">Certified Solutions</h4>
                  <p className="text-xs text-optom-slate-body">Ophthalmic grade lens cleaning fluids and multi-purpose disinfectant care kits.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-optom-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-optom-slate-heading">Ergonomic Framing</h4>
                  <p className="text-xs text-optom-slate-body">Lightweight acetate, titanium, and kids flexible TR90 frames engineered for all-day wear.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-optom-green flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-optom-slate-heading">Personalized Guidance</h4>
                  <p className="text-xs text-optom-slate-body">Expert optical advice tailored to your facial structure, lifestyle, and visual demands.</p>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
              <a
                href="#categories"
                className="px-6 py-3 rounded-xl bg-optom-green text-white font-bold text-xs hover:bg-optom-green-hover transition-colors shadow-sm"
              >
                Browse Product Catalogue
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
