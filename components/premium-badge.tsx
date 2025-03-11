"use client";

import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function PremiumBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="bg-[#97cfda]/20 text-[#97cfda] border-[#97cfda]/30 badge-glow flex items-center gap-1.5 py-1.5 px-3 ml-2">
            <Crown size={14} />
            <span>PREMIUM</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-card border-accent/20">
          <div className="text-xs p-1">
            <p className="font-semibold mb-1">Premium Status</p>
            <p>Up to 100 recommendations per search</p>
            <p>All premium features unlocked</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}