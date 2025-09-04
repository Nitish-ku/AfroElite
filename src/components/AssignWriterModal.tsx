import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AssignWriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

const AssignWriterModal = ({ isOpen, onClose, order, onSuccess }: AssignWriterModalProps) => {
  const [writers, setWriters] = useState<any[]>([]);
  const [selectedWriter, setSelectedWriter] = useState('');
  const [writerPrice, setWriterPrice] = useState('');
  const [writerDeadline, setWriterDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchWriters = async () => {
        const { data, error } = await supabase.rpc('get_approved_writers');
        if (error) {
          console.error('Error fetching writers:', error);
        } else {
          setWriters(data || []);
        }
      };
      fetchWriters();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('assign_writer_to_order', {
        p_order_id: order.order_id,
        p_writer_id: selectedWriter,
        p_writer_price: parseFloat(writerPrice),
        p_writer_deadline: new Date(writerDeadline).toISOString(),
      });

      if (error) throw error;

      toast({ title: 'Success', description: 'Writer assigned successfully.' });
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Writer to Order #{order?.order_number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="writer">Select Writer</Label>
            <Select value={selectedWriter} onValueChange={setSelectedWriter}>
              <SelectTrigger>
                <SelectValue placeholder="Select an approved writer" />
              </SelectTrigger>
              <SelectContent>
                {writers.map((writer) => (
                  <SelectItem key={writer.id} value={writer.id}>
                    {writer.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Writer Price ($)</Label>
            <Input id="price" type="number" value={writerPrice} onChange={(e) => setWriterPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Writer Deadline</Label>
            <Input id="deadline" type="datetime-local" value={writerDeadline} onChange={(e) => setWriterDeadline(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading || !selectedWriter || !writerPrice || !writerDeadline}>
            {loading ? 'Assigning...' : 'Assign Writer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignWriterModal;