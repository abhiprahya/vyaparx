export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalPurchases: number;
  lastPurchase: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  qrCode?: string;
  whatsappNumber?: string;
  gstNumber?: string;
  businessType?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  image?: string;
  sku: string;
  minStock: number;
  supplier?: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  total: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  createdAt: string;
  dueDate: string;
  paymentMethod?: string;
  paymentStatus?: 'Pending' | 'Paid' | 'Failed';
  deliveryStatus?: 'Pending' | 'Shipped' | 'Delivered';
}

export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'WhatsApp' | 'Email' | 'SMS';
  status: 'Draft' | 'Active' | 'Completed';
  targetCustomers: string[];
  message: string;
  scheduledAt?: string;
  createdAt: string;
  sentCount?: number;
  deliveredCount?: number;
  readCount?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  customerId: string;
  amount: number;
  method: 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'ONDC';
  status: 'Pending' | 'Success' | 'Failed' | 'Refunded';
  transactionId?: string;
  createdAt: string;
  gateway?: string;
}

export interface DeliveryOrder {
  id: string;
  invoiceId: string;
  customerId: string;
  items: InvoiceItem[];
  deliveryPartner: 'Zomato' | 'Swiggy' | 'Dunzo' | 'Self' | 'BlueDart' | 'DTDC';
  status: 'Pending' | 'Assigned' | 'Picked' | 'InTransit' | 'Delivered' | 'Failed';
  trackingId?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
}

export interface DailyRequirement {
  id: string;
  customerId: string;
  customerName: string;
  items: RequirementItem[];
  requestDate: string;
  status: 'Pending' | 'Quoted' | 'Confirmed' | 'Delivered' | 'Paid';
  totalAmount?: number;
  notes?: string;
  source: 'WhatsApp' | 'Call' | 'Visit' | 'App';
}

export interface RequirementItem {
  productName: string;
  quantity: number;
  unit: string;
  estimatedPrice?: number;
  notes?: string;
}

export interface WhatsAppLead {
  id: string;
  customerPhone: string;
  customerName?: string;
  message: string;
  timestamp: string;
  status: 'New' | 'Responded' | 'Converted' | 'Closed';
  assignedTo?: string;
  followUpDate?: string;
}

export interface Language {
  code: 'en' | 'hi';
  name: string;
  nativeName: string;
}