import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams} from "react-router-dom";
import './App.css';
import BubbleBackground from './BubbleBackground';
import BlobButton from './BlobButton';
import FlipCard from './FlipCard';
import products from './products';
import tiles from './tiles';

export default function App() {
  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* SVG фильтр для эффекта пузырьков на кнопках */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>
        
        <BubbleBackground/>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li> 
              <Link to="/register">Register</Link>
            </li>
            <li> 
              <Link to="/menu">Menu</Link>
            </li>            
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/tiles/:name" element={<Tiles />} />          
          <Route path="/menu/:" element={<Menu />} /> 
          <Route path="/reset" element={<PasswordReset />} />
          <Route path="/details/:id" element={<ItemDetails />} />          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();
  
  const handleBuy = (product) => {
    // Переход на страницу с подробной информацией о товаре
    navigate(`/details/${product.id}`);

    //----------------------------------
    //    console.log(`Куплен товар: ${product.name} за ${product.price}`);
    //    alert(`Вы купили: ${product.name} за ${product.priceFormatted}`);
    // Здесь можно добавить логику корзины
  };
  
  return (
    <div className="page-content">
      <h2><b>Home</b></h2>
      
      <div className="cards">
        {products.map(product => (
          <FlipCard
            key={product.id}
            image={product.image}
            backImage={product.backImage}
            title={product.name}
            tile={product.tile}
            buttonText="Купить"
            onButtonClick={() => handleBuy(product)}
          />
        ))}
      </div>
    </div>
  );
}

function Menu() {
  const navigate = useNavigate();
  
  const handleTile = (tile) => {
    navigate(`/tiles/${tile.name}`);
  };
  
  return (
    <div className="menu-container">
      <h2>Жанры книг</h2>
      <div className="tile-container">
        {tiles.map(tile => (
          <button 
            key={tile.name} 
            className="tile-button"
            onClick={() => handleTile(tile)}
          >
            <img src={tile.image} alt={tile.name} />
            <span>{tile.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Tiles() {
  const { name } = useParams();
  const navigate = useNavigate();
  
  // Фильтруем товары по жанру
  const genreProducts = products.filter(product => product.tile === name);
  
  return (
    <div className="page-content">
      <h2>Книги жанра: {name}</h2>
      <div className="cards">
        {genreProducts.length > 0 ? (
          genreProducts.map(product => (
            <FlipCard
              key={product.id}
              image={product.image}
              backImage={product.backImage}
              title={product.name}
              tile={product.tile}
              buttonText="Подробнее"
              onButtonClick={() => navigate(`/details/${product.id}`)}
            />
          ))
        ) : (
          <p>В этом жанре пока нет книг</p>
        )}
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // НЕ ДАЕТ СТРАНИЦЕ ПЕРЕЗАГРУЗИТЬСЯ
    
    // Тут будет отправка на сервер
    console.log('Отправляем:', { email, password });
    
    // fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password })
    // })
  };

  return (
    <div className="form-container login-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <BlobButton type="primary">
          Sign In
        </BlobButton>
        
        <BlobButton 
          type="secondary"
          onClick={() => navigate('/register')}
        >
          Register
        </BlobButton>
      </form>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  
  return (
    <div className="form-container register-form">
      <form> 
        <h2>Register</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Repeat password" />
        
        <BlobButton type="primary">
          Done
        </BlobButton>
        
        <BlobButton 
          type="secondary"
          onClick={() => navigate('/login')}
        >
          Log In
        </BlobButton>
      </form>
    </div>
  );
}

function PasswordReset() {
  return (
    <div className="page-content">
      <h2>Password Reset</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="page-content">
      <h2>Dashboard</h2>
    </div>
  );
}

function ItemDetails() {
  const { id } = useParams(); 
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="page-content product-content">
      <h2>{product.name}</h2>
      <div className="product-details">
        <img src={product.image} alt={product.name} style={{maxWidth: '500px'}} />
        <h3>Цена: {product.price}</h3>
        <BlobButton type="secondary">Купить сейчас</BlobButton>
        <h1>О книге</h1>
        <h4>{product.about}</h4>
      </div>
    </div>
  );
}
