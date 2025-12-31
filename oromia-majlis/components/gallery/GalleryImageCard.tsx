"use client";

interface GalleryImageCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function GalleryImageCard({
  id,
  title,
  category,
  image,
}: GalleryImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-gray-200 to-gray-300 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Placeholder */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-7xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">
          {image}
        </div>
      </div>

      {/* Hover Overlay with Title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <div className="text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/90 text-sm capitalize">
            {category.replace("-", " ")}
          </p>
        </div>
      </div>
    </div>
  );
}

