import FeatureCard from "@/components/landing/feature-card";
import Link from "next/link";
import {
  BarChart3,
  ChevronRight,
  Globe2,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <main className='flex-1 flex-col min-h-screen bg-background text-foreground'>
      {/* --- Hero Section --- */}
      <section className='py-24 lg:py-32 relative overflow-hidden border-b'>
        <div className='relative z-10 text-center'>
          <Badge variant='secondary' className='mb-4 rounded-full px-4 py-1'>
            Next.js 16 Powered Performance
          </Badge>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent'>
            Unified Management for <br /> Modern Telecom Giants
          </h1>
          <p className='max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground mb-10'>
            Complete control over your entire telecom ecosystem. From Top-Level Operators to the
            last-mile Retailer, manage sales and inventory with surgical precision.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/dashboard'>
              <Button size='lg' className='h-12 px-8 text-md gap-2'>
                Launch Dashboard <LayoutDashboard className='h-4 w-4' />
              </Button>
            </Link>
            <Button size='lg' variant='outline' className='h-12 px-8 text-md'>
              View Org Demo
            </Button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] -z-10 rounded-full' />
      </section>

      {/* --- Hierarchy Visual Section --- */}
      <section id='hierarchy' className='py-20 bg-muted/30'>
        <div className='p-5'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-6'>Granular Org Structure</h2>
              <p className='text-muted-foreground mb-8 text-lg'>
                Telecom networks are complex. We simplify them. Model your entire organization with
                nested permissions and real-time data rollups.
              </p>
              <ul className='space-y-4'>
                {[
                  "Top-Level Operator Control",
                  "Circle & Regional Management",
                  "Distributor & Sub-stockist Tracking",
                  "Retailer & POS Optimization",
                  "Sales Executive Field Monitoring",
                ].map((item, i) => (
                  <li key={i} className='flex items-center gap-3 font-medium'>
                    <div className='h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center'>
                      <ChevronRight className='h-4 w-4 text-primary' />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className='relative p-6 bg-background rounded-2xl border shadow-2xl overflow-hidden'>
              <div className='space-y-3'>
                <div className='p-4 rounded-lg border bg-primary/5 border-primary/20 flex justify-between items-center'>
                  <span className='font-bold'>Operator Level</span>
                  <Badge>HQ</Badge>
                </div>
                <div className='ml-8 p-4 rounded-lg border bg-muted/50 flex justify-between items-center italic text-muted-foreground'>
                  <ArrowRight className='h-4 w-4' /> Regional Management
                </div>
                <div className='ml-16 p-4 rounded-lg border bg-muted/50 flex justify-between items-center italic text-muted-foreground'>
                  <ArrowRight className='h-4 w-4' /> Distributors
                </div>
                <div className='ml-24 p-4 rounded-lg border bg-primary/10 border-primary/30 flex justify-between items-center'>
                  <span className='font-semibold text-primary'>Retailers & Sales</span>
                  <Badge variant='outline' className='animate-pulse text-primary border-primary'>
                    Live
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Features Grid --- */}
      <section id='features' className='py-24 p-5'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
            Engineered for Scale
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            A robust backend meets a fluid Next.js 16 frontend to handle millions of SKU
            transactions and sales records every minute.
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          <FeatureCard
            icon={<BarChart3 className='h-10 w-10 text-primary' />}
            title='Sales Intelligence'
            description='Real-time analytics across all circles. Identify top-performing distributors and laggards instantly.'
          />
          <FeatureCard
            icon={<Globe2 className='h-10 w-10 text-primary' />}
            title='Global Inventory'
            description='Track SIM cards, vouchers, and hardware stock across the entire hierarchy with automated low-stock alerts.'
          />
          <FeatureCard
            icon={<ShieldCheck className='h-10 w-10 text-primary' />}
            title='Role Based Access'
            description='Highly secure permissions. Ensure distributors only see their data, while operators see the big picture.'
          />
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className='py-20 p-5'>
        <div className='px-4'>
          <div className='bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground'>
            <h2 className='text-3xl md:text-5xl font-bold mb-6'>
              Ready to streamline your operations?
            </h2>
            <p className='text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg'>
              Join the leading telecom circles already using TelcoFlow to manage over $500M in
              annual inventory.
            </p>
            <Button size='lg' variant='secondary' className='h-14 px-10 text-lg font-semibold'>
              Start My 14-Day Trial
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
