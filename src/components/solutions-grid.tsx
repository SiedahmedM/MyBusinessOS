"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import {
  IconBuildingStore,
  IconBuildingSkyscraper,
  IconDeviceMobile,
  IconCode,
  IconCpu,
  IconRobot,
} from "@tabler/icons-react";

const SOLUTIONS = [
  {
    title: "All-in-One Business Hub",
    description:
      "Run your business from one place. Track customers, manage inventory, and schedule your team.",
    roi: "Save 20+ hours each week, boost revenue by 40%",
    icon: <IconBuildingSkyscraper className="h-5 w-5 text-neutral-500" />,
    cta: { label: "Get a quote", href: "/contact" },
  },
  {
    title: "Turn Your Service Into Recurring Income",
    description:
      "Stop trading time for money — build a SaaS platform. Automate reports, self-serve dashboards, and white-label solutions.",
    roi: "Grow to $50K/month predictable revenue",
    icon: <IconCode className="h-5 w-5 text-neutral-500" />,
    cta: { label: "Get a quote", href: "/contact" },
  },
  {
    title: "Online Store That Sells More",
    description:
      "A smarter store built around conversions. Showcase products, accept payments, sync inventory automatically.",
    roi: "Beat Shopify by 60% in conversions",
    icon: <IconBuildingStore className="h-5 w-5 text-neutral-500" />,
    cta: { label: "Get a quote", href: "/contact" },
  },
  {
    title: "Mobile App for Your Business",
    description:
      "Be on the phones your customers use daily. Works offline, sends push notifications, reliable performance.",
    roi: "Reach 80% more customers on mobile",
    icon: <IconDeviceMobile className="h-5 w-5 text-neutral-500" />,
    cta: { label: "Get a quote", href: "/contact" },
  },
  {
    title: "Let Software Handle the Boring Work",
    description:
      "Free your team from repetitive tasks. Automate documents, emails, and data entry.",
    roi: "Cut 80% of manual work",
    icon: <IconCpu className="h-5 w-5 text-neutral-500" />,
    cta: { label: "Get a quote", href: "/contact" },
    size: "large",
  },
  {
    title: "Bring AI Into Your Business",
    description:
      "Use AI to work smarter, not harder. Chatbots, smart tools, and predictive insights.",
    roi: "Save 100+ hours/year, unlock new revenue",
    icon: <IconRobot className="h-5 w-5 text-neutral-500" />,
    cta: { label: "Explore With Our AI Builder", href: "/ai-solution-builder" },
    size: "large",
  },
];

export function SolutionsGrid() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
        What Can I Build For You?
      </h2>
      <BentoGrid className="max-w-6xl mx-auto px-4 md:px-0">
        {SOLUTIONS.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            className={item.size === "large" ? "md:col-span-2" : ""}
            footer={
              <div className="mt-2 flex flex-col gap-1">
                <p className="text-xs text-neutral-500">{item.roi}</p>
                <Button asChild size="sm" className="w-full md:w-fit">
                  <a href={item.cta.href}>{item.cta.label}</a>
                </Button>
              </div>
            }
          />
        ))}
      </BentoGrid>
    </section>
  );
}
