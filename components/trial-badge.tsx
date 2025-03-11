"use client";

import { useTrial } from '@/lib/trial-context';
import { Badge } from '@/components/ui/badge';
import { Clock, Search } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function TrialBadge() {
  const { isTrialActive, getRemainingDays, getSearchesRemaining } = useTrial();
  
  if (!isTrialActive) return null;
  
  const daysRemaining = getRemainingDays();
  const searchesRemaining = getSearchesRemaining();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="bg-[#97cfda]/20 text-[#97cfda] border-[#97cfda]/30 badge-glow flex items-center gap-1.5 py-1.5 px-3 ml-2">
            <Clock size={14} />
            <span>Trial: {daysRemaining}d</span>
            <span className="mx-1">•</span>
            <Search size={14} />
            <span>{searchesRemaining}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-card border-accent/20">
          <div className="text-xs p-1">
            <p className="font-semibold mb-1">Trial Status</p>
            <p>{daysRemaining} days remaining</p>
            <p>{searchesRemaining} searches left</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}