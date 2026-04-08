import { useParams } from "react-router-dom";
import Loader from "../../components/general/Loader";
import OrderDetail from "../../components/shop/OrderDetail";
import OrderTrackingTimeline from "../../components/shop/OrderTimeline";
import ShippingDetails from "../../components/shop/ShippingDetails";
import { useGetOrderByID } from "../../hooks/querys/useGetOrderHistory";

const OrderDetialPage = () => {
  const params = useParams();
  const order_id = params.id;
  const { data, isLoading } = useGetOrderByID(order_id || "");
  if (!data || isLoading) {
    return <Loader />;
  }
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <div className="col-span-1 md:col-span-2 bg-white rounded-2xl">
        <OrderDetail order={data} />
      </div>
      <div className="col-span-1 space-y-2">
        <ShippingDetails order={data} />
        <OrderTrackingTimeline order={data} />
      </div>
    </div>
  );
};

export default OrderDetialPage;
