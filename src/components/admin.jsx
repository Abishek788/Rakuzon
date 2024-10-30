import React, { useState } from "react";

const ProductForm = () => {
  // Define state for the product form
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the product data object
    const productData = {
      ProductId: productId,
      name,
      image,
      price,
    };

    try {
      console.log("Sending product data:", productData); // Log the data being sent

      const response = await fetch(
        "https://5tpdkzjmuf.execute-api.us-east-1.amazonaws.com/dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify(productData)}) 
        //   body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        // Handle the response error
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to send data to Lambda function"
        );
      }

      const result = await response.json();
      setMessage("Product stored successfully!");
      console.log("Data successfully stored in DynamoDB:", result);
    } catch (error) {
      setMessage(`Error submitting product data: ${error.message}`);
      console.error("Error submitting product data:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Submit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-black-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default ProductForm;
