import { CheckCircle, Circle, Clock } from 'lucide-react';

interface OrderTimelineProps {
  stages: any[];
}

const OrderTimeline = ({ stages }: OrderTimelineProps) => {
  return (
    <div className="space-y-8">
      {stages.map((stage, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              {stage.completed_at ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : index === stages.findIndex(s => !s.completed_at) ? (
                <Clock className="h-8 w-8 text-blue-500 animate-spin" />
              ) : (
                <Circle className="h-8 w-8 text-gray-300" />
              )}
            </div>
            {index < stages.length - 1 && (
              <div className="w-px h-full bg-gray-300" />
            )}
          </div>
          <div className="pb-8">
            <p className="font-bold capitalize">{stage.stage}</p>
            <p className="text-sm text-muted-foreground">{stage.notes}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(stage.created_at).toLocaleString()}
              {stage.completed_at && ` - ${new Date(stage.completed_at).toLocaleString()}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;