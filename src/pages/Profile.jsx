import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { User, Upload, Edit, X, Save } from "lucide-react";

function Profile() {
  const { user, uploadProfilePicture, updateUserInformation } = useAuth();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        phone: user.phone || "",
        location: user.location || "",
      });
      setPhotoPreview(user.photoURL);
    }
  }, [user]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!photo) {
      toast.error("Please select a photo to upload.");
      return;
    }
    try {
      await uploadProfilePicture(photo, user, setLoading);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await updateUserInformation(formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                {" "}
                <Edit size={18} /> Edit{" "}
              </button>
            )}
          </div>

          <div className="relative w-32 h-32 mx-auto mb-4">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-blue-200"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-200">
                <User size={64} className="text-gray-500" />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Upload size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
          </div>

          {photo && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-green-300"
            >
              {loading ? "Uploading..." : "Save Photo"}
            </button>
          )}

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.displayName || `${user.firstName} ${user.lastName}`}
            </h2>
            <p className="text-gray-600 mb-6">{user.email}</p>
          </div>

          {isEditing ? (
            <div className="text-left space-y-4 border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  {" "}
                  <X size={18} /> Cancel{" "}
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {" "}
                  <Save size={18} /> {loading ? "Saving..." : "Save Changes"}{" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-left space-y-4 border-t pt-6">
              <div className="grid grid-cols-3 gap-4">
                <p className="font-semibold text-gray-700 col-span-1">
                  Gender:
                </p>
                <p className="text-gray-600 col-span-2 capitalize">
                  {user.gender || "Not set"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p className="font-semibold text-gray-700 col-span-1">Phone:</p>
                <p className="text-gray-600 col-span-2">
                  {user.phone || "Not set"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p className="font-semibold text-gray-700 col-span-1">
                  Location:
                </p>
                <p className="text-gray-600 col-span-2">
                  {user.location || "Not set"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
