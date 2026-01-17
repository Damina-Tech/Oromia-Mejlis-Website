"use client";

import Link from "next/link";
import { Project } from "@/lib/strapi";

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<string, string> = {
  Ongoing: "bg-blue-600",
  Active: "bg-green-600",
  Planned: "bg-yellow-600",
  Completed: "bg-gray-600",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = statusColors[project.status] || "bg-gray-600";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <Link href={`/projects/${project.slug}`}>
        <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center overflow-hidden relative">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
              🏗️
            </div>
          )}
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`${statusColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg`}
            >
              {project.status}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Type Badge */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {project.type}
          </span>
        </div>

        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {project.description}
        </p>

        {/* Department */}
        {project.department && (
          <div className="mb-4 text-sm text-gray-500">
            <span className="font-semibold">Department:</span> {project.department}
          </div>
        )}

        {/* Read More Button */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-md transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transform"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

