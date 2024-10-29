import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import OrderConfirmation from './components/OrderConfirmation'

function App() {
  return (
    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App