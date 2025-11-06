import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CreatorMetric {
  name: string;
  handle: string;
  platform: "twitch" | "kick";
  avgViewers: number;
  watchHours: number;
  followerGrowth: number;
  monetizationScore: number;
  topCategory: string;
  momentum: "surging" | "stable" | "watch";
}

interface CreatorTableProps {
  creators: CreatorMetric[];
}

const platformStyles: Record<"twitch" | "kick", string> = {
  twitch: "bg-violet-500/10 text-violet-300",
  kick: "bg-emerald-500/10 text-emerald-300",
};

const momentumCopy: Record<CreatorMetric["momentum"], string> = {
  surging: "Surging",
  stable: "Consistent",
  watch: "Needs watch",
};

export const CreatorTable: React.FC<CreatorTableProps> = ({ creators }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-background/60 shadow-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Creator cohort</p>
          <h3 className="text-lg font-semibold">High-leverage partners</h3>
        </div>
        <Badge variant="outline" className="gap-1 rounded-full border-primary/40 bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
          AI-ranked
        </Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>Creator</TableHead>
            <TableHead className="hidden sm:table-cell">Avg viewers</TableHead>
            <TableHead className="hidden sm:table-cell">Watch hours (7d)</TableHead>
            <TableHead className="hidden lg:table-cell">Follower delta</TableHead>
            <TableHead className="hidden lg:table-cell">Monetization score</TableHead>
            <TableHead className="text-right">Momentum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creators.map((creator) => (
            <TableRow key={creator.handle} className="last:border-0">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-semibold">
                      {creator.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{creator.name}</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-full px-2 py-0 text-[10px] font-semibold uppercase tracking-wide",
                          platformStyles[creator.platform]
                        )}
                      >
                        {creator.platform}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">@{creator.handle}</p>
                    <p className="text-xs text-muted-foreground/70">
                      Top category: {creator.topCategory}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell font-medium">
                {creator.avgViewers.toLocaleString()}
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {creator.watchHours} hrs
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {creator.followerGrowth > 0 ? "+" : ""}
                {creator.followerGrowth}%
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        creator.platform === "twitch" ? "bg-violet-500/70" : "bg-emerald-500/70"
                      )}
                      style={{ width: `${creator.monetizationScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {creator.monetizationScore}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={cn(
                    "inline-flex items-center justify-end gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                    creator.momentum === "surging" && "bg-emerald-500/10 text-emerald-300",
                    creator.momentum === "stable" && "bg-sky-500/10 text-sky-300",
                    creator.momentum === "watch" && "bg-amber-500/10 text-amber-300"
                  )}
                >
                  {creator.momentum === "surging" && <ArrowUpRight className="h-3.5 w-3.5" />}
                  {momentumCopy[creator.momentum]}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
