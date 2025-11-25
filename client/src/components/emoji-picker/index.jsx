// EmojiPickerComponent.jsx
import React from "react";
import Picker from "emoji-picker-react";

const EmojiPickerComponent = ({ onSelectEmoji }) => {
  // Handle emoji selection
  const handleEmojiSelect = (emojiData) => {
    console.log(emojiData, "emoji");
    onSelectEmoji(emojiData.emoji); // `emoji` property dipakai di emoji-picker-react
  };

  return (
    <div className="relative w-full !max-w-8">
      <Picker
        onEmojiClick={handleEmojiSelect}
        lazyLoadEmojis={true}
        theme="light"
        searchDisabled={false}
        skinTonesDisabled={true}
        previewConfig={{ showPreview: false }}
      />
    </div>
  );
};

export default EmojiPickerComponent;
