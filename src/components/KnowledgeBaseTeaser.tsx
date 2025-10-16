import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, FileText, Video, ArrowRight } from "lucide-react";

const resources = [
  {
    icon: FileText,
    title: "Technische Dokumentationen",
    description: "Umfassende Anleitungen und Datenblätter für alle Verfahren",
    count: "45+ Dokumente",
  },
  {
    icon: Video,
    title: "Video-Tutorials",
    description: "Einblicke in unsere Fertigungsprozesse und Technologien",
    count: "12 Videos",
  },
  {
    icon: BookOpen,
    title: "Fachartikel & Whitepaper",
    description: "Expertenwissen zu Materialien, Verfahren und Best Practices",
    count: "28 Artikel",
  },
];

interface KnowledgeBaseTeaserProps {
  visitorType: "B2B" | "B2C";
}

export function KnowledgeBaseTeaser({ visitorType }: KnowledgeBaseTeaserProps) {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mb-6 text-gray-900">
              {visitorType === "B2B" ? "Technisches Expertenwissen auf höchstem Niveau" : "Ratgeber & Anleitungen"}
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {visitorType === "B2B" ? (
                <>
                  Zugang zu unserem umfassenden Engineering-Wissen. Detaillierte Dokumentationen, 
                  technische Spezifikationen und Best Practices, entwickelt von Branchenexperten 
                  mit jahrzehntelanger Erfahrung in anspruchsvollsten Anwendungen.
                </>
              ) : (
                <>
                  Hilfreiche Tipps und Anleitungen für Ihre Projekte. Von der Materialauswahl 
                  bis zur Montage – unser Wissensbereich unterstützt Sie bei jedem Schritt.
                </>
              )}
            </p>
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
              Zum Wissensbereich
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            {resources.map((resource) => (
              <Card 
                key={resource.title}
                className="p-6 hover:shadow-sm transition-shadow cursor-pointer group border border-gray-200 hover:border-gray-900"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
                      <resource.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-gray-900">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                    <p className="text-sm text-gray-900">{resource.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
