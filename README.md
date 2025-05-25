Catch The Fake
Develop an interactive web game where users swipe through a carousel of images, identifying
each as either "Fraud" or "Safe." The game should include user authentication, game logic, data
storage, and a leaderboard.


Tech Stack:

React.js – Frontend framework

Tailwind CSS – Utility-first CSS styling

Framer Motion – For animations and transitions

React Router – Client-side routing

Lucide React – Icon library

Folder structure:

src/
│
├── assets/              # Static assets (images, etc.)
│   └── images/
│
├── components/          # Reusable UI components (e.g. Button)
│
├── context/             # Authentication context (e.g. AuthProvider)
│
├── data/                # Questions and answers used in the game
│
├── firebase/            # Firebase config and auth functions
│
├── hooks/               # Custom hooks for state and effect management
│
├── services/            # Business logic (e.g. authService, gameService)
│
├── utils/               # Utility helpers (not used but reserved)
│
├── view/                # Main application views/pages (Login, Home, Game, etc.)
│
└── App.jsx              # Root component



Gameplay Logic
Questions and answers stored in /data

User progresses through scenarios and earns points

Score tracking and visual feedback 

Leaderboard
Show top scores with usernames & scores from Firestore

Sort descending by score


✨ Innovation
In addition to meeting the core requirements, the following enhancements were implemented to improve functionality, usability, and user experience:

🔁 Password Reset Feature:
A fully functional "Forgot Password?" modal using Firebase Auth, allowing users to reset their credentials — even though this was not part of the original specification.

🔙 Back Navigation on Login Page:
A back button was added to the login screen, allowing users to easily return to the homepage — improving navigability and user control.

🎮 "Play Again" Logic:
After completing the game, users are given the option to play again, resetting the game state and allowing for repeat engagement without needing to refresh the page.

These features demonstrate thoughtful attention to user experience and flow, going beyond what's expected to make the app more complete and user-friendly.


Assumptions and Decisions
Icon Library Choice:
I used the lucide-react icon set for consistency and simplicity across the app, even if the original design specified different icons. This was a deliberate choice to maintain a uniform look and ease development.

Background in Image Carousel:
The background in the image carousel page was adjusted from the original Figma design because the images did not fit well with the plain background. To enhance visual appeal and maintain design balance, I added subtle blinking stars as a background effect, creating a more dynamic and engaging user experience.

