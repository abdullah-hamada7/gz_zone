import Image from "next/image";
import type { GiftCardOption } from "@/lib/gift-cards";
import styles from "./gift-certificate.module.css";

export interface GiftCertificateProps {
  code: string;
  giver: string;
  recipient: string;
  option: GiftCardOption;
  note?: string;
}

const WHATSAPP_QR =
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fwa.me%2F351913675810";
const WEBSITE_QR =
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fgzzone.vercel.app";

export function GiftCertificate({
  code,
  giver,
  recipient,
  option,
  note,
}: GiftCertificateProps) {
  return (
    <article
      className={styles.certificate}
      aria-label={`Gift certificate for ${option.title}`}
    >
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/images/logo.jpg" alt="" width={80} height={80} />
        </div>
        <p className={styles.brand}>
          <strong>Gz&apos;zone</strong> - Massage &amp; Cupping Therapy | Porto
        </p>
      </header>

      <div className={styles.eyebrow}>Gift Certificate</div>

      <h1 className={styles.headline}>
        A gift of
        <br />
        pure relaxation.
      </h1>

      <section className={styles.session}>
        <p className={styles.sessionLabel}>This certificate is for</p>
        <h2 className={styles.sessionTitle}>{option.title}</h2>
        {option.description ? (
          <p className={styles.sessionDescription}>{option.description}</p>
        ) : null}
        <p className={styles.sessionMeta}>
          {option.durationLabel} &nbsp;&bull;&nbsp; €{option.price}
        </p>
      </section>

      <div className={styles.names}>
        <div className={styles.nameCard}>
          <p className={styles.nameLabel}>For</p>
          <p className={styles.nameValue}>{recipient}</p>
        </div>
        <div className={styles.nameCard}>
          <p className={styles.nameLabel}>From</p>
          <p className={styles.nameValue}>{giver}</p>
        </div>
      </div>

      <div className={styles.codeRow}>
        <div>
          <p className={styles.codeLabel}>Gift code</p>
          <p className={styles.codeValue}>{code}</p>
        </div>
        <div className={styles.value}>
          <p className={styles.codeLabel}>Value</p>
          <p className={styles.valueAmount}>€{option.price}</p>
        </div>
      </div>

      {note ? <p className={styles.note}>&ldquo;{note}&rdquo;</p> : null}

      <p className={styles.terms}>
        Valid for one session
        {option.minutes > 0 ? ` (${option.durationLabel.toLowerCase()})` : ""}.
        Studio or at home. Free home visits within 10 km of Porto; additional
        transport fees apply beyond 10 km. Cannot be exchanged for cash.
      </p>

      <footer className={styles.footer}>
        <div className={styles.qr}>
          <div className={styles.qrBox}>
            <Image src={WHATSAPP_QR} alt="" width={160} height={160} />
          </div>
          <span className={styles.qrLabel}>WhatsApp</span>
        </div>

        <div className={styles.contact}>
          <p className={styles.contactTitle}>Book with your code</p>
          <p className={styles.contactPhone}>+351 913 675 810</p>
          <p className={styles.contactSite}>gzzone.vercel.app</p>
        </div>

        <div className={styles.qr}>
          <div className={styles.qrBox}>
            <Image src={WEBSITE_QR} alt="" width={160} height={160} />
          </div>
          <span className={styles.qrLabel}>Website</span>
        </div>
      </footer>
    </article>
  );
}
