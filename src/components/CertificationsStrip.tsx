import { Badge } from "./ui/badge";
import { ShieldCheck, Award, Leaf, FileCheck } from "lucide-react";

const certifications = [
  {
    icon: ShieldCheck,
    name: "ISO 9001:2015",
    description: "Qualitätsmanagement",
  },
  {
    icon: Award,
    name: "ISO 3834-2",
    description: "Schweißtechnik",
  },
  {
    icon: Leaf,
    name: "ISO 14001",
    description: "Umweltmanagement",
  },
  {
    icon: FileCheck,
    name: "ISO 45001",
    description: "Arbeitsschutz",
  },
];

export function CertificationsStrip() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <cert.icon className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              <div>
                <div className="mb-1 text-gray-900">{cert.name}</div>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
