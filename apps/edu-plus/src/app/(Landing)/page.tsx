import FeatureCard from "@/components/landing/feature-card";
import Link from "next/link";
import {
  BarChart3,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <main className='flex-1 flex-col min-h-screen bg-background text-foreground'>
      {/* --- Hero Section --- */}
      <section className='px-4 py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden border-b sm:px-6 lg:px-8'>
        <div className='relative z-10 text-center max-w-4xl mx-auto'>
          <Badge variant='secondary' className='mb-4 rounded-full px-3 py-1 text-xs sm:px-4 sm:text-sm'>
            Built for Education
          </Badge>
          <h1 className='text-3xl font-extrabold tracking-tight mb-4 sm:text-4xl sm:mb-6 md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent'>
            One Platform for <br className='hidden sm:block' /> Schools, Colleges & Universities
          </h1>
          <p className='max-w-[700px] mx-auto text-base text-muted-foreground mb-8 sm:text-lg sm:mb-10 md:text-xl'>
            Manage students, faculty, courses, and administration in one place. From K–12 schools to
            universities—enrollment, grades, attendance, and reporting made simple.
          </p>
          <div className='flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center'>
            <Link href='/dashboard' className='w-full sm:w-auto'>
              <Button size='lg' className='h-11 w-full sm:w-auto sm:h-12 px-6 sm:px-8 text-sm sm:text-base gap-2'>
                Launch Dashboard <LayoutDashboard className='h-4 w-4 shrink-0' />
              </Button>
            </Link>
            <Button size='lg' variant='outline' className='h-11 w-full sm:w-auto sm:h-12 px-6 sm:px-8 text-sm sm:text-base'>
              Request a Demo
            </Button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] -z-10 rounded-full' />
      </section>

      {/* --- Organization Structure Section --- */}
      <section id='hierarchy' className='py-12 sm:py-16 md:py-20 bg-muted/30 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center'>
            <div>
              <h2 className='text-2xl font-bold mb-4 sm:text-3xl sm:mb-6'>Campus & Organization Structure</h2>
              <p className='text-muted-foreground mb-6 text-base sm:mb-8 sm:text-lg'>
                Model your institution the way it really works. From university-wide settings to
                individual classes—nested roles, permissions, and real-time rollups.
              </p>
              <ul className='space-y-3 sm:space-y-4'>
                {[
                  "University / Multi-Campus Management",
                  "Colleges, Departments & Schools",
                  "Programs, Courses & Sections",
                  "Classes, Batches & Student Groups",
                  "Faculty, Staff & Admin Roles",
                ].map((item, i) => (
                  <li key={i} className='flex items-center gap-2 sm:gap-3 font-medium text-sm sm:text-base'>
                    <div className='h-5 w-5 shrink-0 sm:h-6 sm:w-6 rounded-full bg-primary/20 flex items-center justify-center'>
                      <ChevronRight className='h-3 w-3 sm:h-4 sm:w-4 text-primary' />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='relative p-4 sm:p-6 bg-background rounded-xl sm:rounded-2xl border shadow-lg sm:shadow-2xl overflow-x-auto'>
              <div className='space-y-2 min-w-[280px] sm:min-w-0 sm:space-y-3'>
                <div className='p-3 sm:p-4 rounded-lg border bg-primary/5 border-primary/20 flex justify-between items-center gap-2'>
                  <span className='font-bold text-sm sm:text-base truncate'>Institution / University</span>
                  <Badge className='shrink-0'>HQ</Badge>
                </div>
                <div className='ml-4 sm:ml-8 p-3 sm:p-4 rounded-lg border bg-muted/50 flex justify-between items-center gap-2 italic text-muted-foreground text-sm sm:text-base'>
                  <ArrowRight className='h-3 w-3 sm:h-4 sm:w-4 shrink-0' /> <span className='truncate'>Colleges & Departments</span>
                </div>
                <div className='ml-6 sm:ml-16 p-3 sm:p-4 rounded-lg border bg-muted/50 flex justify-between items-center gap-2 italic text-muted-foreground text-sm sm:text-base'>
                  <ArrowRight className='h-3 w-3 sm:h-4 sm:w-4 shrink-0' /> <span className='truncate'>Schools & Programs</span>
                </div>
                <div className='ml-8 sm:ml-24 p-3 sm:p-4 rounded-lg border bg-primary/10 border-primary/30 flex justify-between items-center gap-2'>
                  <span className='font-semibold text-primary text-sm sm:text-base truncate'>Classes & Students</span>
                  <Badge variant='outline' className='animate-pulse text-primary border-primary shrink-0 text-xs'>
                    Live
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Features Grid --- */}
      <section id='features' className='py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-10 sm:mb-16'>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3 sm:mb-4'>
              Built for How You Work
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base'>
              Analytics, course management, and secure access—so admins, faculty, and students get the
              right tools without the complexity.
            </p>
          </div>
          <div className='grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3'>
          <FeatureCard
            icon={<BarChart3 className='h-10 w-10 text-primary' />}
            title='Academic Analytics'
            description='Track enrollment, grades, attendance, and outcomes across departments. Spot trends and report to boards and accreditors with one click.'
          />
          <FeatureCard
            icon={<BookOpen className='h-10 w-10 text-primary' />}
            title='Courses & Students'
            description='Manage curricula, sections, schedules, and student records. From admissions to graduation—all in one place.'
          />
          <FeatureCard
            icon={<ShieldCheck className='h-10 w-10 text-primary' />}
            title='Role-Based Access'
            description='Admin, faculty, and student roles with clear permissions. Keep data secure and each group focused on what they need.'
          />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-primary rounded-2xl sm:rounded-3xl p-6 text-center text-primary-foreground sm:p-8 md:p-16'>
            <GraduationCap className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 mx-auto mb-4 sm:mb-6 text-primary-foreground/90' />
            <h2 className='text-2xl font-bold mb-4 sm:text-3xl md:text-5xl sm:mb-6'>
              Ready to simplify your institution?
            </h2>
            <p className='text-primary-foreground/80 mb-6 max-w-xl mx-auto text-sm sm:text-base md:mb-10 md:text-lg'>
              Join schools, colleges, and universities using one platform for academics, admin, and
              reporting.
            </p>
            <Button size='lg' variant='secondary' className='h-11 w-full sm:w-auto sm:h-14 px-6 sm:px-10 text-base sm:text-lg font-semibold'>
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
