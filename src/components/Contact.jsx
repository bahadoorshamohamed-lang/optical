import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink, MessageCircle, Navigation, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-optom-slate-bg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-optom-green text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Clinic Location & Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-optom-slate-heading tracking-tight">
            Visit Our Optical Clinic & Showroom
          </h2>
          <p className="text-sm sm:text-base text-optom-slate-body">
            Get in touch directly with Abdul Wahab B.Sc. Optom. for optical product inquiries, lens selection, or in-store frame fitting.
          </p>
        </div>

        {/* Grid: Contact Cards + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Information Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Main Optometrist Badge Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-optom-slate-heading">
                    {BUSINESS_INFO.name}
                  </h3>
                  <p className="text-xs font-bold text-optom-maroon uppercase tracking-widest mt-0.5">
                    {BUSINESS_INFO.profession}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-emerald-100 text-optom-green">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Clickable Phone Link */}
              <a 
                href={`tel:${BUSINESS_INFO.phone}`}
                className="group flex items-start gap-4 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-100/80 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-optom-green text-white group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-optom-slate-muted uppercase tracking-wider block">
                    Phone Number (Click to Call)
                  </span>
                  <span className="text-base font-extrabold text-optom-green group-hover:underline">
                    {BUSINESS_INFO.phone}
                  </span>
                  <span className="text-[11px] text-optom-slate-body block">
                    Available for direct inquiries
                  </span>
                </div>
              </a>

              {/* Clickable Email Link */}
              <a 
                href={`mailto:${BUSINESS_INFO.email}`}
                className="group flex items-start gap-4 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 hover:bg-rose-100/80 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-optom-maroon text-white group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-optom-slate-muted uppercase tracking-wider block">
                    Email Address (Click to Write)
                  </span>
                  <span className="text-sm font-bold text-optom-maroon group-hover:underline break-all">
                    {BUSINESS_INFO.email}
                  </span>
                  <span className="text-[11px] text-optom-slate-body block">
                    Send your questions anytime
                  </span>
                </div>
              </a>

              {/* Physical Address Block */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="p-2.5 rounded-xl bg-slate-800 text-white flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-optom-slate-muted uppercase tracking-wider block">
                    Clinic & Showroom Address
                  </span>
                  <address className="not-italic text-xs font-bold text-optom-slate-heading leading-relaxed">
                    {BUSINESS_INFO.addressLine1}<br />
                    {BUSINESS_INFO.addressLine2}<br />
                    <span className="text-optom-green font-extrabold">{BUSINESS_INFO.cityStatePincode}</span>
                  </address>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-3 text-xs text-optom-slate-body pt-1">
                <Clock className="w-4 h-4 text-optom-green flex-shrink-0" />
                <span>
                  <strong>Opening Hours:</strong> Mon – Sat: 9:30 AM – 9:00 PM
                </span>
              </div>

            </div>

            {/* Quick WhatsApp Inquiry Action Card */}
            <div className="bg-gradient-to-r from-emerald-800 to-optom-green rounded-3xl p-6 text-white flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider block">
                  Quick Mobile Connect
                </span>
                <h4 className="text-base font-bold">Have a Lens or Frame Query?</h4>
                <p className="text-xs text-emerald-100/90">Call or message for product availability in Thanjavur.</p>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="p-3 rounded-2xl bg-white text-optom-green font-bold text-xs hover:bg-emerald-50 transition-colors shadow-lg flex-shrink-0 flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-optom-maroon" />
                <span>Call Now</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Location Embed & Directions */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-optom-slate-heading flex items-center gap-2">
                  <span>Location Map</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-optom-green text-xs font-bold">
                    Thanjavur
                  </span>
                </h3>
                <p className="text-xs text-optom-slate-body mt-0.5">
                  Located conveniently in New Housing Unit, Thanjavur.
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-optom-green text-white text-xs font-bold hover:bg-optom-green-hover transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
              <iframe
                title="Abdul Wahab Optometrist Location Map"
                src={`https://maps.google.com/maps?q=${BUSINESS_INFO.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Map Legend / Directions Box */}
            <div className="p-4 rounded-2xl bg-optom-slate-bg border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-optom-slate-body">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-optom-maroon flex-shrink-0" />
                <span>
                  <strong>Landmark:</strong> Neithal Street, New Housing Unit, Thanjavur - 613005.
                </span>
              </div>
              <span className="font-semibold text-optom-green bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                Easy Parking Available
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
