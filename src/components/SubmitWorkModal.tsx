import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface SubmitWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

const SubmitWorkModal = ({ isOpen, onClose, order, onSuccess }: SubmitWorkModalProps) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let filePath: string | null = null;
      let fileName: string | null = null;
      let fileType: string | null = null;

      if (file) {
        const { data: user } = await supabase.auth.getUser();
        const path = `${user.data.user?.id}/${order.order_id}/${file.name}`;
        const { error: uploadError } = await supabase.storage.from('order_files').upload(path, file);
        if (uploadError) throw uploadError;
        filePath = path;
        fileName = file.name;
        fileType = file.type;
      }

      const { error } = await supabase.rpc('submit_order_for_review', {
        p_order_id: order.order_id,
        p_content: content,
        p_file_path: filePath,
        p_file_name: fileName,
        p_file_type: fileType,
      });

      if (error) throw error;

      toast({ title: 'Success', description: 'Work submitted for review.' });
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit Work for Order #{order?.order_number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="content">Your Content</Label>
            <Textarea
              id="content"
              className="min-h-[300px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article content here, or upload it as a file below."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="flex items-center space-x-2">
              <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
              <Button type="button" variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
            </div>
            {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading || (!content && !file)}>
            {loading ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitWorkModal;