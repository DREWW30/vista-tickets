import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket as TicketIcon, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "active" | "used";

interface TicketFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  ticketCounts: {
    total: number;
    active: number;
    used: number;
  };
}

export const TicketFilter = ({ activeFilter, onFilterChange, ticketCounts }: TicketFilterProps) => {
  const filters = [
    {
      id: "all" as FilterType,
      label: "All Tickets",
      icon: TicketIcon,
      count: ticketCounts.total,
      color: "default"
    },
    {
      id: "active" as FilterType,
      label: "Active",
      icon: CheckCircle,
      count: ticketCounts.active,
      color: "active"
    },
    {
      id: "used" as FilterType,
      label: "Used",
      icon: XCircle,
      count: ticketCounts.used,
      color: "used"
    }
  ];

  return (
    <div className="flex flex-wrap gap-3 p-1 bg-secondary/50 rounded-lg backdrop-blur-sm">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        
        return (
          <Button
            key={filter.id}
            variant={isActive ? "default" : "ghost"}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isActive && "bg-primary text-primary-foreground shadow-md"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{filter.label}</span>
            <Badge 
              variant="secondary"
              className={cn(
                "ml-1 text-xs",
                isActive && "bg-primary-foreground/20 text-primary-foreground"
              )}
            >
              {filter.count}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
};