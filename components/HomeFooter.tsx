import React from 'react';
import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { HOME_FOOTER_DATA } from '../constants';

interface HomeFooterProps {
  lang: 'en' | 'hi';
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ lang }) => {
  const data = HOME_FOOTER_DATA;

  return (
    <section className="w-full px-4 pb-4 pt-2">
      <div className="rounded-[24px] bg-gradient-to-br from-[#f4f5f8] via-[#eef3fa] to-[#e8f1fb] border border-[#e1e6ef] shadow-[0_10px_24px_rgba(15,23,42,0.08)] p-2">
        <div className="rounded-[20px] border border-white/70 bg-gradient-to-r from-white/90 via-[#f3f5fb] to-[#e8f2fd] overflow-hidden">
          <div className="flex min-h-[170px]">
            <div className="w-[31%] min-w-[96px] bg-gradient-to-b from-[#f3f5fa] to-[#dbe9f8] flex items-end justify-center overflow-hidden">
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

            <div className="flex-1 p-3">
              <div className="flex items-start justify-between gap-2.5">
                <div>
                  <h3 className="text-[21px] leading-[1.1] font-semibold text-[#1e2433]">{data.doctorName}</h3>
                  <p className="text-[12px] text-[#5d6578] mt-0.5">{data.qualifications}</p>
                  <p className="text-[12px] text-[#5d6578]">{data.specialty}</p>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-[#d9e8f9] to-[#dfe6f7] px-2.5 py-1.5 min-w-[145px]">
                  <p className="text-[13px] font-semibold text-[#1f2636] leading-tight">{data.experienceTitle}</p>
                  <p className="text-[11px] text-[#5f6780] mt-0.5 leading-tight">{data.experienceSubtitle}</p>
                </div>
              </div>

              <div className="mt-2.5 border-t border-[#dbe1eb] pt-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#6e778b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-semibold text-[#1f2636] leading-tight">{data.hospitalName}</p>
                    <p className="text-[11px] text-[#5f6780] mt-0.5 leading-tight">{data.addressLine1}</p>
                    <p className="text-[11px] text-[#5f6780] mt-0.5 leading-tight">{data.addressLine2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 border-t border-[#dce3ee] bg-white/70">
            <div className="flex items-center gap-1.5 px-2 py-2 border-r border-[#dce3ee] min-w-0">
              <Phone className="w-3.5 h-3.5 text-[#2b6650] flex-shrink-0" />
              <span className="text-[11px] font-medium text-[#243143] truncate">{data.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-2 border-r border-[#dce3ee] min-w-0">
              <MessageCircle className="w-3.5 h-3.5 text-[#1f9d59] flex-shrink-0" />
              <span className="text-[11px] font-medium text-[#243143] truncate">{data.whatsappLabel}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-2 border-r border-[#dce3ee] min-w-0">
              <Mail className="w-3.5 h-3.5 text-[#5f7896] flex-shrink-0" />
              <span className="text-[11px] font-medium text-[#243143] truncate">{data.email}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-2 min-w-0">
              <Globe className="w-3.5 h-3.5 text-[#5f7896] flex-shrink-0" />
              <span className="text-[11px] font-medium text-[#243143] truncate">{data.website}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};