"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PORTO: [number, number] = [41.1579, -8.6291];

interface LocationPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const leafletLoaded = useRef(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    if (leafletLoaded.current) return;
    leafletLoaded.current = true;

    const initMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: PORTO,
        zoom: 12,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      map.on("click", async (e: L.LeafletMouseEvent) => {
        const { lat: y, lng: x } = e.latlng;
        setLat(y);
        setLng(x);

        if (markerRef.current) map.removeLayer(markerRef.current);
        markerRef.current = L.marker([y, x], { icon }).addTo(map);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${y}&lon=${x}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data.display_name?.split(",").slice(0, 3).join(",") || `${y.toFixed(4)}, ${x.toFixed(4)}`;
          onChange(addr);
        } catch {
          onChange(`${y.toFixed(4)}, ${x.toFixed(4)}`);
        }
      });

      mapInstanceRef.current = map;
    };

    initMap();
  }, [onChange]);

  return (
    <div className="space-y-2">
      <Label>Location</Label>
      <Input
        type="text"
        placeholder="e.g. Porto, Hotel name, Address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MapPin className="size-3" />
        <span>
          {lat && lng
            ? `${lat.toFixed(4)}, ${lng.toFixed(4)}`
            : "Click the map to pin your location"}
        </span>
      </div>
      <div
        ref={mapRef}
        className="h-56 w-full overflow-hidden rounded-lg border"
      />
    </div>
  );
}