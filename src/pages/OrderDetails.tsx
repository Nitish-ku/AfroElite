import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderTimeline from '@/components/OrderTimeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { useSearchParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get('payment');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        const { data, error } = await supabase.rpc('get_order_details', { p_order_id: orderId });
        if (error) {
          console.error('Error fetching order details:', error);
        } else {
          setOrder(data[0]);
        }
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading order details...</div>;
  }

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Order not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order #{order.order_number}</h1>
          <p className="text-muted-foreground">{order.title}</p>
          <Badge className="mt-2">{order.status}</Badge>
          {paymentStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              <p className="font-bold">Payment Successful!</p>
              <p>Your order has been paid and is now in progress.</p>
            </div>
          )}
          {paymentStatus === 'cancel' && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
              <p className="font-bold">Payment Canceled</p>
              <p>Your payment was canceled. You can try again from the order form.</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>Order Details</CardTitle></CardHeader>
              <CardContent>
                <p>{order.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Conversation</CardTitle></CardHeader>
              <CardContent>
                <MessageList orderId={order.id} />
                <MessageInput orderId={order.id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Order Progress</CardTitle></CardHeader>
              <CardContent>
                <OrderTimeline stages={order.stages || []} />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Client Price</p>
                  <p>${order.client_price}</p>
                </div>
                {order.writer_price && (
                  <div>
                    <p className="font-semibold">Writer Price</p>
                    <p>${order.writer_price}</p>
                  </div>
                )}
                <div>
                  <p className="font-semibold">Deadline</p>
                  <p>{new Date(order.deadline).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Created At</p>
                  <p>{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;