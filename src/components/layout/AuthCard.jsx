const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-red-400 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-6 md:p-8">
        {title && <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">{title}</h2>}
        {subtitle && <p className="text-sm text-gray-700 text-center mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
