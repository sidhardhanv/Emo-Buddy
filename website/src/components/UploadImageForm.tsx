import axios from "axios";

const UploadImageForm = () => {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      axios
        .post("http://your-flask-server-url/upload", formData)
        .then((response) => {
          // Image uploaded successfully
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Additional form submission handling can be done here, if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadImageForm;
