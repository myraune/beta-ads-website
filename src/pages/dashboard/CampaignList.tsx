import React from "react";
import { DataTable } from "@/components/dashboard/DataTable";
import { campaigns } from "@/data/dashboardData";

const CampaignList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Alle kampanjer</h1>
        <p className="text-muted-foreground">{campaigns.length} kampanjer totalt</p>
      </div>
      <DataTable campaigns={campaigns} />
    </div>
  );
};

export default CampaignList;
