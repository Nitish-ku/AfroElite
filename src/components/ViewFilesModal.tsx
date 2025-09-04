import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';

interface ViewFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const ViewFilesModal = ({ isOpen, onClose, order }: ViewFilesModalProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && order) {
      const fetchFiles = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_order_files', { p_order_id: order.order_id });
        if (error) {
          console.error('Error fetching files:', error);
        } else {
          setFiles(data || []);
        }
        setLoading(false);
      };
      fetchFiles();
    }
  }, [isOpen, order]);

  const handleDownload = async (filePath: string) => {
    const { data, error } = await supabase.storage.from('order_files').download(filePath);
    if (error) {
      console.error('Error downloading file:', error);
    } else {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Files for Order #{order?.order_number}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {loading ? (
            <p>Loading files...</p>
          ) : files.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Uploaded At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.file_name}</TableCell>
                    <TableCell>{new Date(file.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(file.file_path)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No files found for this order.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewFilesModal;