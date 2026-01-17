import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group hover:opacity-90 transition-opacity">
      <div className="relative h-14 w-72 md:h-16 md:w-80 lg:h-14 lg:w-60 flex items-center">
        {/* Rectangular Logo Container */}
        <div className="relative w-full h-full bg-gradient-to-r from-green-600 via-green-600 to-green-700 rounded-md shadow-lg overflow-hidden border-2 border-white/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:15px_15px]"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-between px-3 md:px-4">
            {/* Left Side - Mosque Icon */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                {/* Three Minarets */}
                <div className="absolute left-0 top-0 w-0.5 h-8 md:h-10 bg-white">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full">
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-0.5 h-9 md:h-11 bg-white">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full">
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-0.5 h-8 md:h-10 bg-white">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full">
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                
                {/* Mosque Dome */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-5 md:w-10 md:h-6 bg-white rounded-t-full"></div>
                
                {/* Open Book (Quran) */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-3 md:w-6 md:h-4 bg-white rounded-sm shadow-sm">
                  <div className="absolute left-1/2 top-0.5 bottom-0.5 w-px bg-green-600"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-600/50"></div>
                </div>
              </div>
            </div>

            {/* Center - Text Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-2 min-w-0">
              {/* Arabic Text - Top */}
              <div className="text-white text-[10px] md:text-xs font-bold mb-0.5 leading-tight" dir="rtl" style={{ fontFamily: 'Arial, sans-serif' }}>
                المجلس الأعلى للشؤون الإسلامية
              </div>
              
              {/* English Text - Main */}
              <div className="text-white text-[9px] md:text-[10px] lg:text-xs font-bold uppercase leading-tight">
                <div>Oromia Islamic Affairs</div>
                <div className="text-[8px] md:text-[9px]">Supreme Council</div>
              </div>
              
              {/* Amharic Text - Bottom */}
              <div className="text-white text-[8px] md:text-[9px] font-semibold mt-0.5 leading-tight" style={{ fontFamily: 'serif' }}>
                የኦሮሚያ ክልል እስልምና ጉዳዮች ጠቅላይ ም/ቤት
              </div>
            </div>

            {/* Right Side - Arabic Calligraphy */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center gap-0.5 px-1">
              <div className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-none" dir="rtl" style={{ fontFamily: 'serif', lineHeight: '1' }}>
                الله
              </div>
              <div className="text-white text-xs md:text-sm font-bold leading-none" dir="rtl" style={{ fontFamily: 'serif' }}>
                أكبر
              </div>
            </div>
          </div>

          {/* Decorative Border Lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30"></div>
        </div>
      </div>
    </Link>
  );
}

