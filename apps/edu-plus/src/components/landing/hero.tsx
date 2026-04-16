import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className='relative w-full py-20 lg:py-32 overflow-hidden bg-background'>
      <div className='container mx-auto px-4 flex flex-col items-center text-center'>
        <div className='inline-flex items-center rounded-full border px-3 py-1 text-sm mb-6 bg-muted/50 backdrop-blur-sm'>
          <span className='font-medium'>New: Next.js 16 Architecture</span>
          <div className='ml-2 h-4 w-px bg-border' />
          <span className='ml-2 text-primary'>Enterprise Ready</span>
        </div>

        <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent'>
          Complete Visibility for <br />
          <span className='text-primary'>X Management System</span>
        </h1>

        <p className='max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed'>
          The ultimate sales and inventory command center for telecom operators. Manage your entire
          organization from the top-level down to the individual retailer.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
          <Button size='lg' className='px-8 h-12 text-md'>
            Get Started <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
          <Button size='lg' variant='outline' className='px-8 h-12 text-md'>
            <PlayCircle className='mr-2 h-4 w-4' /> Watch Demo
          </Button>
        </div>
      </div>

      {/* Decorative Background Mesh */}
      <div className='absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 opacity-20 blur-[100px] bg-gradient-to-tr from-primary to-blue-400 rounded-full' />
    </section>
  );
}
