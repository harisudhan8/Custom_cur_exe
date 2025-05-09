document.getElementById("applyCursor").addEventListener("click", async () => {
  const fileInput = document.getElementById("imageInput").files[0];

  // Check if a file is selected and its type is valid
  if (fileInput) {
    const fileType = fileInput.type;
    if (fileType === "image/png" || fileType === "image/jpeg") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const size = 32; // Size of the cursor (32x32px)

          canvas.width = size;
          canvas.height = size;

          // Clear the canvas before drawing the image
          context.clearRect(0, 0, size, size);
          context.drawImage(image, 0, 0, size, size);

          const cursorDataUrl = canvas.toDataURL("image/png");

          // Save the cursor data in local storage
          chrome.storage.local.set({ customCursor: cursorDataUrl }, () => {
            alert("Cursor updated!");

            // Apply the custom cursor on the current active tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.scripting.insertCSS({
                target: { tabId: tabs[0].id },
                css: `body, html { cursor: url(${cursorDataUrl}), auto !important; }`
              });
            });
          });
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(fileInput);
    } else {
      alert("Please select a valid PNG or JPEG image.");
    }
  } else {
    alert("Please select an image.");
  }
});
