import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-400">
            Arigo.NG
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-emerald-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLinks user={user} isAdmin={isAdmin} cart={cart} logout={logout} />
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            
            {user && (
              <MobileNavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center">
                  <ShoppingCart className="mr-2" size={20} />
                  Cart
                  {cart.length > 0 && (
                    <span className="ml-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                      {cart.length}
                    </span>
                  )}
                </div>
              </MobileNavLink>
            )}
            
            {isAdmin && (
              <MobileNavLink to="/secret-dashboard" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center">
                  <Lock className="mr-2" size={18} />
                  Dashboard
                </div>
              </MobileNavLink>
            )}
            
            {user ? (
              <button
                className="w-full text-left px-4 py-2 rounded-md flex items-center text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="mr-2" size={18} />
                Log Out
              </button>
            ) : (
              <>
                <MobileNavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center">
                    <UserPlus className="mr-2" size={18} />
                    Sign Up
                  </div>
                </MobileNavLink>
                <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center">
                    <LogIn className="mr-2" size={18} />
                    Login
                  </div>
                </MobileNavLink>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

// Component for desktop navigation links
const NavLinks = ({ user, isAdmin, cart, logout }) => (
  <>
    <Link
      to={"/"}
      className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
    >
      Home
    </Link>
    {user && (
      <Link
        to={"/cart"}
        className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
      >
        <ShoppingCart className="inline-block mr-1 group-hover:text-emerald-400" size={20} />
        <span className="hidden sm:inline">Cart</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
            {cart.length}
          </span>
        )}
      </Link>
    )}
    {isAdmin && (
      <Link
        className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
        to={"/secret-dashboard"}
      >
        <Lock className="inline-block mr-1" size={18} />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
    )}

    {user ? (
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
        onClick={logout}
      >
        <LogOut size={18} />
        <span className="hidden sm:inline ml-2">Log Out</span>
      </button>
    ) : (
      <>
        <Link
          to={"/signup"}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
        >
          <UserPlus className="mr-2" size={18} />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
        <Link
          to={"/login"}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
        >
          <LogIn className="mr-2" size={18} />
          <span className="hidden sm:inline">Login</span>
        </Link>
      </>
    )}
  </>
);

// Component for mobile navigation links
const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-emerald-400"
  >
    {children}
  </Link>
);

export default Navbar;