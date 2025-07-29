import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Ticket } from "@/types/ticket";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  ticket: Ticket;
  onToggleUsed: (id: number) => void;
}

export const TicketCard = ({ ticket, onToggleUsed }: TicketCardProps) => {
  const [isToggling, setIsToggling] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const handleToggle = async () => {
    setIsToggling(true);
    // Add slight delay for smooth animation
    setTimeout(() => {
      onToggleUsed(ticket.id);
      setIsToggling(false);
    }, 150);
  };

  const { date, time } = formatDate(ticket.time);

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        "bg-gradient-to-br from-card to-secondary/20",
        "border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)]",
        ticket.isUsed ? "opacity-75" : "hover:shadow-[var(--shadow-glow)]"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground truncate">
            {ticket.eventName}
          </h3>
          <Badge 
            variant={ticket.isUsed ? "destructive" : "default"}
            className={cn(
              "ml-2 transition-all duration-300",
              ticket.isUsed 
                ? "bg-ticket-used text-ticket-used-foreground hover:bg-ticket-used/80" 
                : "bg-ticket-active text-ticket-active-foreground hover:bg-ticket-active/80"
            )}
          >
            {ticket.isUsed ? "Used" : "Active"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm">{ticket.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        
        <div className="pt-2">
          <Button
            onClick={handleToggle}
            disabled={isToggling}
            variant={ticket.isUsed ? "outline" : "default"}
            className={cn(
              "w-full transition-all duration-300",
              ticket.isUsed 
                ? "hover:bg-ticket-active hover:text-ticket-active-foreground hover:border-ticket-active" 
                : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            )}
          >
            {isToggling ? "..." : ticket.isUsed ? "Mark as Unused" : "Mark as Used"}
          </Button>
        </div>
      </CardContent>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />
    </Card>
  );
};