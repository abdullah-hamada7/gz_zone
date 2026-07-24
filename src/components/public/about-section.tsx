import Image from "next/image";
import { Shield, Heart, Award, Lock } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Professional Approach",
    description:
      "Every treatment is delivered with the highest standards of professionalism and care.",
  },
  {
    icon: Heart,
    title: "Respectful Environment",
    description:
      "Your comfort, privacy, and personal boundaries are respected throughout the entire experience.",
  },
  {
    icon: Award,
    title: "Personalized Treatment",
    description:
      "Each session is tailored to your specific needs and preferences.",
  },
  {
    icon: Lock,
    title: "Privacy and Comfort",
    description:
      "Your treatment takes place in the privacy of your chosen location.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="mb-2 text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          About
        </h2>
        <h3 className="mb-12 text-center text-3xl font-bold tracking-tight">
          Omar Elgazzar
        </h3>

        <div className="mx-auto mb-8 size-28 overflow-hidden rounded-full border-4 border-muted shadow-sm">
          <Image
            src="/images/untitled_design.jpg"
            alt="Omar Elgazzar — Mobile Massage Therapist Porto"
            width={112}
            height={112}
            className="size-full object-cover"
          />
        </div>

        <div className="mb-16 space-y-4 text-center text-muted-foreground">
          <p>
            As an ISSA-CFT certified massage specialist, I bring years of
            hands-on experience across Egypt, Türkiye, Russia, and now Porto.
            Every treatment I deliver is rooted in anatomical science and
            tailored to what your body actually needs.
          </p>
          <p>
            Whether it is deep tissue work to release chronic tension, sports
            recovery after intense training, or a full-body relaxation session —
            I take the time to listen, assess, and adapt each technique to you.
            My approach is not a fixed routine; it is a conversation between my
            hands and your body.
          </p>
          <p>
            I bring everything to your location: professional table, premium
            oils, and strict hygiene standards. Your comfort, privacy, and
            convenience come first — because healing should happen on your
            terms.
          </p>
          <p className="text-sm italic">
            &ldquo;I followed my passion and became an ISSA-CFT &amp; MASSAGE
            SPECIALIST. I created GZ&apos;ZONE — a zone without boundaries —
            to change wrong concepts, traditions, and habits by bringing science
            back into the track.&rdquo;
          </p>
        </div>

        <h3 className="mb-8 text-center text-2xl font-bold">
          Your Comfort Comes First
        </h3>
        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="rounded-lg border bg-muted/20 p-6"
              >
                <Icon className="mb-3 size-8 text-primary" />
                <h4 className="mb-2 font-semibold">{point.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border bg-muted/20 p-8 sm:p-12">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
            <div className="relative w-48 shrink-0 overflow-hidden rounded-xl border bg-background p-3 shadow-sm">
              <Image
                src="/images/certs.jpg"
                alt="Professional massage certifications"
                width={200}
                height={280}
                className="mx-auto h-auto w-full object-contain"
              />
            </div>
            <div className="max-w-md">
              <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Certified & Professional
              </p>
              <h4 className="mb-3 text-xl font-bold">
                Your Wellbeing Is in Safe Hands
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Omar Elgazzar is a professionally trained massage therapist
                with certified qualifications in massage therapy, cupping,
                and specialized bodywork. Every treatment is delivered with
                professionalism, care, and attention to your wellbeing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}