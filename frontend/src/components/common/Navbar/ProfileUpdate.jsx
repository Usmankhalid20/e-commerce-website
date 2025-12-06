import ProfileInformation from './ProfileInformation';
import { useAuth } from '../../../context/AuthContext';

const ProfileUpdate = () => {
  const { updatedUserProfile, authUser } = useAuth();
  // const [currentUser, setCurrentUser] = useState({
  //   fullName: 'John Doe',
  //   email: 'john.doe@example.com',
  //   phone: '+1234567890',
  //   bio: 'Software developer passionate about React and Tailwind CSS',
  //   location: 'New York, USA',
  //   website: 'https://johndoe.com',
  //   avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  // });

  // const handleProfileUpdate = (updatedData) => {
  //   console.log('Updated profile:', updatedData);
  //   setCurrentUser(prev => ({ ...prev, ...updatedData }));
  //   // Here you would typically make an API call to update the user's profile
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileInformation
          user={authUser} 
          onUpdate={updatedUserProfile} 
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;