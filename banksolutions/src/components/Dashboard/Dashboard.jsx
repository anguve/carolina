import { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [view, setView] = useState('');
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [saleData, setSaleData] = useState({
    product: '',
    requestedLimit: '',
    franchise: '',
    rate: null,
    status: 'Open',
    createdBy: 1,
    updatedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    fetchUsers();
    fetchSales();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/getUsers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ createdBy: 1, updatedBy: 1 })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/getSales', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSales(data.data.response);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleSaleSubmit = async event => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/addSales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...saleData, createdBy: 1, updatedBy: 1 })
      });
      if (response.ok) {
        alert('Venta radicada exitosamente');
        fetchSales();
      } else {
        alert('Error al radicar la venta');
      }
    } catch (error) {
      console.error('Error submitting sale:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Bienvenido al sistema</h2>
      <button className="dashboard-button" onClick={() => setView('users')}>
        Usuarios
      </button>
      <button className="dashboard-button" onClick={() => setView('radicar')}>
        Radicar Venta
      </button>

      {view === 'users' && (
        <div>
          <h3>Lista de Usuarios</h3>
          <table className="dashboard-table styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Creado</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'radicar' && (
        <div>
          <h3>Radicar Nueva Venta</h3>
          <form className="dashboard-form" onSubmit={handleSaleSubmit}>
            <label>Producto:</label>
            <select
              required
              onChange={e =>
                setSaleData({ ...saleData, product: e.target.value })
              }
            >
              <option value="">Seleccione un producto</option>
              <option value="Credito de Consumo">Crédito de Consumo</option>
              <option value="Libranza Libre Inversión">
                Libranza Libre Inversión
              </option>
              <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
            </select>

            <label>Cupo Solicitado:</label>
            <input
              type="text"
              placeholder="Ej: 1.000.000"
              onChange={e =>
                setSaleData({ ...saleData, requestedLimit: e.target.value })
              }
            />

            <label>Franquicia:</label>
            <select
              onChange={e =>
                setSaleData({ ...saleData, franchise: e.target.value })
              }
            >
              <option value="AMEX">AMEX</option>
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">MASTERCARD</option>
            </select>

            <label>Tasa:</label>
            <input
              type="text"
              placeholder="Ej: 10.58"
              onChange={e => setSaleData({ ...saleData, rate: e.target.value })}
            />

            <button type="submit">Guardar Venta</button>
          </form>

          <h3>Lista de Ventas</h3>
          <table className="dashboard-table styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cupo Solicitado</th>
                <th>Franquicia</th>
                <th>Tasa</th>
                <th>Estado</th>
                <th>Creado Por</th>
                <th>Editado Por</th>
                <th>Fecha Creación</th>
                <th>Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.product}</td>
                  <td>{sale.requestedLimit}</td>
                  <td>{sale.franchise}</td>
                  <td>{sale.rate || 'N/A'}</td>
                  <td>{sale.status}</td>
                  <td>{sale.creator.email}</td>
                  <td>{sale.editor.email}</td>
                  <td>{new Date(sale.createdAt).toLocaleString()}</td>
                  <td>{new Date(sale.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
