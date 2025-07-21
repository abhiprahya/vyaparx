import { create } from 'zustand';
import { Customer, Product, Invoice, Campaign, Notification, Payment, DeliveryOrder, DailyRequirement, WhatsAppLead } from '../types';

interface AppState {
  // Language
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  
  // Campaigns
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  
  // Delivery Orders
  deliveryOrders: DeliveryOrder[];
  addDeliveryOrder: (order: Omit<DeliveryOrder, 'id' | 'createdAt'>) => void;
  updateDeliveryOrder: (id: string, order: Partial<DeliveryOrder>) => void;
  
  // Daily Requirements
  dailyRequirements: DailyRequirement[];
  addDailyRequirement: (requirement: Omit<DailyRequirement, 'id'>) => void;
  updateDailyRequirement: (id: string, requirement: Partial<DailyRequirement>) => void;
  
  // WhatsApp Leads
  whatsappLeads: WhatsAppLead[];
  addWhatsAppLead: (lead: Omit<WhatsAppLead, 'id'>) => void;
  updateWhatsAppLead: (id: string, lead: Partial<WhatsAppLead>) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Language
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  
  // Navigation
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  // Customers with Indian names
  customers: [
    {
      id: '1',
      name: 'Rajesh Kumar Sharma',
      phone: '+91 98765 43210',
      email: 'rajesh.sharma@email.com',
      address: 'Shop No. 15, Karol Bagh Market, New Delhi - 110005',
      totalPurchases: 125680,
      lastPurchase: '2 days ago',
      status: 'Active',
      createdAt: '2024-01-15',
      whatsappNumber: '+91 98765 43210',
      businessType: 'Retail Store',
      gstNumber: '07AAAAA0000A1Z5'
    },
    {
      id: '2',
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      email: 'priya.patel@email.com',
      address: 'B-12, Commercial Complex, Andheri West, Mumbai - 400058',
      totalPurchases: 89450,
      lastPurchase: '1 week ago',
      status: 'Active',
      createdAt: '2024-01-10',
      whatsappNumber: '+91 87654 32109',
      businessType: 'Beauty Salon',
      gstNumber: '27BBBBB1111B2Z6'
    },
    {
      id: '3',
      name: 'Mohammed Iqbal',
      phone: '+91 76543 21098',
      email: 'mohammed.iqbal@email.com',
      address: 'Shop 8, Charminar Market, Hyderabad - 500002',
      totalPurchases: 67890,
      lastPurchase: '3 days ago',
      status: 'Active',
      createdAt: '2024-01-08',
      whatsappNumber: '+91 76543 21098',
      businessType: 'Electronics Store'
    },
    {
      id: '4',
      name: 'Sunita Devi',
      phone: '+91 65432 10987',
      email: 'sunita.devi@email.com',
      address: 'Kirana Store, Main Road, Patna - 800001',
      totalPurchases: 45230,
      lastPurchase: '5 days ago',
      status: 'Active',
      createdAt: '2024-01-05',
      whatsappNumber: '+91 65432 10987',
      businessType: 'Grocery Store'
    },
    {
      id: '5',
      name: 'Arjun Reddy',
      phone: '+91 54321 09876',
      email: 'arjun.reddy@email.com',
      address: 'Medical Store, Gandhi Nagar, Bangalore - 560009',
      totalPurchases: 156780,
      lastPurchase: '1 day ago',
      status: 'Active',
      createdAt: '2024-01-12',
      whatsappNumber: '+91 54321 09876',
      businessType: 'Pharmacy'
    }
  ],
  
  addCustomer: (customer) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      qrCode: `customer_${Date.now()}`
    };
    set((state) => ({ customers: [...state.customers, newCustomer] }));
    
    get().addNotification({
      title: get().language === 'en' ? 'Customer Added' : 'ग्राहक जोड़ा गया',
      message: get().language === 'en' 
        ? `${customer.name} has been added successfully` 
        : `${customer.name} सफलतापूर्वक जोड़ा गया`,
      type: 'success',
      read: false
    });
  },
  
  updateCustomer: (id, customer) => {
    set((state) => ({
      customers: state.customers.map(c => c.id === id ? { ...c, ...customer } : c)
    }));
  },
  
  deleteCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter(c => c.id !== id)
    }));
  },
  
  // Products with Indian context
  products: [
    {
      id: '1',
      name: 'Tata Tea Premium',
      price: 250,
      stock: 100,
      category: 'Beverages',
      description: 'Premium quality Assam tea blend',
      sku: 'TT001',
      minStock: 20,
      supplier: 'Tata Consumer Products'
    },
    {
      id: '2',
      name: 'India Gate Basmati Rice',
      price: 180,
      stock: 50,
      category: 'Grains',
      description: 'Premium aged basmati rice 1kg',
      sku: 'IG002',
      minStock: 10,
      supplier: 'KRBL Limited'
    },
    {
      id: '3',
      name: 'Amul Butter',
      price: 60,
      stock: 75,
      category: 'Dairy',
      description: 'Fresh salted butter 100g',
      sku: 'AM003',
      minStock: 15,
      supplier: 'Amul'
    },
    {
      id: '4',
      name: 'Patanjali Atta',
      price: 45,
      stock: 120,
      category: 'Flour',
      description: 'Whole wheat flour 1kg',
      sku: 'PT004',
      minStock: 25,
      supplier: 'Patanjali Ayurved'
    },
    {
      id: '5',
      name: 'Maggi Noodles',
      price: 14,
      stock: 200,
      category: 'Instant Food',
      description: 'Masala instant noodles 70g',
      sku: 'MG005',
      minStock: 50,
      supplier: 'Nestle India'
    }
  ],
  
  addProduct: (product) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      sku: `SKU${Date.now()}`
    };
    set((state) => ({ products: [...state.products, newProduct] }));
    
    get().addNotification({
      title: get().language === 'en' ? 'Product Added' : 'उत्पाद जोड़ा गया',
      message: get().language === 'en' 
        ? `${product.name} has been added to inventory` 
        : `${product.name} इन्वेंटरी में जोड़ा गया`,
      type: 'success',
      read: false
    });
  },
  
  updateProduct: (id, product) => {
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, ...product } : p)
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(p => p.id !== id)
    }));
  },
  
  // Invoices with sample data
  invoices: [
    {
      id: 'INV001',
      customerId: '1',
      customerName: 'Rajesh Kumar Sharma',
      items: [
        { productId: '1', productName: 'Tata Tea Premium', quantity: 2, price: 250, total: 500 },
        { productId: '3', productName: 'Amul Butter', quantity: 3, price: 60, total: 180 }
      ],
      total: 680,
      status: 'Paid',
      createdAt: '2024-01-20',
      dueDate: '2024-02-20',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered'
    },
    {
      id: 'INV002',
      customerId: '2',
      customerName: 'Priya Patel',
      items: [
        { productId: '2', productName: 'India Gate Basmati Rice', quantity: 1, price: 180, total: 180 }
      ],
      total: 180,
      status: 'Sent',
      createdAt: '2024-01-21',
      dueDate: '2024-02-21',
      paymentStatus: 'Pending',
      deliveryStatus: 'Pending'
    }
  ],
  
  addInvoice: (invoice) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: `INV${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({ invoices: [...state.invoices, newInvoice] }));
    
    get().addNotification({
      title: get().language === 'en' ? 'Invoice Created' : 'चालान बनाया गया',
      message: get().language === 'en' 
        ? `Invoice for ${invoice.customerName} created` 
        : `${invoice.customerName} के लिए चालान बनाया गया`,
      type: 'success',
      read: false
    });
  },
  
  updateInvoice: (id, invoice) => {
    set((state) => ({
      invoices: state.invoices.map(i => i.id === id ? { ...i, ...invoice } : i)
    }));
  },
  
  // Campaigns
  campaigns: [
    {
      id: '1',
      name: 'Diwali Special Offers',
      type: 'WhatsApp',
      status: 'Active',
      targetCustomers: ['1', '2', '3'],
      message: 'Special Diwali discounts! Get 20% off on all products. Valid till 31st Oct.',
      createdAt: '2024-01-15',
      sentCount: 150,
      deliveredCount: 145,
      readCount: 89
    }
  ],
  
  addCampaign: (campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({ campaigns: [...state.campaigns, newCampaign] }));
    
    get().addNotification({
      title: get().language === 'en' ? 'Campaign Created' : 'अभियान बनाया गया',
      message: get().language === 'en' 
        ? `${campaign.name} campaign has been created` 
        : `${campaign.name} अभियान बनाया गया है`,
      type: 'success',
      read: false
    });
  },
  
  updateCampaign: (id, campaign) => {
    set((state) => ({
      campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...campaign } : c)
    }));
  },
  
  // Notifications
  notifications: [
    {
      id: '1',
      title: 'Welcome to VyaparX',
      message: 'Your business management platform is ready to use!',
      type: 'info',
      read: false,
      createdAt: new Date().toISOString()
    }
  ],
  
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    set((state) => ({ 
      notifications: [newNotification, ...state.notifications].slice(0, 50) 
    }));
  },
  
  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    }));
  },
  
  clearNotifications: () => {
    set({ notifications: [] });
  },
  
  // Payments
  payments: [
    {
      id: 'PAY001',
      invoiceId: 'INV001',
      customerId: '1',
      amount: 680,
      method: 'UPI',
      status: 'Success',
      transactionId: 'UPI123456789',
      createdAt: '2024-01-20',
      gateway: 'PhonePe'
    }
  ],
  
  addPayment: (payment) => {
    const newPayment: Payment = {
      ...payment,
      id: `PAY${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({ payments: [...state.payments, newPayment] }));
  },
  
  updatePayment: (id, payment) => {
    set((state) => ({
      payments: state.payments.map(p => p.id === id ? { ...p, ...payment } : p)
    }));
  },
  
  // Delivery Orders
  deliveryOrders: [
    {
      id: 'DEL001',
      invoiceId: 'INV001',
      customerId: '1',
      items: [
        { productId: '1', productName: 'Tata Tea Premium', quantity: 2, price: 250, total: 500 }
      ],
      deliveryPartner: 'Dunzo',
      status: 'Delivered',
      trackingId: 'DUN123456',
      estimatedDelivery: '2024-01-21',
      actualDelivery: '2024-01-21',
      createdAt: '2024-01-20'
    }
  ],
  
  addDeliveryOrder: (order) => {
    const newOrder: DeliveryOrder = {
      ...order,
      id: `DEL${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    set((state) => ({ deliveryOrders: [...state.deliveryOrders, newOrder] }));
  },
  
  updateDeliveryOrder: (id, order) => {
    set((state) => ({
      deliveryOrders: state.deliveryOrders.map(o => o.id === id ? { ...o, ...order } : o)
    }));
  },
  
  // Daily Requirements
  dailyRequirements: [
    {
      id: 'REQ001',
      customerId: '1',
      customerName: 'Rajesh Kumar Sharma',
      items: [
        { productName: 'Milk', quantity: 2, unit: 'liters', estimatedPrice: 60 },
        { productName: 'Bread', quantity: 4, unit: 'packets', estimatedPrice: 120 }
      ],
      requestDate: '2024-01-22',
      status: 'Pending',
      source: 'WhatsApp',
      notes: 'Regular daily order'
    }
  ],
  
  addDailyRequirement: (requirement) => {
    const newRequirement: DailyRequirement = {
      ...requirement,
      id: `REQ${Date.now()}`
    };
    set((state) => ({ dailyRequirements: [...state.dailyRequirements, newRequirement] }));
  },
  
  updateDailyRequirement: (id, requirement) => {
    set((state) => ({
      dailyRequirements: state.dailyRequirements.map(r => r.id === id ? { ...r, ...requirement } : r)
    }));
  },
  
  // WhatsApp Leads
  whatsappLeads: [
    {
      id: 'LEAD001',
      customerPhone: '+91 99999 88888',
      customerName: 'Amit Singh',
      message: 'Hi, I need 5kg rice and 2kg dal. Can you deliver today?',
      timestamp: new Date().toISOString(),
      status: 'New'
    }
  ],
  
  addWhatsAppLead: (lead) => {
    const newLead: WhatsAppLead = {
      ...lead,
      id: `LEAD${Date.now()}`
    };
    set((state) => ({ whatsappLeads: [...state.whatsappLeads, newLead] }));
  },
  
  updateWhatsAppLead: (id, lead) => {
    set((state) => ({
      whatsappLeads: state.whatsappLeads.map(l => l.id === id ? { ...l, ...lead } : l)
    }));
  }
}));