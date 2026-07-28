"use client";

import { useState } from "react";
import { Award, CheckCircle2, Maximize2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Certification } from "@/types";

export function CertificationsSection({
  certifications,
}: {
  certifications?: Certification[];
}) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="w-full bg-muted/20 py-16 sm:py-24 border-t border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <CheckCircle2 className="size-3.5" />
            <span>Verified Professional Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Qualifications &amp; Certifications
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Fully certified practitioner with recognized qualifications in massage therapy, bodywork, and holistic wellness.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-5 shadow-xs hover:shadow-md hover:border-primary/50 transition-all cursor-pointer"
            >
              <div>
                <div className="relative mb-4 aspect-4/3 w-full overflow-hidden rounded-xl bg-muted border border-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.public_url}
                    alt={cert.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/logo.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                      <Maximize2 className="size-3.5 text-primary" /> View Certificate
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  {cert.issue_year && (
                    <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {cert.issue_year}
                    </span>
                  )}
                </div>

                {cert.issuer && (
                  <p className="mt-1 text-xs font-medium text-primary/90 flex items-center gap-1">
                    <Award className="size-3 shrink-0" />
                    <span>{cert.issuer}</span>
                  </p>
                )}

                {cert.description && (
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span>Click to inspect</span>
                <Maximize2 className="size-3.5 text-muted-foreground/70 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Dialog */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          {selectedCert && (
            <div>
              <DialogHeader className="mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                  <Award className="size-4" />
                  <span>Official Certificate</span>
                </div>
                <DialogTitle className="text-xl font-bold text-foreground sm:text-2xl mt-1">
                  {selectedCert.title}
                </DialogTitle>
                {(selectedCert.issuer || selectedCert.issue_year) && (
                  <DialogDescription className="text-sm text-muted-foreground font-medium">
                    Issued by {selectedCert.issuer || "Accredited Body"} {selectedCert.issue_year ? `(${selectedCert.issue_year})` : ""}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="relative my-4 w-full overflow-hidden rounded-xl border bg-muted p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCert.public_url}
                  alt={selectedCert.title}
                  className="mx-auto max-h-[60vh] w-full object-contain rounded-lg shadow-xs"
                />
              </div>

              {selectedCert.description && (
                <div className="mt-4 rounded-lg bg-muted/30 p-4 border text-sm text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground mb-1 text-xs uppercase tracking-wider">Overview</p>
                  {selectedCert.description}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <a
                  href={selectedCert.public_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <ExternalLink className="size-3.5 text-primary" /> Open High-Res Original
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
