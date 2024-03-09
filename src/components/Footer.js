import React from 'react';
import "../Styles/footer.css";

/**
 * Componente funcional que representa el pie de página de la aplicación.
 *
 * @component
 * @example
 * // Ejemplo de uso:
 * import Footer from './Footer';
 * const App = () => {
 *   return (
 *     <div>
 *       {/* Otras partes de la aplicación *\/}
 *       <Footer />
 *     </div>
 *   );
 * }
 */
function Footer() {
    return (
        <footer className="bg-dark w-100 footer">
            <div className="text-light text-center">
                <p className="display-5">Portfolios Manager</p>
                <small className="text-white-50">&copy; Copyright by Alberto. All rights reserved. </small>
            </div>
        </footer>
    );
}

export default Footer;
