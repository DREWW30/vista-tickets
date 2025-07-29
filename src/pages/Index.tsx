import { useState, useMemo } from "react";
import { TicketCard } from "@/components/TicketCard";
import { TicketFilter } from "@/components/TicketFilter";
import { ticketsData } from "@/data/tickets";
import { Ticket } from "@/types/ticket";
import { Ticket as TicketIcon } from "lucide-react";

type FilterType = "all" | "active" | "used";

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const handleToggleUsed = (id: number) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === id 
          ? { ...ticket, isUsed: !ticket.isUsed }
          : ticket
      )
    );
  };

  const filteredTickets = useMemo(() => {
    switch (activeFilter) {
      case "active":
        return tickets.filter(ticket => !ticket.isUsed);
      case "used":
        return tickets.filter(ticket => ticket.isUsed);
      default:
        return tickets;
    }
  }, [tickets, activeFilter]);

  const ticketCounts = useMemo(() => ({
    total: tickets.length,
    active: tickets.filter(t => !t.isUsed).length,
    used: tickets.filter(t => t.isUsed).length
  }), [tickets]);

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/10" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <TicketIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Event Tickets
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Manage your event tickets with style. Track used and active tickets in a beautiful, responsive interface.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex justify-center mb-8">
          <TicketFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            ticketCounts={ticketCounts}
          />
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onToggleUsed={handleToggleUsed}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl inline-block mb-4">
              <TicketIcon className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No tickets found
            </h3>
            <p className="text-white/70">
              Try adjusting your filter to see more tickets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
