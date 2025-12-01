import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  setLogLevel
} from 'firebase/firestore';
import { 
  ShoppingCart, 
  Ticket, 
  Search, 
  Monitor,      // Mica (Pantalla)
  Airplay,      // Funda
  BatteryCharging, // Accesorios (Cargadores, baterías)
  CreditCard, 
  CheckCircle, 
  XCircle, 
  History, 
  DollarSign, 
  Tablet, 
  ArrowLeft,
  Settings,
  Hammer, // Nuevo ícono para Herramientas
  User,
  Lock,
  LogIn
} from 'lucide-react';

// --- CONFIGURACIÓN DE FIREBASE (Variables Globales Obligatorias) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Inicialización de la aplicación
let app, db, auth;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  setLogLevel('debug'); // Habilitar logs para depuración de Firestore
} catch (e) {
  console.error("Error al inicializar Firebase:", e);
}

// Rutas de Colecciones Públicas (para compartir datos del taller)
const PUBLIC_ITEMS_PATH = (uid) => `artifacts/${appId}/public/data/workshop_items`;
const PUBLIC_TICKETS_PATH = (uid) => `artifacts/${appId}/public/data/workshop_tickets`;
const PUBLIC_SALES_PATH = (uid) => `artifacts/${appId}/public/data/workshop_sales`;

// --- ROLES Y AUTENTICACIÓN SIMULADA ---
// En una aplicación real, esto se manejaría con Firebase Authentication y Firestore Security Rules
const ADMIN_USER = 'Ivan';
const ADMIN_PASS = '123';

/**
 * Genera un ID de folio único simple basado en la fecha y un hash corto.
 */
const generateFolio = (prefix) => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = date.getTime().toString().slice(-4);
  return `${prefix}-${dateStr}-${timeStr}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
};

/**
 * Componente de Botón Primario con Estilo Ferrari
 */
const FerrariButton = ({ children, onClick, disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center px-4 py-2 text-sm font-semibold 
      rounded-lg transition-all duration-200 shadow-md transform active:scale-[0.98]
      ${disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-inner'
        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/50 hover:shadow-red-600/70'
      }
      ${className}
    `}
  >
    {children}
  </button>
);

/**
 * Componente para mostrar mensajes de estado
 */
const MessageBox = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6 whitespace-pre-line">{message}</p>
      <FerrariButton onClick={onClose} className="w-full">
        Aceptar
      </FerrariButton>
    </div>
  </div>
);

// ---------------------------------------------------------------------
// MÓDULO DE LOGIN
// ---------------------------------------------------------------------

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      onLogin('Admin');
    } else if (username && password) {
      onLogin('User');
    } else {
      setError('Por favor, ingresa un nombre de usuario y contraseña.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border-t-8 border-red-600">
        <div className="text-center mb-6">
          <Tablet className="w-12 h-12 mx-auto text-red-600" />
          <h2 className="text-3xl font-extrabold text-gray-800 mt-3">Iniciar Sesión</h2>
          <p className="text-sm text-gray-500">Taller Móvil PRO</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <FerrariButton type="submit" className="w-full py-3 mt-6 text-lg">
            <LogIn className="w-5 h-5 mr-2" />
            Acceder
          </FerrariButton>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 border-t pt-4">
          Admin: Ivan / 123 | Usuario estándar: Cualquier otro
        </p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// MÓDULO DE VENTAS (SALES SCREEN)
// ---------------------------------------------------------------------

const VentasScreen = ({ db, userId, inventory, updateInventoryItem, addSale }) => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [message, setMessage] = useState(null);

  const filteredInventory = useMemo(() => {
    if (!searchTerm) return inventory;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return inventory.filter(item =>
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      item.model.toLowerCase().includes(lowerSearchTerm) ||
      item.category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [inventory, searchTerm]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const ivaRate = 0.16; // 16% IVA opcional
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  const addToCart = useCallback((item, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(i => i.id === item.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        // Verificar stock disponible
        const invItem = inventory.find(i => i.id === item.id);
        if (newCart[existingItemIndex].quantity + quantity > invItem.quantity) {
             setMessage({ title: 'Alerta de Stock', message: `Solo quedan ${invItem.quantity} unidades de ${item.name} en inventario.` });
             return prevCart;
        }
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { ...item, quantity }];
    });
  }, [inventory]);

  const updateCartQuantity = (id, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== id);
      }
      // Verificar stock
      const itemToUpdate = prevCart.find(i => i.id === id);
      const invItem = inventory.find(i => i.id === id);
      if (newQuantity > invItem.quantity) {
          setMessage({ title: 'Alerta de Stock', message: `Solo quedan ${invItem.quantity} unidades de ${itemToUpdate.name} en inventario.` });
          return prevCart; // Mantener la cantidad anterior si excede el stock
      }
      
      return prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const processSale = async () => {
    if (cart.length === 0) {
      setMessage({ title: 'Error', message: 'El carrito está vacío. Agrega productos para procesar la venta.' });
      return;
    }

    try {
      const saleFolio = generateFolio('VTA');

      // 1. Registrar la Venta
      await addDoc(collection(db, PUBLIC_SALES_PATH(userId)), {
        folio: saleFolio,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: subtotal,
        iva: iva,
        total: total,
        method: paymentMethod,
        timestamp: serverTimestamp(),
      });

      // 2. Actualizar el Inventario
      for (const cartItem of cart) {
        const invItem = inventory.find(i => i.id === cartItem.id);
        if (invItem) {
          const newQuantity = (invItem.quantity || 0) - cartItem.quantity;
          // Se usa setDoc con merge:true para evitar sobrescribir todo el documento si solo queremos actualizar la cantidad.
          await updateInventoryItem(cartItem.id, { quantity: newQuantity });
        }
      }

      // 3. Limpiar el Carrito y mostrar éxito
      setCart([]);
      setSearchTerm('');
      setMessage({
        title: 'Venta Exitosa',
        message: `Venta #${saleFolio} registrada por $${total.toFixed(2)}.\nInventario actualizado.`,
      });

    } catch (error) {
      console.error("Error al procesar la venta:", error);
      setMessage({ title: 'Error del Sistema', message: 'No se pudo completar la venta. Revisa la consola para más detalles.' });
    }
  };

  const InventoryItemCard = ({ item }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg flex justify-between items-center mb-2">
      <div>
        <p className="font-semibold text-gray-800">{item.name} ({item.model})</p>
        <p className="text-xs text-gray-500">{item.category} | ${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-bold ${item.quantity > 5 ? 'text-green-600' : item.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
          {item.quantity} disp.
        </span>
        <FerrariButton 
          onClick={() => addToCart(item)} 
          disabled={item.quantity <= 0}
          className="px-3 py-1 text-xs"
        >
          <ShoppingCart className="w-4 h-4 mr-1" /> Add
        </FerrariButton>
      </div>
    </div>
  );

  return (
    <div className="p-4 pt-6 md:p-8 flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
      {message && <MessageBox {...message} onClose={() => setMessage(null)} />}
      
      {/* Columna de Productos Disponibles */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-xl shadow-2xl p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2 border-gray-100">
          <DollarSign className="inline w-6 h-6 mr-2 text-red-600" /> Venta Rápida
        </h2>
        
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Buscar producto, modelo o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredInventory.length > 0 ? (
            filteredInventory.map(item => (
              <InventoryItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">No se encontraron productos.</p>
          )}
        </div>
      </div>

      {/* Columna de Carrito y Total */}
      <div className="md:w-96 flex flex-col bg-white rounded-xl shadow-2xl p-4">
        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 border-gray-100">
          Carrito ({cart.length})
        </h3>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Agrega artículos a la venta.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center shadow-inner">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} c/u</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                    className="w-12 text-center border rounded-md text-sm py-1"
                  />
                  <button 
                    onClick={() => updateCartQuantity(item.id, 0)} 
                    className="text-red-500 hover:text-red-700 p-1 rounded-full"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Resumen de Total */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>IVA (16%):</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-2">
            <span>TOTAL:</span>
            <span className="text-red-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="mt-4 border-t pt-4">
          <label className="block text-sm font-medium mb-2">Método de Pago</label>
          <div className="flex space-x-2">
            {['Efectivo', 'Transferencia', 'Tarjeta'].map(method => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 px-3 py-1 text-xs rounded-lg border transition duration-150 ${
                  paymentMethod === method 
                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de Procesar */}
        <FerrariButton 
          onClick={processSale} 
          disabled={cart.length === 0}
          className="mt-6 w-full py-3 text-lg"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Procesar Venta
        </FerrariButton>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// MÓDULO DE TICKETS (REPAIR SCREEN)
// ---------------------------------------------------------------------

const TicketsScreen = ({ db, userId, tickets, addTicket, updateTicket, deleteTicket }) => {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'form'
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  const initialFormState = {
    clientName: '', phone: '', model: '', failureDesc: '',
    anticipo: 0, totalEstimado: 0, estado: 'Abierto', folio: '',
    fechaEntrada: new Date().toISOString().slice(0, 10),
  };

  useEffect(() => {
    setFormData(initialFormState);
  }, [activeView]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.clientName || !formData.model || !formData.failureDesc) {
      setMessage({ title: 'Error', message: 'Los campos Nombre del Cliente, Modelo y Falla son obligatorios.' });
      return;
    }

    try {
      if (isEditing && formData.id) {
        // Actualizar Ticket
        await updateTicket(formData.id, {
          ...formData,
          fechaActualizacion: serverTimestamp(),
        });
        setMessage({ title: 'Éxito', message: `Ticket ${formData.folio} actualizado correctamente.` });
      } else {
        // Crear Nuevo Ticket
        const newFolio = generateFolio('TKT');
        await addTicket({
          ...formData,
          folio: newFolio,
          fechaEntrada: serverTimestamp(),
          restaPagar: formData.totalEstimado - formData.anticipo,
        });
        setMessage({ title: 'Éxito', message: `Nuevo Ticket ${newFolio} creado con éxito.` });
      }
      setActiveView('list');
    } catch (error) {
      console.error("Error al guardar ticket:", error);
      setMessage({ title: 'Error del Sistema', message: 'No se pudo guardar el ticket.' });
    }
  };

  const handleEdit = (ticket) => {
    setIsEditing(true);
    setFormData({ ...ticket, fechaEntrada: ticket.fechaEntrada?.toDate().toISOString().slice(0, 10) || '' });
    setActiveView('form');
  };

  const handleDelete = async (id, folio) => {
    // Reemplazando confirm() con un mensaje box
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el Ticket ${folio}? Esta acción es irreversible.`);
    if (!confirmDelete) return;

    try {
      await deleteTicket(id);
      setMessage({ title: 'Eliminado', message: `Ticket ${folio} eliminado.` });
    } catch (error) {
      console.error("Error al eliminar ticket:", error);
      setMessage({ title: 'Error', message: 'No se pudo eliminar el ticket.' });
    }
  };

  const filteredTickets = useMemo(() => {
    if (!searchTerm) return tickets;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return tickets.filter(t =>
      t.folio.toLowerCase().includes(lowerSearchTerm) ||
      t.clientName.toLowerCase().includes(lowerSearchTerm) ||
      t.phone.toLowerCase().includes(lowerSearchTerm) ||
      t.model.toLowerCase().includes(lowerSearchTerm)
    );
  }, [tickets, searchTerm]);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Abierto': return 'bg-yellow-100 text-yellow-800';
      case 'En reparación': return 'bg-blue-100 text-blue-800';
      case 'Listo para entregar': return 'bg-green-100 text-green-800';
      case 'Cerrado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TicketCard = ({ ticket }) => (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-4 hover:shadow-xl transition duration-200 border-l-4 border-red-600">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-lg text-gray-800">
          <Ticket className="inline w-5 h-5 mr-1 text-red-600" /> Ticket #{ticket.folio}
        </h4>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.estado)}`}>
          {ticket.estado}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">Cliente: {ticket.clientName} | {ticket.model}</p>
      <p className="text-sm text-gray-500 truncate">Falla: {ticket.failureDesc}</p>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="font-bold text-red-600 text-xl">${((ticket.totalEstimado || 0) - (ticket.anticipo || 0)).toFixed(2)}</span>
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(ticket)} className="text-blue-500 hover:text-blue-700 text-sm">Editar</button>
          <button onClick={() => handleDelete(ticket.id, ticket.folio)} className="text-gray-500 hover:text-red-500 text-sm">Eliminar</button>
        </div>
      </div>
    </div>
  );

  const TicketForm = () => (
    <div className="p-4 bg-white rounded-xl shadow-2xl overflow-y-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => setActiveView('list')} className="text-gray-600 hover:text-red-600 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{isEditing ? `Editar Ticket #${formData.folio}` : 'Nuevo Ticket de Servicio'}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección de Cliente */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-red-600 mb-3">Datos del Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Nombre del Cliente*" className="p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono de Contacto" className="p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
            <input name="fechaEntrada" type="date" value={formData.fechaEntrada} onChange={handleChange} placeholder="Fecha de Entrada" className="p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" disabled={isEditing} />
          </div>
        </div>
        
        {/* Sección del Dispositivo */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-red-600 mb-3 mt-4">Datos del Dispositivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="model" value={formData.model} onChange={handleChange} placeholder="Marca y Modelo del Celular*" className="p-3 border rounded-lg focus:ring-red-500 focus:border-red-500" />
            <select name="estado" value={formData.estado} onChange={handleChange} className="p-3 border rounded-lg focus:ring-red-500 focus:border-red-500 bg-white">
              <option>Abierto</option>
              <option>En reparación</option>
              <option>Listo para entregar</option>
              <option>Cerrado</option>
            </select>
          </div>
          <textarea name="failureDesc" value={formData.failureDesc} onChange={handleChange} placeholder="Descripción de la Falla*" rows="3" className="w-full mt-4 p-3 border rounded-lg focus:ring-red-500 focus:border-red-500"></textarea>
        </div>

        {/* Sección de Pagos */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-red-600 mb-3 mt-4">Costos y Pagos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 mb-1 block">Total Estimado</label>
              <input name="totalEstimado" type="number" value={formData.totalEstimado} onChange={handleChange} placeholder="Total Estimado" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 mb-1 block">Anticipo Recibido</label>
              <input name="anticipo" type="number" value={formData.anticipo} onChange={handleChange} placeholder="Anticipo" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 mb-1 block">Resta a Pagar</label>
              <p className="p-3 border rounded-lg w-full bg-gray-50 font-bold text-lg text-red-600">
                ${((formData.totalEstimado || 0) - (formData.anticipo || 0)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FerrariButton onClick={handleSave} className="mt-8 w-full py-3 text-lg">
        {isEditing ? 'Guardar Cambios' : 'Generar y Registrar Ticket'}
      </FerrariButton>
    </div>
  );

  return (
    <div className="p-4 pt-6 md:p-8 h-full">
      {message && <MessageBox {...message} onClose={() => setMessage(null)} />}
      
      {activeView === 'list' && (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              <History className="inline w-7 h-7 mr-2 text-red-600" /> Tickets de Reparación
            </h2>
            <FerrariButton onClick={() => { setActiveView('form'); setIsEditing(false); }}>
              <Ticket className="w-5 h-5 mr-2" /> Nuevo Ticket
            </FerrariButton>
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar por Folio, Cliente, Teléfono o Modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-12">No hay tickets activos que coincidan con la búsqueda.</p>
            )}
          </div>
        </div>
      )}

      {activeView === 'form' && <TicketForm />}
    </div>
  );
};


// ---------------------------------------------------------------------
// MÓDULO DE INVENTARIO (INVENTORY SCREEN)
// ---------------------------------------------------------------------

const InventoryScreen = ({ inventory, categoryFilter, userRole, addInventoryItem, updateInventoryItem, deleteInventoryItem }) => {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'form'
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  // Mapeo del filtro de la URL a la categoría real del inventario
  const categoryMap = {
    'micas': 'Mica',
    'fundas': 'Funda',
    'accesorios': 'Accesorio', 
    'herramientas': 'Herramienta', // Nueva categoría
  };
  
  // Categoría actual (para usar en el título y en el formulario si es nuevo)
  const currentCategoryName = categoryFilter ? categoryMap[categoryFilter] || 'Inventario General' : 'Inventario General';
  
  // Filtrar el inventario por la categoría activa en la barra de navegación
  const filteredInventoryByCategory = useMemo(() => {
    const filterValue = categoryMap[categoryFilter];
    return inventory.filter(item => item.category === filterValue);
  }, [inventory, categoryFilter]);

  // Filtrado final con la búsqueda
  const filteredInventory = useMemo(() => {
    if (!searchTerm) return filteredInventoryByCategory;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return filteredInventoryByCategory.filter(item =>
        item.name.toLowerCase().includes(lowerSearchTerm) ||
        item.model.toLowerCase().includes(lowerSearchTerm)
    );
  }, [filteredInventoryByCategory, searchTerm]);


  const initialFormState = {
    name: '', model: '', category: currentCategoryName, quantity: 0, price: 0
  };

  useEffect(() => {
    // Si la vista es lista, reinicia el formulario
    if (activeView === 'list') {
        setFormData({ ...initialFormState, category: currentCategoryName });
        setIsEditing(false);
    }
  }, [activeView, categoryFilter]); // Dependencia agregada para resetear al cambiar de pestaña

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    if (userRole !== 'Admin') {
        setMessage({ title: 'Acceso Denegado', message: 'Solo los administradores pueden modificar el inventario.' });
        return;
    }

    if (!formData.name || !formData.model || formData.quantity < 0 || formData.price <= 0) {
      setMessage({ title: 'Error', message: 'Nombre, Modelo, Cantidad (>=0) y Precio (>0) son obligatorios.' });
      return;
    }

    try {
      if (isEditing && formData.id) {
        await updateInventoryItem(formData.id, formData);
        setMessage({ title: 'Éxito', message: `Item ${formData.name} actualizado correctamente.` });
      } else {
        await addInventoryItem(formData);
        setMessage({ title: 'Éxito', message: `Nuevo item ${formData.name} agregado al inventario.` });
      }
      setActiveView('list');
    } catch (error) {
      console.error("Error al guardar inventario:", error);
      setMessage({ title: 'Error del Sistema', message: 'No se pudo guardar el item.' });
    }
  };

  const handleEdit = (item) => {
    if (userRole !== 'Admin') {
        setMessage({ title: 'Acceso Denegado', message: 'Solo los administradores pueden editar el inventario.' });
        return;
    }
    setIsEditing(true);
    setFormData(item);
    setActiveView('form');
  };

  const handleDelete = async (id, name) => {
    if (userRole !== 'Admin') {
        setMessage({ title: 'Acceso Denegado', message: 'Solo los administradores pueden eliminar items.' });
        return;
    }
    const confirmDelete = window.confirm(`¿Seguro que quieres eliminar ${name} del inventario?`);
    if (!confirmDelete) return;

    try {
      await deleteInventoryItem(id);
      setMessage({ title: 'Eliminado', message: `${name} eliminado del inventario.` });
    } catch (error) {
      console.error("Error al eliminar item:", error);
      setMessage({ title: 'Error', message: 'No se pudo eliminar el item.' });
    }
  };

  const InventoryItemRow = ({ item }) => (
    <div className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150">
      <div className="w-1/4 font-medium text-gray-800">{item.name}</div>
      <div className="w-1/4 text-gray-600">{item.model}</div>
      <div className="w-1/6 text-gray-600">{item.category}</div>
      <div className={`w-1/6 font-bold ${item.quantity > 5 ? 'text-green-600' : item.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>{item.quantity}</div>
      <div className="w-1/6 font-bold text-red-600">${item.price.toFixed(2)}</div>
      <div className="flex space-x-2">
        <button 
            onClick={() => handleEdit(item)} 
            className={`text-sm ${userRole === 'Admin' ? 'text-blue-500 hover:text-blue-700' : 'text-gray-400 cursor-not-allowed'}`}
            disabled={userRole !== 'Admin'}
        >
            Editar
        </button>
        {userRole === 'Admin' && (
            <button onClick={() => handleDelete(item.id, item.name)} className="text-gray-500 hover:text-red-500 text-sm">Eliminar</button>
        )}
      </div>
    </div>
  );

  const InventoryForm = () => (
    <div className="p-6 bg-white rounded-xl shadow-2xl max-w-lg mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => setActiveView('list')} className="text-gray-600 hover:text-red-600 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Editar Item' : 'Agregar Nuevo Item'}</h2>
      </div>

      <div className="space-y-4">
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500 bg-white"
          // Si estamos agregando uno nuevo desde una vista filtrada, la categoría se bloquea por defecto
          disabled={!isEditing && categoryFilter} 
        >
          <option>Mica</option>
          <option>Funda</option>
          <option>Accesorio</option>
          <option>Herramienta</option>
        </select>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del Producto (Ej: Protector de Pantalla, Batería)" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
        <input name="model" value={formData.model} onChange={handleChange} placeholder="Modelo o Marca compatible (Ej: iPhone 15 Pro, Samsung)" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
        <input name="quantity" type="number" min="0" value={formData.quantity} onChange={handleChange} placeholder="Cantidad Disponible" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
        <input name="price" type="number" min="0.01" step="0.01" value={formData.price} onChange={handleChange} placeholder="Precio de Venta ($)" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
      </div>

      <FerrariButton onClick={handleSave} className="mt-6 w-full py-3" disabled={userRole !== 'Admin'}>
        Guardar Item {userRole !== 'Admin' && '(Solo Admin)'}
      </FerrariButton>
    </div>
  );

  // Título dinámico para la vista de lista
  let titleIcon, titleText;
  switch (categoryFilter) {
    case 'micas':
      titleIcon = <Monitor className="inline w-7 h-7 mr-2 text-red-600" />;
      titleText = 'Inventario de Micas';
      break;
    case 'fundas':
      titleIcon = <Airplay className="inline w-7 h-7 mr-2 text-red-600" />;
      titleText = 'Inventario de Fundas';
      break;
    case 'accesorios':
      titleIcon = <BatteryCharging className="inline w-7 h-7 mr-2 text-red-600" />;
      titleText = 'Inventario de Accesorios';
      break;
    case 'herramientas':
      titleIcon = <Hammer className="inline w-7 h-7 mr-2 text-red-600" />;
      titleText = 'Inventario de Herramientas';
      break;
    default:
      titleIcon = <BatteryCharging className="inline w-7 h-7 mr-2 text-red-600" />;
      titleText = 'Inventario de Accesorios';
      break;
  }

  return (
    <div className="p-4 pt-6 md:p-8 h-full">
      {message && <MessageBox {...message} onClose={() => setMessage(null)} />}

      {activeView === 'list' && (
        <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {titleIcon} {titleText}
            </h2>
            <FerrariButton 
                onClick={() => { setActiveView('form'); setIsEditing(false); }}
                disabled={userRole !== 'Admin'}
            >
              Agregar Item {userRole !== 'Admin' && '(Admin)'}
            </FerrariButton>
          </div>
          
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar por Nombre o Modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Encabezados de tabla */}
          <div className="hidden sm:flex font-semibold text-sm text-gray-500 border-b pb-2 mb-2">
            <div className="w-1/4">Nombre</div>
            <div className="w-1/4">Modelo</div>
            <div className="w-1/6">Categoría</div>
            <div className="w-1/6">Cantidad</div>
            <div className="w-1/6">Precio</div>
            <div className="w-1/6">Acciones</div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredInventory.length > 0 ? (
              filteredInventory.map(item => <InventoryItemRow key={item.id} item={item} />)
            ) : (
              <p className="text-center text-gray-500 mt-12">No hay items en la categoría de {currentCategoryName} que coincidan con la búsqueda.</p>
            )}
          </div>
        </div>
      )}

      {activeView === 'form' && <InventoryForm />}
    </div>
  );
};

// ---------------------------------------------------------------------
// COMPONENTE PRINCIPAL (APP)
// ---------------------------------------------------------------------

const App = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [userRole, setUserRole] = useState(null); // 'Admin', 'User', or null for unauthenticated

  // --- 1. CONEXIÓN Y AUTENTICACIÓN FIREBASE ---
  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth no inicializado.");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Autenticación anónima si no hay token
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
          } else {
            await signInAnonymously(auth);
          }
        } catch (error) {
          console.error("Error signing in:", error);
          // Set a fallback user ID if sign-in fails
          setUserId('anonymous-user-' + Math.random().toString(36).substring(2, 9));
        }
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  // --- 2. LISTENERS DE DATOS FIREBASE ---
  useEffect(() => {
    if (!isAuthReady || !userId || !db) return;

    // Listener para Inventario
    const qInv = query(collection(db, PUBLIC_ITEMS_PATH(userId)));
    const unsubInv = onSnapshot(qInv, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        quantity: doc.data().quantity || 0, // Asegurar cantidad numérica
        price: doc.data().price || 0, // Asegurar precio numérico
      }));
      setInventory(items);
    }, (error) => {
      console.error("Error fetching inventory:", error);
    });

    // Listener para Tickets
    const qTkt = query(collection(db, PUBLIC_TICKETS_PATH(userId)));
    const unsubTkt = onSnapshot(qTkt, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(items.sort((a, b) => (b.fechaEntrada?.toDate() || 0) - (a.fechaEntrada?.toDate() || 0)));
    }, (error) => {
      console.error("Error fetching tickets:", error);
    });

    return () => {
      unsubInv();
      unsubTkt();
    };
  }, [isAuthReady, userId]); // Depende de que la autenticación esté lista

  // --- 3. FUNCIONES CRUD PARA FIREBASE ---
  const addInventoryItem = async (data) => {
    if (!db || !userId) return;
    return addDoc(collection(db, PUBLIC_ITEMS_PATH(userId)), {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  const updateInventoryItem = async (id, data) => {
    if (!db || !userId) return;
    return updateDoc(doc(db, PUBLIC_ITEMS_PATH(userId), id), data);
  };

  const deleteInventoryItem = async (id) => {
    if (!db || !userId) return;
    return deleteDoc(doc(db, PUBLIC_ITEMS_PATH(userId), id));
  };

  const addTicket = async (data) => {
    if (!db || !userId) return;
    return addDoc(collection(db, PUBLIC_TICKETS_PATH(userId)), data);
  };

  const updateTicket = async (id, data) => {
    if (!db || !userId) return;
    return updateDoc(doc(db, PUBLIC_TICKETS_PATH(userId), id), data);
  };

  const deleteTicket = async (id) => {
    if (!db || !userId) return;
    return deleteDoc(doc(db, PUBLIC_TICKETS_PATH(userId), id));
  };

  const addSale = async (data) => {
    if (!db || !userId) return;
    return addDoc(collection(db, PUBLIC_SALES_PATH(userId)), data);
  };

  // --- 4. RENDERIZADO CONDICIONAL ---
  if (userRole === null) {
    return <LoginScreen onLogin={setUserRole} />;
  }

  const renderContent = () => {
    if (!isAuthReady) {
      return (
        <div className="flex justify-center items-center h-full text-red-600">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg">Cargando Taller...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'sales':
        return <VentasScreen 
          db={db} 
          userId={userId} 
          inventory={inventory} 
          updateInventoryItem={updateInventoryItem}
          addSale={addSale}
        />;
      case 'tickets':
        return <TicketsScreen 
          db={db} 
          userId={userId} 
          tickets={tickets} 
          addTicket={addTicket} 
          updateTicket={updateTicket} 
          deleteTicket={deleteTicket} 
        />;
      case 'micas':
        return <InventoryScreen 
            inventory={inventory}
            categoryFilter="micas"
            userRole={userRole}
            addInventoryItem={addInventoryItem}
            updateInventoryItem={updateInventoryItem}
            deleteInventoryItem={deleteInventoryItem}
        />;
      case 'fundas':
        return <InventoryScreen 
            inventory={inventory}
            categoryFilter="fundas"
            userRole={userRole}
            addInventoryItem={addInventoryItem}
            updateInventoryItem={updateInventoryItem}
            deleteInventoryItem={deleteInventoryItem}
        />;
      case 'accesorios':
        return <InventoryScreen 
            inventory={inventory}
            categoryFilter="accesorios"
            userRole={userRole}
            addInventoryItem={addInventoryItem}
            updateInventoryItem={updateInventoryItem}
            deleteInventoryItem={deleteInventoryItem}
        />;
      case 'herramientas':
        return <InventoryScreen 
            inventory={inventory}
            categoryFilter="herramientas"
            userRole={userRole}
            addInventoryItem={addInventoryItem}
            updateInventoryItem={updateInventoryItem}
            deleteInventoryItem={deleteInventoryItem}
        />;
      case 'settings':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Configuración <Settings className="inline w-7 h-7 mr-2 text-red-600" /></h2>
            
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Información de Usuario</h3>
                <p className="text-gray-600">
                  **Rol Actual:** <span className={`font-bold ${userRole === 'Admin' ? 'text-red-600' : 'text-blue-600'}`}>{userRole}</span>
                </p>
                <p className="text-gray-600">
                  **App ID:** <code className="font-semibold text-gray-700">{appId}</code>
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">ID de Usuario (Referencia)</h3>
                <p className="text-gray-600 mb-4">
                  Tu ID de usuario único de Firebase (útil para soporte o depuración):
                </p>
                <code className="block bg-gray-100 p-3 rounded-lg text-sm text-gray-700 select-all">
                  {userId}
                </code>
            </div>

            <FerrariButton onClick={() => setUserRole(null)} className="mt-8 w-full py-3">
                <LogIn className="w-5 h-5 mr-2 transform rotate-180" />
                Cerrar Sesión
            </FerrariButton>
          </div>
        )
      default:
        return <TicketsScreen 
          db={db} 
          userId={userId} 
          tickets={tickets} 
          addTicket={addTicket} 
          updateTicket={updateTicket} 
          deleteTicket={deleteTicket} 
        />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Encabezado Estilo Apple */}
      <header className="sticky top-0 bg-white shadow-lg z-10 p-4 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 flex items-center">
          <Tablet className="w-6 h-6 mr-2 text-red-600" /> 
          TALLER MÓVIL <span className="text-red-600 ml-1">PRO</span>
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">Rol: **{userRole}**</p>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Barra de Navegación Inferior Estilo App */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-100 shadow-2xl z-10 p-2 flex justify-around md:p-4 rounded-t-xl">
        {[
          { key: 'sales', icon: ShoppingCart, label: 'Ventas' },
          { key: 'tickets', icon: Ticket, label: 'Tickets' },
          { key: 'micas', icon: Monitor, label: 'Micas' },
          { key: 'fundas', icon: Airplay, label: 'Fundas' },
          { key: 'accesorios', icon: BatteryCharging, label: 'Accs.' },
          { key: 'herramientas', icon: Hammer, label: 'Herr.' }, // Nueva Pestaña
          { key: 'settings', icon: Settings, label: 'Ajustes' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex flex-col items-center p-2 rounded-xl transition duration-200 ${
              activeTab === item.key 
                ? 'text-red-600 bg-red-50 font-bold shadow-inner' 
                : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1 hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;