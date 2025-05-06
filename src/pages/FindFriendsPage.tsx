import React, { useEffect, useState } from 'react';
import { User, Mail, Loader, Building, Phone } from 'lucide-react';
import { getAllUsers, UserData } from '../services/users';
import { useAppContext } from '../context/AppContext';

const FindFriendsPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAppContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await getAllUsers();
        // Filter out the current user and sort by name
        const filteredUsers = userData
          .filter(u => u.id !== currentUser?.id)
          .sort((a, b) => a.name.localeCompare(b.name));
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser?.id]);

  if (error) {
    return (
      <div className="py-8">
        <div className="container">
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <User className="w-12 h-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error Loading Users</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Find Friends</h1>
          <p className="text-gray-600">Showing {users.length} users</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-full mb-4 overflow-hidden bg-primary-50">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-600" />
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-center mb-1">{user.name}</h3>
              
              <div className="w-full space-y-2 mt-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                
                {user.company && (
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="text-sm">{user.company}</span>
                  </div>
                )}
                
                {user.mobile && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{user.mobile}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindFriendsPage;
