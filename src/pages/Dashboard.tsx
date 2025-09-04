import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import AssignWriterModal from '@/components/AssignWriterModal';
import SubmitWorkModal from '@/components/SubmitWorkModal';
import ViewFilesModal from '@/components/ViewFilesModal';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [writerApplications, setWriterApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewFilesModalOpen, setIsViewFilesModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profileData);

        if (profileData.role === 'client') {
          const { data: ordersData, error: ordersError } = await supabase.rpc('get_client_orders', { p_email: user.email! });
          if (ordersError) console.error('Error fetching client orders:', ordersError);
          else setOrders(ordersData || []);
        } else if (profileData.role === 'admin') {
          const { data: allOrders, error: allOrdersError } = await supabase.rpc('get_all_orders');
          if (allOrdersError) console.error('Error fetching all orders:', allOrdersError);
          else setOrders(allOrders || []);

          const { data: apps, error: appsError } = await supabase.rpc('get_writer_applications');
          if (appsError) console.error('Error fetching writer applications:', appsError);
          else setWriterApplications(apps || []);
        } else if (profileData.role === 'writer') {
          const { data: writerOrders, error: writerOrdersError } = await supabase.rpc('get_writer_orders', { p_writer_id: profileData.id });
          if (writerOrdersError) console.error('Error fetching writer orders:', writerOrdersError);
          else setOrders(writerOrders || []);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateWriterStatus = async (writerId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase.rpc('update_writer_status', { p_writer_id: writerId, p_status: status });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `Writer has been ${status}.` });
      fetchData(); // Refresh data
    }
  };

  const handleOpenAssignModal = (order: any) => {
    setSelectedOrder(order);
    setIsAssignModalOpen(true);
  };

  const handleOpenSubmitModal = (order: any) => {
    setSelectedOrder(order);
    setIsSubmitModalOpen(true);
  };

  const handleOpenViewFilesModal = (order: any) => {
    setSelectedOrder(order);
    setIsViewFilesModalOpen(true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link to="/auth" className="text-primary hover:underline">Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {profile?.full_name || user.email}</h1>
          <Badge variant="outline" className="mt-2">{profile?.role}</Badge>
        </div>

        {/* Client View */}
        {profile?.role === 'client' && (
          <Card>
            <CardHeader><CardTitle>My Orders</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Order Number</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Stage</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.order_id}>
                        <TableCell className="font-medium"><Link to={`/order/${order.order_id}`} className="text-primary hover:underline">{order.order_number}</Link></TableCell>
                        <TableCell>{order.title}</TableCell>
                        <TableCell><Badge>{order.status}</Badge></TableCell>
                        <TableCell><Badge variant="secondary">{order.current_stage}</Badge></TableCell>
                        <TableCell><Button variant="outline" size="sm" onClick={() => handleOpenViewFilesModal(order)}>View Files</Button></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow><TableCell colSpan={5} className="text-center">You haven't placed any orders yet.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Admin View */}
        {profile?.role === 'admin' && (
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Order Management</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Order Number</TableHead><TableHead>Client</TableHead><TableHead>Writer</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.order_id}>
                        <TableCell>{order.order_number}</TableCell>
                        <TableCell>{order.client_email}</TableCell>
                        <TableCell>{order.writer_name || 'Unassigned'}</TableCell>
                        <TableCell><Badge>{order.status}</Badge></TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenAssignModal(order)} disabled={order.writer_id}>Assign</Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenViewFilesModal(order)}>Files</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Writer Applications</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Submitted At</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {writerApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.first_name} {app.last_name}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell><Badge>{app.status}</Badge></TableCell>
                        <TableCell>{new Date(app.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleUpdateWriterStatus(app.id, 'approved')} disabled={app.status !== 'pending'}>Approve</Button>
                          <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleUpdateWriterStatus(app.id, 'rejected')} disabled={app.status !== 'pending'}>Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Writer View */}
        {profile?.role === 'writer' && (
          <Card>
            <CardHeader><CardTitle>My Assigned Orders</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Order Number</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Deadline</TableHead><TableHead>Price</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell>{order.order_number}</TableCell>
                      <TableCell>{order.title}</TableCell>
                      <TableCell><Badge>{order.status}</Badge></TableCell>
                      <TableCell>{new Date(order.writer_deadline).toLocaleString()}</TableCell>
                      <TableCell>${order.writer_price}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenSubmitModal(order)} disabled={order.status !== 'writing'}>Submit</Button>
                        <Button variant="outline" size="sm" onClick={() => handleOpenViewFilesModal(order)}>Files</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

      </main>
      {selectedOrder && (
        <>
          <AssignWriterModal
            isOpen={isAssignModalOpen}
            onClose={() => setIsAssignModalOpen(false)}
            order={selectedOrder}
            onSuccess={fetchData}
          />
          <SubmitWorkModal
            isOpen={isSubmitModalOpen}
            onClose={() => setIsSubmitModalOpen(false)}
            order={selectedOrder}
            onSuccess={fetchData}
          />
          <ViewFilesModal
            isOpen={isViewFilesModalOpen}
            onClose={() => setIsViewFilesModalOpen(false)}
            order={selectedOrder}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;