import { Card } from "@/components/ui/card";
import { Network, Map, Users, Store, Zap } from "lucide-react";

const steps = [
  { label: "Top Level Operator", icon: Network, color: "text-blue-500" },
  { label: "Region Management", icon: Map, color: "text-indigo-500" },
  { label: "Distributors", icon: Users, color: "text-purple-500" },
  { label: "Retailers", icon: Store, color: "text-pink-500" },
  { label: "Sales Executives", icon: Zap, color: "text-amber-500" },
];

export function HierarchySection() {
  return (
    <section className='py-24 bg-muted/30 border-y'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4'>Unmatched Organizational Structure</h2>
          <p className='text-muted-foreground'>
            Model X Management System to match your physical business layout.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-4 lg:gap-8'>
          {steps.map((step, index) => (
            <div key={step.label} className='flex items-center'>
              <Card className='p-6 flex flex-col items-center w-40 hover:border-primary transition-colors cursor-default'>
                <step.icon className={`h-8 w-8 mb-3 ${step.color}`} />
                <span className='text-sm font-semibold text-center leading-tight'>
                  {step.label}
                </span>
              </Card>
              {index < steps.length - 1 && (
                <div className='hidden lg:block w-8 h-px bg-border mx-2' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
