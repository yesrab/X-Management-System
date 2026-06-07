import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type Notification = {
  title: string;
  detail: string;
  time: string;
  tone: "red" | "yellow" | "teal" | "muted";
};

const notifications: Notification[] = [
  { title: "Fee invoices generated", detail: "Term 2 — 1,204 invoices issued", time: "2m", tone: "yellow" },
  { title: "Low attendance flagged", detail: "Grade 9-B dropped below 75%", time: "18m", tone: "red" },
  { title: "New admission approved", detail: "Aarav Sharma · Grade 9", time: "1h", tone: "teal" },
  { title: "Payroll run completed", detail: "842 staff · June cycle", time: "3h", tone: "muted" },
  { title: "Exam schedule published", detail: "Mid-term · 12 sections", time: "5h", tone: "teal" },
  { title: "Backup completed", detail: "Nightly snapshot · 4.2 GB", time: "9h", tone: "muted" },
];

const toneClass: Record<Notification["tone"], string> = {
  red: "bg-signal-red",
  yellow: "bg-signal-yellow",
  teal: "bg-signal-teal",
  muted: "bg-muted-foreground",
};

export function NotificationDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Drawer direction='right' open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className='border-b border-border'>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription className='text-xs uppercase tracking-wide'>
            {notifications.length} recent events
          </DrawerDescription>
        </DrawerHeader>
        <div className='no-scrollbar flex-1 space-y-2 overflow-y-auto p-4'>
          {notifications.map((n) => (
            <div
              key={n.title}
              className='flex items-start gap-3 border border-border bg-card p-3'
            >
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 ${toneClass[n.tone]}`} />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold'>{n.title}</p>
                <p className='truncate text-xs text-muted-foreground'>{n.detail}</p>
              </div>
              <span className='shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground tabular-nums'>
                {n.time}
              </span>
            </div>
          ))}
        </div>
        <DrawerFooter className='border-t border-border'>
          <Button>Mark all read</Button>
          <DrawerClose asChild>
            <Button variant='outline'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
