
import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;

public class ExpenseTracker {
    private static HashMap<String, User> users = new HashMap<>();
    private static HashMap<String, ArrayList<Expense>> expenses = new HashMap<>();

    public static void main(String[] args) {
        createUser("sample_user", "sample_password");

        String username = JOptionPane.showInputDialog(null, "Create username:");
        String password = JOptionPane.showInputDialog(null, "Create password:");
        createUser(username, password);

        addExpense("sample_user");

        while (true) {
            String userUsername = JOptionPane.showInputDialog(null, "Enter your username:");
            String userPassword = JOptionPane.showInputDialog(null, "Enter your password:");
            if (authenticateUser(userUsername, userPassword)) {
                JOptionPane.showMessageDialog(null, "User authenticated successfully.");

                String description = JOptionPane.showInputDialog(null, "Enter expense description:");
                double amount = Double.parseDouble(JOptionPane.showInputDialog(null, "Enter expense amount:"));
                String date = JOptionPane.showInputDialog(null, "Enter expense date (YYYY-MM-DD):");
                String category = JOptionPane.showInputDialog(null, "Enter expense category:");
                Expense expense = new Expense(description, amount, date, category);

                addExpenseDetails(userUsername, expense);
                JOptionPane.showMessageDialog(null, "Expense added successfully.");

                generateExpenseReport(userUsername);
            } else {
                JOptionPane.showMessageDialog(null, "Authentication failed. Please try again.");
            }
        }
    }

    private static void createUser(String username, String password) {
        users.put(username, new User(username, password));
        expenses.put(username, new ArrayList<>());
    }

    private static boolean authenticateUser(String username, String password) {
        User user = users.get(username);
        return user != null && user.getPassword().equals(password);
    }

    private static void addExpense(String username) {
        Expense expense1 = new Expense("Groceries", 50.0, "2024-04-06", "Food");
        Expense expense2 = new Expense("Utilities", 100.0, "2024-04-10", "Bills");

        addExpenseDetails(username, expense1);
        addExpenseDetails(username, expense2);
    }

    private static void addExpenseDetails(String username, Expense expense) {
        ArrayList<Expense> userExpenses = expenses.get(username);
        if (userExpenses != null) {
            userExpenses.add(expense);
        }
    }

    private static void generateExpenseReport(String username) {
        ArrayList<Expense> userExpenses = expenses.get(username);
        if (userExpenses != null && !userExpenses.isEmpty()) {
            StringBuilder report = new StringBuilder("Expense Report for " + username + ":\n");
            for (Expense expense : userExpenses) {
                report.append("Description: ").append(expense.getDescription()).append("\n")
                        .append("Amount: ").append(expense.getAmount()).append("\n")
                        .append("Date: ").append(expense.getDate()).append("\n")
                        .append("Category: ").append(expense.getCategory()).append("\n\n");
            }
            JOptionPane.showMessageDialog(null, report.toString());
        } else {
            JOptionPane.showMessageDialog(null, "No expenses found for this user.");
        }
    }
}

class User {
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}

class Expense {
    private String description;
    private double amount;
    private String date;
    private String category;

    public Expense(String description, double amount, String date, String category) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public String getDate() {
        return date;
    }

    public String getCategory() {
        return category;
    }
}