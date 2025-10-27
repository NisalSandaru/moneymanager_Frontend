import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept="image/*"
        onChange={handleImageChange}
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full relative shadow-md hover:shadow-lg transition">
          <User className="text-indigo-500" size={35} />
          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full absolute -bottom-1 -right-1 shadow"
          >
            <Upload size={15} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover "
          />
          <button
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1"
          >
            <Trash size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
