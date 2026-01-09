import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Campaign, formatNumber } from "@/data/dashboardData";
import { cn } from "@/lib/utils";
import { Search, X, ChevronUp, ChevronDown } from "lucide-react";

interface DataTableProps {
  campaigns: Campaign[];
  className?: string;
}

type SortKey = "name" | "status" | "views" | "clicks" | "ctr" | "streamers";
type SortDirection = "asc" | "desc";

export const DataTable: React.FC<DataTableProps> = ({ campaigns, className }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "ongoing" | "completed">("all");
  const [sortKey, setSortKey] = useState<SortKey>("views");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns;

    // Search filter
    if (search) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      switch (sortKey) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "views":
          aVal = a.views;
          bVal = b.views;
          break;
        case "clicks":
          aVal = a.clicks;
          bVal = b.clicks;
          break;
        case "ctr":
          aVal = a.ctr;
          bVal = b.ctr;
          break;
        case "streamers":
          aVal = a.streamers.length;
          bVal = b.streamers.length;
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [campaigns, search, statusFilter, sortKey, sortDirection]);

  const formatPeriod = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startMonth = startDate.toLocaleDateString("no-NO", { month: "short" });
    const endMonth = endDate.toLocaleDateString("no-NO", { month: "short", year: "2-digit" });
    return `${startMonth} – ${endMonth}`;
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Søk kampanjenavn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "ongoing", "completed"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={cn(
                statusFilter !== status && "bg-card/50 border-border/50"
              )}
            >
              {status === "all" ? "Alle" : status === "ongoing" ? "Aktive" : "Ferdige"}
            </Button>
          ))}
          {(search || statusFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("name")}
              >
                Kampanje <SortIcon columnKey="name" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort("status")}
              >
                Status <SortIcon columnKey="status" />
              </TableHead>
              <TableHead>Periode</TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground text-right"
                onClick={() => handleSort("views")}
              >
                Views <SortIcon columnKey="views" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground text-right"
                onClick={() => handleSort("clicks")}
              >
                Clicks <SortIcon columnKey="clicks" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground text-right"
                onClick={() => handleSort("ctr")}
              >
                CTR <SortIcon columnKey="ctr" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground text-right"
                onClick={() => handleSort("streamers")}
              >
                Streamers <SortIcon columnKey="streamers" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCampaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                className="hover:bg-muted/50 border-border/50 cursor-pointer"
              >
                <TableCell>
                  <Link
                    to={`/dashboard/campaigns/${campaign.id}`}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {campaign.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full",
                      campaign.status === "ongoing"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {campaign.status === "ongoing" && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                    )}
                    {campaign.status === "ongoing" ? "Aktiv" : "Ferdig"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatPeriod(campaign.startDate, campaign.endDate)}
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  {formatNumber(campaign.views)}
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  {campaign.clicks}
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  {campaign.ctr}%
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  {campaign.streamers.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredAndSortedCampaigns.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Ingen kampanjer funnet
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Viser {filteredAndSortedCampaigns.length} av {campaigns.length} kampanjer
      </p>
    </div>
  );
};
