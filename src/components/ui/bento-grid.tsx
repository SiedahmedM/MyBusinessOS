import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(20rem,auto)] lg:gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        // Base styling
        "group/bento relative flex flex-col justify-between space-y-4 rounded-xl p-6 transition-all duration-200",
        // Dark mode glass morphism styling
        "bg-black/40 backdrop-blur-sm border border-white/10",
        // Hover effects (desktop only - devices that support hover)
        "hover:hover:bg-black/60 hover:hover:border-white/20 hover:hover:scale-[1.02]",
        // Touch effects for mobile
        "active:bg-black/60 active:scale-[0.98] transition-transform",
        // Shadow effects
        "shadow-lg hover:shadow-xl hover:shadow-accent-500/10",
        // Focus states for accessibility
        "focus:outline-none focus:ring-2 focus:ring-accent-500/50",
        // Cursor
        onClick && "cursor-pointer",
        className,
      )}
    >
      {/* Header content (features, ROI, CTAs) */}
      {header && <div className="flex-1">{header}</div>}
      
      {/* Footer with icon, title, description */}
      <div className="space-y-3">
        {/* Icon and Title Row */}
        <div className="flex items-center space-x-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="min-w-0 flex-1">
            <h3 className="font-sans font-bold text-lg text-white leading-tight group-hover/bento:text-accent-100 transition-colors">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Description */}
        {description && (
          <p className="font-sans text-sm text-neutral-300 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};