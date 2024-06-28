# Age Calculator

## Project Overview

Age Calculator is a simple yet powerful web application built using ReactJS and TailwindCSS. The primary function of this application is to calculate the age of a person based on their date of birth. It accurately calculates and displays the age in terms of years, months, and days. Additionally, the application includes robust error handling to ensure that users cannot select a future date as a date of birth.

## Features

- **Accurate Age Calculation**: Calculates age in years, months, and days.
- **Responsive Design**: Built with TailwindCSS for a clean and responsive user interface.
- **Error Handling**: Ensures no future date can be selected as the date of birth.
- **User-Friendly Interface**: Simple and intuitive interface for ease of use.

## Technologies Used

- **ReactJS**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom user interfaces.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/age-calculator.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd age-calculator
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

### Running the Application

To start the application, run:

```bash
npm start
```

This will start the development server and you can view the application in your browser at `http://localhost:3000`.

## Usage

1. **Enter Date of Birth:**
   - Select your date of birth using the date picker.
2. **Calculate Age:**
   - Click the "Calculate Age" button.
   - The application will display your age in years, months, and days.
3. **Error Handling:**
   - If a future date is selected, an error message will be displayed prompting you to select a valid date of birth.

## Project Structure

```plaintext
age-calculator/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AgeCalculator.jsx
│   │   └── ...
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   └── ...
├── tailwind.config.js
├── package.json
└── ...
```

## Contributing

Contributions are welcome! If you have any suggestions or find any bugs, please open an issue or create a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Contact

For any questions or suggestions, feel free to contact me at [parnaroychowdhury2020@gmail.com].

---

Thank you for using Age Calculator! Enjoy calculating your age with ease and accuracy.
