chrome.storage.local.get(["customCursor"], (result) => {
    console.log("Content Script - Retrieved Cursor:", result.customCursor);
    if (result.customCursor) {
        document.body.style.cursor = `url(${result.customCursor}), auto !important`;
    }
});