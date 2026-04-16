import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className='hover:shadow-lg transition-all hover:-translate-y-1'>
      <CardHeader>
        <div className='mb-4'>{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground leading-relaxed'>{description}</p>
      </CardContent>
    </Card>
  );
}
