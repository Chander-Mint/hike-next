export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">Total Treks</h3>
        <p className="text-3xl font-bold">24</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">Active Bookings</h3>
        <p className="text-3xl font-bold">12</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">Blog Posts</h3>
        <p className="text-3xl font-bold">36</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
        <p className="text-3xl font-bold">156</p>
      </div>
    </div>
  );
}