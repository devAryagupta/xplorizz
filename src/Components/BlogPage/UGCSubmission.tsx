import React from 'react';

const UGCSubmission: React.FC = () => {
  return (
    <div className="ugc-submission">
      <h4>Share Your Travel Story</h4>
      {/* Replace this textarea with your rich text editor component (like Tiptap or Editor.js) */}
      <textarea placeholder="Write your story here..." rows={10} style={{ width: '100%' }} />
      <div className="submission-options">
        <input type="file" accept="image/*" />
        <select>
          <option value="">Select Category</option>
          <option value="adventure">Adventure</option>
          <option value="culture">Culture</option>
          <option value="budget">Budget</option>
        </select>
        <input type="text" placeholder="Location Tag" />
      </div>
      <button>Submit for Review</button>
    </div>
  );
};

export default UGCSubmission;