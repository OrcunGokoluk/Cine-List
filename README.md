# Cine-List 🎬

CineList is a user-friendly web application that allows users to discover and browse movies using data fetched from [The Movie Database (TMDb)](https://www.themoviedb.org/) API. It features a responsive UI, search functionality, pagination, and detailed movie information.

## Demo

[ogk-cinelist.netlify.app](https://ogk-cinelist.netlify.app/)

## Features

- 🔍 **Search Movies** – Instantly find movies by their title.
- 🎞️ **Browse Popular Films** – Displays a list of popular movies from the TMDb API.
- 📄 **Pagination** – Load more movies with smooth pagination.
- 📘 **Movie Details** – View additional information about any selected movie.

## Key Learnings

Throughout this project, I focused on mastering essential React and frontend development concepts:

- Implemented dynamic URL structures using React Router.
- Built dynamic and flexible navigation with nested routes.
- Used Outlet Context to share data between nested route children.
- Applied conditional rendering to manage dynamic UI content.
- Integrated an external API (TMDb) with asynchronous data fetching and state management.
- Created reusable components and passed data using props.
- Developed responsive designs using CSS Flexbox and media queries.
- Built a consistent layout structure across pages.
- Used dotenv to securely manage the API key.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/OrcunGokoluk/cinelist.git
```

2. Navigate to the project directory:

```bash
cd cinelist
```

3. Install the dependencies:

```bash
cd cinelist
```

4. Create a .env file in the root directory and define your TMDb API key as shown below:

```bash
VITE_TMDB_KEY=your_tmdb_api_key_here
```
