# MentorConnect


MentorConnect is a MERN-stack web app that helps students, early-career professionals, and entrepreneurs find the right mentor.
Instead of long boring search forms, students can browse potential mentors Tinder-style — swiping right to “connect” and left to “skip”.

Mentors can also filter and view students who fit their expertise. Once a match occurs, the platform unlocks chat, scheduling, and progress tracking features.

This app solves key problems:

Limited access to experienced professionals.

No skill/goals-based matching.

Time zone conflicts with a scheduling assistant.

Unclear communication channels → Built-in chat/video calls.

No structured progress tracking → Dashboard with milestones, goals, and feedback.

Core Features:
1. Mentor–Mentee Matching (Swipe Interface)
Students see mentor profiles as swipeable cards (name, skills, bio, experience, rating).

Swipe Right → Send request to connect.

Swipe Left → Skip and move to next mentor.

Matching occurs when both swipe right.

2. Profiles & Authentication
Students: name, email, skills they want to learn, goals, profile photo.

Mentors: name, email, expertise, experience, availability, profile photo.

JWT Authentication for secure login/signup.

Role-based access (Student/Mentor/Admin).

3. Scheduling & Time Zone Support
Integrate a time-zone-aware calendar picker.

Show available time slots in both mentor’s and mentee’s local time.

4. Communication Tools
Real-time chat (Socket.io + MongoDB for persistence).

Optional video call integration (WebRTC or third-party like Twilio API).

5. Learning Progress Tracker
Create mentorship goals & milestones.

Weekly progress reports (completed tasks, mentor feedback).

6. Admin Panel
View all users & matches.

Remove inappropriate accounts.

## DeploymentLink : https://mentor-connect-pi.vercel.app/
