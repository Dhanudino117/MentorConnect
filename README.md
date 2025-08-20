# MentorConnect

A modern mentorship platform that connects students with experienced mentors through an intuitive interface.

## New Features

### Profile Image Management

#### Landing Page Profile Display
- After login, the landing page displays the user's profile photo instead of the login button
- Clicking on the profile image opens a dropdown menu with:
  - User's name and email
  - Dashboard navigation
  - Profile settings
  - Logout option
- The dropdown includes smooth animations and backdrop blur effects
- Click outside or press Escape to close the dropdown

#### Profile Image Upload
- **Mentor Dashboard**: Profile tab includes an image upload section
- **Student Dashboard**: Overview tab includes an image upload section
- Features:
  - Drag and drop file input
  - Image preview with current profile image
  - File size validation (max 5MB)
  - Loading states during upload
  - Remove image functionality
  - Automatic fallback to initials if no image is set

#### Navigation Integration
- Profile images are displayed throughout the navigation system
- Consistent styling across all components
- Responsive design for mobile and desktop

## Technical Implementation

### Components Updated
- `LandingPage.jsx` - Added profile display and dropdown
- `Nav.jsx` - Integrated profile images in navigation
- `MentorDashboard.jsx` - Added image upload section
- `Dashboard.jsx` - Added image upload section for students
- `authService.js` - Added profile image management functions

### Key Features
- **Image Storage**: Uses base64 data URLs stored in localStorage
- **Validation**: File type and size validation
- **Error Handling**: Comprehensive error handling for upload failures
- **State Management**: Loading states and user feedback
- **Responsive Design**: Works on all screen sizes

### Usage

1. **Upload Profile Image**:
   - Navigate to your dashboard (Mentor or Student)
   - Find the Profile Image section
   - Click "Choose File" and select an image
   - Image will be automatically uploaded and displayed

2. **Remove Profile Image**:
   - Click the red "×" button on your profile image
   - Confirm the removal
   - Profile will revert to showing your initials

3. **Profile Dropdown**:
   - Click on your profile image in the header
   - Use the dropdown menu to navigate or logout
   - Click outside or press Escape to close

## File Structure

```

## Browser Compatibility

- Modern browsers with ES6+ support
- FileReader API for image processing
- LocalStorage for data persistence
- CSS Grid and Flexbox for layout

## Future Enhancements

- Cloud storage integration for images
- Image compression and optimization
- Multiple image formats support
- Profile image cropping tools
- Social media integration
