"use client";

import { FormEvent, FormEventHandler, useState } from "react";

const PantryPage = () => {
  const [aiResult, setAiResult] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();

  const onSubmitImage = (e) => {
    e.preventDefault();
    setLoading(true);

    const imageInput = document.getElementById("image")?.files[0];

    const formData = new FormData();
    formData.append("image", imageInput);
    fetch("/api/image", {
      method: "POST",
      headers: {},
      body: formData,
    }).then((result) => {
      result.json().then((resultJson) => {
        setAiResult(resultJson);
        setLoading(false);
      });
    });
  };

  const onChangeImage = (e) => {
    const imageInput = document.getElementById("image")?.files[0];
    setUploadedImage(URL.createObjectURL(imageInput));
  };

  return (
    <main className="w-full h-screen flex justify-center items-center flex-col">
      <form onSubmit={onSubmitImage} encType="multipart/form-data">
        <div>
          <input
            type="file"
            name="image"
            id="image"
            onChange={onChangeImage}
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          />
        </div>
        {uploadedImage && (
          <div className="my-4">
            <img src={uploadedImage} width="250" height="250" />
          </div>
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="p-2 bg-blue-600 rounded hover:bg-blue-500e"
            disabled={loading}
          >
            Upload
          </button>
        </div>
      </form>

      <div>
        {loading && <div>Wait while we scan the image...</div>}
        {aiResult &&
          aiResult.map(
            (item: {
              productName: string;
              productType: string;
              quantity: number;
            }) => (
              <div className="my-4" key={item.productName}>
                <div>Produit : {item.productName}</div>
                <div>Type : {item.productType}</div>
                <div>Quantité : {item.quantity}</div>
              </div>
            )
          )}
      </div>
    </main>
  );
};

export default PantryPage;
