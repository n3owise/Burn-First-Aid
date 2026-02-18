import React from 'react';
import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { HOME_FOOTER_DATA } from '../constants';

interface HomeFooterProps {
  lang: 'en' | 'hi';
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ lang }) => {
  const data = HOME_FOOTER_DATA;

  return (
    <section className="w-full px-4 pb-3 pt-1.5">
      <div className="rounded-[20px] bg-gradient-to-br from-[#f4f5f8] via-[#eef3fa] to-[#e8f1fb] border border-[#e1e6ef] shadow-[0_8px_20px_rgba(15,23,42,0.07)] p-1.5">
        <div className="rounded-[18px] border border-white/70 bg-gradient-to-r from-white/90 via-[#f3f5fb] to-[#e8f2fd] overflow-hidden">
          <div className="flex min-h-[125px]">
            <div className="w-[30%] min-w-[85px] bg-gradient-to-b from-[#f3f5fa] to-[#dbe9f8] flex items-end justify-center overflow-hidden">
              <img
                src={data.doctorImage}
                alt={data.doctorName}
                className="h-full w-full object-cover object-[30%_center]"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = '/images/hospital.jpg';
                }}
              />
            </div>

            <div className="flex-1 p-2">
              <div>
                <h3 className="text-[18px] leading-[1.1] font-semibold text-[#1e2433]">{data.doctorName}</h3>
                <p className="text-[11px] text-[#5d6578] mt-0.5">{data.qualifications}</p>
                <p className="text-[11px] text-[#5d6578]">{data.specialty}</p>
              </div>

              <div className="mt-1.5 py-1.5 border-t border-b border-[#dbe1eb]">
                <p className="text-[11px] font-semibold text-[#1f2636] leading-tight">{data.experienceTitle}</p>
                <p className="text-[9px] text-[#5f6780] mt-0.5 leading-tight">{data.experienceSubtitle}</p>
              </div>

              <div className="mt-1.5">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-[#6e778b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#1f2636] leading-tight">{data.hospitalName}</p>
                    <p className="text-[10px] text-[#5f6780] mt-0.5 leading-tight">{data.addressLine1}</p>
                    <p className="text-[10px] text-[#5f6780] mt-0.5 leading-tight">{data.addressLine2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 border-t border-[#dce3ee] bg-white/70">
            <div className="flex items-center gap-1 px-1.5 py-1.5 border-r border-[#dce3ee] min-w-0">
              <Phone className="w-3 h-3 text-[#2b6650] flex-shrink-0" />
              <span className="text-[10px] font-medium text-[#243143] truncate">{data.phone}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-1.5 border-r border-[#dce3ee] min-w-0">
              <MessageCircle className="w-3 h-3 text-[#1f9d59] flex-shrink-0" />
              <span className="text-[10px] font-medium text-[#243143] truncate">{data.whatsappLabel}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-1.5 border-r border-[#dce3ee] min-w-0">
              <Mail className="w-3 h-3 text-[#5f7896] flex-shrink-0" />
              <span className="text-[10px] font-medium text-[#243143] truncate">{data.email}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-1.5 min-w-0">
              <Globe className="w-3 h-3 text-[#5f7896] flex-shrink-0" />
              <span className="text-[10px] font-medium text-[#243143] truncate">{data.website}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};