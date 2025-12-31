"use client";

const socialLinks = [
  {
    name: "Facebook",
    icon: "f",
    color: "bg-blue-600",
    href: "#",
  },
  {
    name: "X (Twitter)",
    icon: "X",
    color: "bg-blue-500",
    href: "#",
  },
  {
    name: "Pinterest",
    icon: "P",
    color: "bg-red-600",
    href: "#",
  },
  {
    name: "LinkedIn",
    icon: "in",
    color: "bg-blue-700",
    href: "#",
  },
];

export default function ShareButtons() {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Share Article</h3>
      <div className="flex gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            className={`${social.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold hover:opacity-80 transition-opacity`}
            aria-label={`Share on ${social.name}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

