# Office_Notice_Board_System
ICl Addis project
# Office Notice Board

## Overview
The Office Notice Board is a web application designed to manage and display office notices efficiently. It allows users to create, view, and manage notices, ensuring smooth communication within an organization. The platform includes authentication for secure access and a display mode for showing notices on office screens.

## Features
- **User Authentication**: Users can log in and register to access the platform.
- **Dashboard**: A central place to manage notices.
- **Notice Management**: Users can create, view, and manage office notices.
- **Notice Display**: A special display mode for showcasing notices on office screens.
- **Responsive Design**: Optimized for different screen sizes.

## Tech Stack
- **Frontend**: React.js
- **Routing**: React Router
- **State Management**: Context API 

## Installation
### Prerequisites
- Node.js and npm installed

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/office-notice-board.git
   ```
2. Navigate to the project directory:
   ```sh
   cd office-notice-board
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Project Structure
```
src/
│── pages/
│   ├── Authentication/
│   │   ├── Login.js
│   │   ├── Register.js
│   ├── NoticesLists.js
│   ├── NoticesDetail.js
│   ├── CreateNoticeForm.js
│   ├── TvNoticeDisplay.js
│   ├── Dboard.js
│── App.js
│── index.js
```

## Usage
- **Login/Register**: Navigate to `/login` or `/register` to authenticate.
- **Dashboard**: Access all features at `/dashboard`.
- **View Notices**: Go to `/notices` to see all notices.
- **Notice Details**: Click on a notice or visit `/notices/:id`.
- **Create Notice**: Navigate to `/create-notice`.
- **Office Display**: Visit `/office-display` for public viewing of notices.



