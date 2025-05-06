import React, { useEffect, useState } from 'react';
import { User, Briefcase, Loader, Phone, MessageCircle } from 'lucide-react';
import { getUsers, UserProfile } from '../services/users';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const FindFriendsPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser, isAuthenticated, login } = useAppContext();
  const navigate = useNavigate();

  const handleCall = (phoneNumber: string) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert('Phone number not available');
    }
  };

  const handleWhatsApp = (phoneNumber: string) => {
    if (!phoneNumber) {
      alert('Phone number not available');
      return;
    }
    const whatsappNumber = '91' + phoneNumber.replace(/\D/g, '');
    const message = 'Hey, are you looking for a flat or flatmate?';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const loadUsers = async () => {
      if (!isAuthenticated) {
        navigate('/profile');
        return;
      }

      try {
        setIsLoading(true);
        const data = await getUsers();
        console.log('Users data:', data);
        setUsers(data.filter(u => u.id !== currentUser?.id));
      } catch (err) {
        console.error('Error loading users:', err);
        setError(err instanceof Error ? err.message : 'Unable to load users at this time');
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [currentUser?.id, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-red-700">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Find Friends</h1>
        <span className="text-gray-600">{users.length} users found</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg overflow-hidden shadow-property-card hover:shadow-lg transition-shadow duration-300">
            {/* User Avatar Section */}
            <div className="relative h-36 bg-primary-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="w-20 h-20 text-primary-200" />
              </div>
            </div>

            {/* User Information */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold line-clamp-1">{user.userName}</h3>
                <span className="text-xs font-medium text-primary-600">{user.age} yrs</span>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="text-sm">{user.profession}</span>
              </div>

              {/* Preferences */}
              {user.preferences?.length > 0 && (
                <div className="space-y-2 mb-3">
                  <p className="text-xs font-medium text-gray-600">Preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.map((pref, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex border-t border-gray-200">
              <button 
                onClick={() => handleWhatsApp(user.userPhoneNumber)}
                className="flex items-center justify-center w-1/2 py-3 text-primary-600 hover:bg-primary-50 transition border-r border-gray-200"
                aria-label={`WhatsApp ${user.userName}`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">WhatsApp</span>
              </button>
              <button 
                onClick={() => handleCall(user.userPhoneNumber)}
                className="flex items-center justify-center w-1/2 py-3 text-primary-600 hover:bg-primary-50 transition"
                aria-label={`Call ${user.userName}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">Call</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFriendsPage;
