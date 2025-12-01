import React, { useState, useEffect, useCallback } from 'react';
import {
    getFirestore, doc, addDoc, updateDoc, deleteDoc,
    onSnapshot, collection, query, serverTimestamp
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import {
    Ticket, ShoppingCart, Monitor, Airplay, BatteryCharging, Hammer,
    Settings, Tablet, Search, X, ArrowLeft, Clock, Calendar, Smartphone,
    User, DollarSign, Package, CheckCircle, AlertTriangle, MessageSquare,
    ClipboardCheck, Clipboard, Zap, LogIn, HardHat, FileText, Check
} from 'lucide-react';

// =====================================================================
// CONFIGURACIÓN E INICIALIZACIÓN DE FIREBASE
// =====================================================================

// Variables globales provistas por el entorno de Canvas
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : '';

// Inicialización de Firebase (se asume que la config está disponible)
const app = Object.keys(firebaseConfig).length > 0 ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

// Rutas de Colecciones Públicas (para datos compartidos)
const PUBLIC_BASE_PATH = (userId) => `artifacts/${appId}/public/data`;
const PUBLIC_ITEMS_PATH = (userId) => `${PUBLIC_BASE_PATH(userId)}/inventory`;
const PUBLIC_TICKETS_PATH = (userId) => `${PUBLIC_BASE_PATH(userId)}/tickets`;
const PUBLIC_SALES_PATH = (userId) => `${PUBLIC_BASE_PATH(userId)}/sales`;

// =====================================================================
// COMPONENTES DE UTILIDAD
// =====================================================================

// Botón Estilo Ferrari (Rojo, Elegante)
const FerrariButton = ({ children, onClick, className = '', disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center px-4 py-2 font-semibold text-white transition duration-300 rounded-lg shadow-md
        ${disabled 
            ? 'bg-red-300 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-[1.01]'}
        ${className}`}
    >
        {children}
    </button>
);

// Caja de Mensaje (Alert/Toast)
const MessageBox = ({ title, message, onClose, type = 'info' }) => {
    const iconMap = {
        'Éxito': <CheckCircle className="w-6 h-6 mr-3 text-green-600" />,
        'Error': <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />,
        'Acceso Denegado': <X className="w-6 h-6 mr-3 text-yellow-600" />,
        'Eliminado': <CheckCircle className="w-6 h-6 mr-3 text-green-600" />,
        'info': <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />,
    };

    useEffect(() => {
        // Cierra automáticamente después de 4 segundos
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-xl shadow-2xl p-4 border-l-4 border-red-600 transform transition-all duration-300 animate-in fade-in slide-in-from-top-10">
            <div className="flex items-start">
                {iconMap[title] || iconMap['info']}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{message}</p>
                </div>
                <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

// =====================================================================
// PANTALLAS DE NAVEGACIÓN (SKELETONS PARA COMPILACIÓN)
// =====================================================================

// Pantalla de Ventas (Skeleton)
const VentasScreen = ({ inventory, updateInventoryItem, addSale }) => {
    // Implementación mínima para evitar errores de compilación.
    // Lógica real de ventas (carrito, checkout) iría aquí.

    const [message, setMessage] = useState(null);

    return (
        <div className="p-4 pt-6 md:p-8 h-full">
            {message && <MessageBox {...message} onClose={() => setMessage(null)} />}
            <div className="bg-white p-6 rounded-xl shadow-2xl h-full flex flex-col">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                    <ShoppingCart className="inline w-7 h-7 mr-2 text-red-600" />
                    Punto de Venta (POS)
                </h2>
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-center text-gray-500 text-lg">
                        Módulo de ventas en desarrollo. Usa el Inventario para gestionar stock.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Pantalla de Tickets (Skeleton)
const TicketsScreen = ({ tickets, addTicket, updateTicket, deleteTicket }) => {
    // Implementación mínima para evitar errores de compilación.
    // La lógica completa de tickets (formulario, lista, estados) iría aquí.
    const [message, setMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeView, setActiveView] = useState('list');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const filteredTickets = tickets.filter(ticket => 
        ticket.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async () => {
        // Lógica de guardado/actualización simulada
        setMessage({ title: 'Éxito', message: 'Ticket guardado/actualizado (funcionalidad completa en desarrollo).' });
        setActiveView('list');
    };

    const TicketForm = () => (
        <div className="p-6 bg-white rounded-xl shadow-2xl max-w-lg mx-auto">
            <div className="flex items-center mb-6">
                <button onClick={() => setActiveView('list')} className="text-gray-600 hover:text-red-600 mr-4">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Editar Ticket' : 'Nuevo Ticket'}</h2>
            </div>
             <FerrariButton onClick={handleSave} className="mt-6 w-full py-3">
                Guardar Ticket
             </FerrariButton>
        </div>
    );

    const TicketRow = ({ ticket }) => (
        <div className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition duration-150">
            <div className="w-1/3 text-gray-800 truncate font-medium">{ticket.cliente || 'N/A'}</div>
            <div className="w-1/3 text-gray-600 truncate">{ticket.equipo || 'N/A'}</div>
            <div className="w-1/6 text-xs text-red-600 font-bold">{ticket.estado || 'PENDIENTE'}</div>
            <div className="w-1/6 flex justify-end space-x-2">
                <button 
                    onClick={() => {setIsEditing(true); setFormData(ticket); setActiveView('form');}}
                    className="text-sm text-blue-500 hover:text-blue-700"
                >
                    Detalles
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-4 pt-6 md:p-8 h-full">
            {message && <MessageBox {...message} onClose={() => setMessage(null)} />}
            {activeView === 'list' && (
                <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            <FileText className="inline w-7 h-7 mr-2 text-red-600" /> Tickets de Reparación
                        </h2>
                        <FerrariButton onClick={() => { setActiveView('form'); setIsEditing(false); setFormData({}); }}>
                            <ClipboardCheck className="w-5 h-5 mr-2" /> Nuevo Ticket
                        </FerrariButton>
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type="text"
                            placeholder="Buscar por Cliente o Equipo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {/* Encabezados de tabla */}
                    <div className="hidden sm:flex font-semibold text-sm text-gray-500 border-b pb-2 mb-2">
                        <div className="w-1/3">Cliente</div>
                        <div className="w-1/3">Equipo</div>
                        <div className="w-1/6">Estado</div>
                        <div className="w-1/6 text-right">Acciones</div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map(item => <TicketRow key={item.id} ticket={item} />)
                        ) : (
                            <p className="text-center text-gray-500 mt-12">No hay tickets activos.</p>
                        )}
                    </div>
                </div>
            )}
            {activeView === 'form' && <TicketForm />}
        </div>
    );
};

// =====================================================================
// PANTALLA DE INVENTARIO (InventoryScreen)
// =====================================================================

const InventoryScreen = ({
    inventory, categoryFilter, userRole,
    addInventoryItem, updateInventoryItem, deleteInventoryItem
}) => {
    const [activeView, setActiveView] = useState('list'); // 'list' o 'form'
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null); // { id, name }

    // Determina el nombre de la categoría actual para el formulario/título
    const currentCategoryName = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1).replace('s', '');

    // Estado inicial del formulario
    const initialFormState = {
        name: '', model: '', category: currentCategoryName, quantity: 0, price: 0
    };

    const [formData, setFormData] = useState(initialFormState);

    // Filtra por la pestaña activa y por término de búsqueda
    const filteredInventory = inventory.filter(item =>
        item.category.toLowerCase().includes(categoryFilter) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.model.toLowerCase().includes(searchTerm.toLowerCase()))
    ).sort((a, b) => a.name.localeCompare(b.name));

    // Reinicia el formulario al cambiar a la vista de lista o al cambiar de pestaña
    useEffect(() => {
        if (activeView === 'list') {
            setFormData({ ...initialFormState, category: currentCategoryName });
            setIsEditing(false);
            setConfirmAction(null); // Asegura que el modal de confirmación se oculte
        }
    }, [activeView, categoryFilter]);

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

    // Refactorizado para usar un modal de confirmación en lugar de window.confirm
    const handleDelete = (id, name) => {
        if (userRole !== 'Admin') {
            setMessage({ title: 'Acceso Denegado', message: 'Solo los administradores pueden eliminar items.' });
            return;
        }
        setConfirmAction({ id, name });
    };

    const confirmDeletion = async () => {
        const { id, name } = confirmAction;
        setConfirmAction(null); // Cierra el modal de confirmación

        try {
            await deleteInventoryItem(id);
            setMessage({ title: 'Eliminado', message: `${name} eliminado del inventario.` });
        } catch (error) {
            console.error("Error al eliminar item:", error);
            setMessage({ title: 'Error', message: 'No se pudo eliminar el item.' });
        }
    };

    const ConfirmModal = ({ action, onConfirm, onCancel }) => {
        if (!action) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
                    <h3 className="text-xl font-bold text-red-600 mb-4">Confirmar Eliminación</h3>
                    <p className="text-gray-700 mb-6">
                        ¿Estás seguro de que quieres eliminar **{action.name}** del inventario? Esta acción es irreversible.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                            Cancelar
                        </button>
                        <FerrariButton onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
                            <X className="w-5 h-5 mr-2" /> Eliminar
                        </FerrariButton>
                    </div>
                </div>
            </div>
        );
    };

    const InventoryItemRow = ({ item }) => (
        <div className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150 flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-1/4 font-medium text-gray-800 truncate">{item.name}</div>
            <div className="w-1/2 sm:w-1/4 text-gray-600 truncate text-sm sm:text-base">{item.model}</div>
            <div className="w-1/2 sm:w-1/6 text-gray-600 text-sm sm:text-base">{item.category}</div>
            <div className={`w-1/3 sm:w-1/6 font-bold text-sm sm:text-base ${item.quantity > 5 ? 'text-green-600' : item.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                {item.quantity}
            </div>
            <div className="w-1/3 sm:w-1/6 font-bold text-red-600 text-sm sm:text-base">${item.price.toFixed(2)}</div>
            <div className="w-1/3 sm:w-1/6 flex justify-end sm:justify-start space-x-2 mt-2 sm:mt-0">
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
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500 bg-white appearance-none"
                    // Si estamos agregando uno nuevo desde una vista filtrada, la categoría se bloquea por defecto
                    disabled={!isEditing && categoryFilter}
                >
                    <option value="Mica">Mica</option>
                    <option value="Funda">Funda</option>
                    <option value="Accesorio">Accesorio</option>
                    <option value="Herramienta">Herramienta</option>
                </select>

                <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Protector de Pantalla, Batería" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />

                <label className="block text-sm font-medium text-gray-700">Modelo o Marca Compatible</label>
                <input name="model" value={formData.model} onChange={handleChange} placeholder="Ej: iPhone 15 Pro, Samsung" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Cantidad Disponible</label>
                        <input name="quantity" type="number" min="0" value={formData.quantity} onChange={handleChange} placeholder="Cantidad" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Precio de Venta ($)</label>
                        <input name="price" type="number" min="0.01" step="0.01" value={formData.price} onChange={handleChange} placeholder="Precio" className="p-3 border rounded-lg w-full focus:ring-red-500 focus:border-red-500" />
                    </div>
                </div>
            </div>

            <FerrariButton onClick={handleSave} className="mt-6 w-full py-3" disabled={userRole !== 'Admin'}>
                <Check className="w-5 h-5 mr-2" /> Guardar Item {userRole !== 'Admin' && '(Solo Admin)'}
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
            titleIcon = <HardHat className="inline w-7 h-7 mr-2 text-red-600" />;
            titleText = 'Inventario de Herramientas';
            break;
        default:
            titleIcon = <Package className="inline w-7 h-7 mr-2 text-red-600" />;
            titleText = 'Inventario General';
            break;
    }

    return (
        <div className="p-4 pt-6 md:p-8 h-full">
            {message && <MessageBox {...message} onClose={() => setMessage(null)} />}
            {confirmAction && <ConfirmModal action={confirmAction} onConfirm={confirmDeletion} onCancel={() => setConfirmAction(null)} />}

            {activeView === 'list' && (
                <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            {titleIcon} {titleText}
                        </h2>
                        <FerrariButton
                            onClick={() => { setActiveView('form'); setIsEditing(false); setFormData({ ...initialFormState, category: currentCategoryName }); }}
                            disabled={userRole !== 'Admin'}
                        >
                            <Zap className="w-5 h-5 mr-2" /> Agregar Item {userRole !== 'Admin' && '(Admin)'}
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

// =====================================================================
// PANTALLA DE LOGIN (ROLE SELECTION)
// =====================================================================

const LoginScreen = ({ onLogin }) => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                <Tablet className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">TALLER MÓVIL PRO</h1>
                <p className="text-gray-500 mb-8">Selecciona tu Rol para iniciar</p>
                <div className="space-y-4">
                    <FerrariButton onClick={() => onLogin('Admin')} className="w-full py-4 text-xl">
                        <HardHat className="w-6 h-6 mr-3" /> Administrador
                    </FerrariButton>
                    <button
                        onClick={() => onLogin('User')}
                        className="w-full py-4 text-xl font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 shadow-md"
                    >
                        <User className="w-6 h-6 mr-3 inline" /> Empleado
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-6">Acceso a datos compartidos: {appId}</p>
            </div>
        </div>
    );
};


// =====================================================================
// COMPONENTE PRINCIPAL (APP)
// =====================================================================

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
            // Ordenar por fecha de entrada (asumiendo que existe o es 0 si no existe)
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
            category: data.category || 'Accesorio', // Asegura una categoría por defecto
            createdAt: serverTimestamp(),
        });
    };

    const updateInventoryItem = async (id, data) => {
        if (!db || !userId) return;
        // Solo actualiza los campos proporcionados, no el id
        const { id: _, ...updateData } = data;
        return updateDoc(doc(db, PUBLIC_ITEMS_PATH(userId), id), updateData);
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
                    <p className="text-lg">Conectando a Taller Móvil...</p>
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
                    categoryFilter="mica"
                    userRole={userRole}
                    addInventoryItem={addInventoryItem}
                    updateInventoryItem={updateInventoryItem}
                    deleteInventoryItem={deleteInventoryItem}
                />;
            case 'fundas':
                return <InventoryScreen
                    inventory={inventory}
                    categoryFilter="funda"
                    userRole={userRole}
                    addInventoryItem={addInventoryItem}
                    updateInventoryItem={updateInventoryItem}
                    deleteInventoryItem={deleteInventoryItem}
                />;
            case 'accesorios':
                return <InventoryScreen
                    inventory={inventory}
                    categoryFilter="accesorio"
                    userRole={userRole}
                    addInventoryItem={addInventoryItem}
                    updateInventoryItem={updateInventoryItem}
                    deleteInventoryItem={deleteInventoryItem}
                />;
            case 'herramientas':
                return <InventoryScreen
                    inventory={inventory}
                    categoryFilter="herramienta"
                    userRole={userRole}
                    addInventoryItem={addInventoryItem}
                    updateInventoryItem={updateInventoryItem}
                    deleteInventoryItem={deleteInventoryItem}
                />;
            case 'settings':
                return (
                    <div className="p-4 pt-6 md:p-8 h-full">
                        <div className="flex flex-col h-full bg-white rounded-xl shadow-2xl p-6">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Configuración <Settings className="inline w-7 h-7 mr-2 text-red-600" /></h2>

                            <div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Información de Usuario</h3>
                                <p className="text-gray-600">
                                    **Rol Actual:** <span className={`font-bold ${userRole === 'Admin' ? 'text-red-600' : 'text-blue-600'}`}>{userRole}</span>
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-6 border border-gray-100 flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">ID de Usuario (Referencia)</h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Tu ID único de Firebase (puedes compartirlo para colaborar):
                                </p>
                                <code className="block break-all bg-white p-3 rounded-lg text-sm text-gray-700 select-all border border-dashed border-gray-300">
                                    {userId}
                                </code>
                            </div>

                            <FerrariButton onClick={() => setUserRole(null)} className="mt-4 py-3 bg-gray-700 hover:bg-gray-800">
                                <LogIn className="w-5 h-5 mr-2 transform rotate-180" />
                                Cerrar Sesión y Cambiar Rol
                            </FerrariButton>
                        </div>
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
            {/* Encabezado Estilo App */}
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
            <nav className="sticky bottom-0 bg-white border-t border-gray-100 shadow-2xl z-10 p-2 flex justify-around md:p-3 rounded-t-xl">
                {[
                    { key: 'tickets', icon: FileText, label: 'Tickets' },
                    { key: 'sales', icon: ShoppingCart, label: 'Ventas' },
                    { key: 'micas', icon: Monitor, label: 'Micas' },
                    { key: 'fundas', icon: Airplay, label: 'Fundas' },
                    { key: 'accesorios', icon: BatteryCharging, label: 'Accs.' },
                    { key: 'herramientas', icon: Hammer, label: 'Herr.' },
                    { key: 'settings', icon: Settings, label: 'Ajustes' },
                ].map(item => (
                    <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={`flex flex-col items-center p-2 rounded-xl transition duration-200 flex-1 mx-0.5
                            ${activeTab === item.key
                                ? 'text-red-600 bg-red-50 font-bold shadow-inner'
                                : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                            }`}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs mt-1 block">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default App;