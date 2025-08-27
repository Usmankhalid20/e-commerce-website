export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-700">
          You don’t have permission to view this page.
        </p>
      </div>
    </div>
  );
}
