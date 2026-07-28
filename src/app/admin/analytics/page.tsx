import { getConversionEvents } from "@/lib/supabase/queries";
import { Activity, MousePointerClick, Smartphone, Layers, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const events = await getConversionEvents(200);

  const totalClicks = events.length;

  const sourceCounts: Record<string, number> = {};
  const treatmentCounts: Record<string, number> = {};

  for (const event of events) {
    const src = event.source_component || "general_cta";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;

    const tr = event.treatment || "General Inquiry";
    treatmentCounts[tr] = (treatmentCounts[tr] || 0) + 1;
  }

  const topSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);
  const topTreatments = Object.entries(treatmentCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversion Analytics</h1>
        <p className="text-sm text-muted-foreground">
          First-party Supabase event tracking for WhatsApp bookings & leads
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total Conversions</p>
            <MousePointerClick className="size-5 text-[#157347]" />
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight">{totalClicks}</p>
          <p className="mt-1 text-xs text-muted-foreground">Recorded WhatsApp leads</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Top Converting Component</p>
            <Layers className="size-5 text-primary" />
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight truncate">
            {topSources[0] ? topSources[0][0] : "None yet"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {topSources[0] ? `${topSources[0][1]} clicks` : "No conversion data"}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Top Requested Treatment</p>
            <Activity className="size-5 text-emerald-600" />
          </div>
          <p className="mt-3 text-xl font-bold tracking-tight truncate">
            {topTreatments[0] ? topTreatments[0][0] : "None yet"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {topTreatments[0] ? `${topTreatments[0][1]} requests` : "No conversion data"}
          </p>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Source Breakdown */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Clicks by Source Component</h3>
          {topSources.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No events recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {topSources.map(([source, count]) => {
                const pct = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
                return (
                  <div key={source} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{source}</span>
                      <span className="text-muted-foreground">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-[#157347] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Treatment Breakdown */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4">Popular Requested Treatments</h3>
          {topTreatments.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No events recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {topTreatments.map(([treatment, count]) => {
                const pct = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
                return (
                  <div key={treatment} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{treatment}</span>
                      <span className="text-muted-foreground">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Conversions Event Stream */}
      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Recent Event Log</h3>
          <span className="text-xs text-muted-foreground">Showing last {events.length} events</span>
        </div>

        {events.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No conversion events recorded yet. Click any "Book via WhatsApp" button on the main site to test real-time event logging!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/30 text-xs text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Treatment</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Source Component</th>
                  <th className="py-3 px-4">Path</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-xs whitespace-nowrap text-muted-foreground">
                      {e.created_at ? new Date(e.created_at).toLocaleString() : "—"}
                    </td>
                    <td className="py-3 px-4 font-medium">{e.treatment || "General Inquiry"}</td>
                    <td className="py-3 px-4 text-muted-foreground">{e.duration || "N/A"}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        {e.source_component || "general"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-muted-foreground">{e.path || "/"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
